const prisma = require("../lib/prisma");
const slugify = require("slugify");
const { importProductSchema } = require("../validators/productImport.validator");
//const { formatImportError } = require("../utils/importErrorFormatter");

async function previewImport(rows) {
  const validProducts = [];
  const errors = [];
  const skuSet = new Set();
  const slugSet = new Set();

//PRELOAD DB ONCE (IMPORTANT)
  const existingProducts = await prisma.product.findMany({
    where: {
      sku: { in: rows.map(r => r.sku).filter(Boolean) },
    },
  });

  const existingSkuSet = new Set(existingProducts.map(p => p.sku));

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

//JOI VALIDATION
    const { error, value } = importProductSchema.validate(row);

    if (error) {
      errors.push({
        row: i + 2,
        sku: row.sku || null,
        message: error.details[0].message,
      });
      continue;
    }
   
    const cleanRow = value;

//DUPLICATE IN FILE
   if (skuSet.has(cleanRow.sku)) {
     errors.push({
       row: i + 2,
       sku: cleanRow.sku,
       message: `Duplicate SKU '${cleanRow.sku}' in file`,
     });
     continue;
   }

   skuSet.add(cleanRow.sku);

//CATEGORY CHECK
      const categories = await prisma.category.findMany();
      const categoryMap = new Map(categories.map(c => [c.slug, c]));
      const category = categoryMap.get(cleanRow.categorySlug);
                   
      if (!category) {
        errors.push({
          row: i + 2,
          sku: cleanRow.sku,
          message: `Category ${cleanRow.categorySlug} not found`,
        });
        continue;
      }
  
//DB DUPLICATE CHECK
      if (existingSkuSet.has(cleanRow.sku)) {
        errors.push({
          row: i + 2,
          sku: cleanRow.sku,
          message: `SKU '${cleanRow.sku}' already exists`,
        });
        continue;
      }

      const slug = 
        slugify(cleanRow.name, {
          lower: true,
          strict: true,
      }) +
      "-" +
      cleanRow.sku.toLowerCase();

//
      if (slugSet.has(slug)) {
        errors.push({
          row: i + 2,
          sku: cleanRow.sku,
          message: `Duplicate slug '${slug}' in file`,
        });
        continue;
      }

      slugSet.add(slug);

      validProducts.push({
        sku: cleanRow.sku,
        name: cleanRow.name,
        description: cleanRow.description,
        price: Number(cleanRow.price),
        stock: Number(cleanRow.stock),
        weight: Number(cleanRow.weight || 0),
        categoryId: category.id,
        slug,
      });
    }
 
    return {
      totalRows: rows.length,
      validProducts,
      errors,
    };
  }

async function commitImport(validProducts) {
  if (!validProducts || validProducts.length === 0) {
    throw new Error("No valid products to import");
  }

//GENERATE FINAL DATA (SAFE INSERT FORMAT)
    const data = validProducts.map((item) => {
      const slug = slugify(`${item.name}-${item.sku}`, {
        lower: true,
        strict: true,
      });

    return {
      sku: item.sku,
      name: item.name,
      description: item.description,
      price: item.price,
      stock: item.stock,
      categoryId: item.categoryId,
      slug: item.slug,
      imageUrl: item.imageUrl || null,
     };
   });

//TRANSACTION SAFE INSERT
    const result = await prisma.$transaction(async (tx) => {
      return await tx.product.createMany({
        data,
        skipDuplicates: true, //safety layer addition
      });
    });

    return {
      success: true,
      insertedCount: result.count,
    };
  }

module.exports = {
  previewImport,
  commitImport,
};
   

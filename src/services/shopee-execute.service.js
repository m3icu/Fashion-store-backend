const prisma = require("../lib/prisma");
const slugify = require("slugify");

  
/**
 * EXECUTE SHOPEE IMPORT -> DATABASE
 */

async function executeShopeeImport(previewResult) {
  const { products } = previewResult;

  const validProducts = products.filter((p) => p.isValid);

  const sampleProducts = validProducts.slice(0, 5);

  const summary = {
    totalInput: products.length,
    totalValid: validProducts.length,
    totalCreated: 0,
    errors: [],
  };

  try {
    for (const product of sampleProducts) {   
      await prisma.$transaction(async (tx) => {
        try {
          //1. CREATE PRODUCT
          const createdProduct = await tx.product.create({
            data: {
              name: product.name,
              description: product.description || "",
              slug: slugify(
                `${product.name}-${product.productId}` , 
                {
                  lower: true,
                  strict: true,
                }
              ),
            },
         });

          //2. CREATE VARIANTS (bulk)
          const variantData = product.variants.map((v) => ({
            productId: createdProduct.id,
            sku: v.sku,
            variantName: v.variantName,
            price: v.price || 0,
            stock: v.stock || 0,
          }));

          await tx.productVariant.createMany({
            data: variantData,
            //skipDuplicates: true,
          });

          summary.totalCreated++;
        } catch (err) {
          summary.errors.push({
            productId: product.productId,
            message: err.message,
          });
        }
      });
    }

    return summary;
  } catch (err) {
    throw new Error("Execute Import Failed: " + err.message);
  }
}

module.exports = {
  executeShopeeImport,
};

// 1. PRODUCT UPSERT
await prisma.$transaction(async (tx) => {
let productId;

if (!existingProduct) {
const createdProduct = await tx.product.create({
data: {
name: product.name,
description: product.description || "",
slug,
weight: product.weight || 0,
},
});

```
productId = createdProduct.id;

summary.productsCreated++;

productMap.set(slug, {
  id: createdProduct.id,
  slug,
});
```

} else {
await tx.product.update({
where: {
id: existingProduct.id,
},
data: {
name: product.name,
description: product.description || "",
weight: product.weight || 0,
},
});

```
productId = existingProduct.id;

summary.productsUpdated++;
```

}

// 2. VARIANT UPSERT
for (const variant of product.variants) {
const existingVariant = variantMap.get(
variant.sku
);

```
if (!existingVariant) {
  const createdVariant =
    await tx.productVariant.create({
      data: {
        productId,
        sku: variant.sku,
        variantName: variant.variantName,
        price: variant.price || 0,
        stock: variant.stock || 0,
      },
    });

  variantMap.set(
    variant.sku,
    {
      id: createdVariant.id,
      sku: createdVariant.sku,
    }
  );

  summary.variantsCreated++;
} else {
  await tx.productVariant.update({
    where: {
      id: existingVariant.id,
    },
    data: {
      price: variant.price || 0,
      stock: variant.stock || 0,
    },
  });

  summary.variantsUpdated++;
}
```

}
});

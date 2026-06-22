const { normalizeName, toNumber } = require("../utils");

function mergeShopeeFiles(file1Rows, file2Rows) {
  const errors = [];
  const merged = [];

  //MAP 1 PRODUCT INFO
  const productMap = new Map();

  for (const row of file1Rows) {
    if (!row.name || !row.sku) {
      errors.push({
        type: "FILE_1",
        name: row.name || null,
        message: "Missing SKU or name",
      });
      continue;
    }

    const key = normalizeName(row.name);

    if (productMap.has(key)) {
      errors.push({
        type: "FILE_1",
        name: row.name,
        message: "Duplicate product name in file 1"
      });
      continue;
    }

    productMap.set(key, {
      sku: row.sku,
      name: row.name,
      description: row.description || "",
    });
  }

  //MAP 2 (PRICE + STOCK)
  const priceMap = new Map();
    
  for (const row of file2Rows) {
    if (!row.name) {
      errors.push({
        type: "FILE_2",
        name: null,
        message: "Missing product name",
      });
      continue;
    }

    const key = normalizeName(row.name);

    if (priceMap.has(key)) {
      errors.push({
        type: "FILE_2",
        name: row.name,
        message: "Duplicate product name in file 2",
      });
      continue;
    }

    priceMap.set(key, {
      price: toNumber(row.price),
      stock: toNumber(row.stock),
    });
  }

  //MERGE STEP
  for (const [key,product] of productMap.entries()) {
    const pricing = priceMap.get(key);

    if (!pricing) {
      errors.push({
        type: "MERGE",
        name: product.name,
        sku: product.sku,
        message: "Price/stock not found in file 2",
      });
      continue;
    }

    if (pricing.price <= 0) {
      errors.push({
        type: "VALIDATION",
        name: product.name,
        sku: product.sku,
        message: "Invalid price",
      });
    }

    merged.push({
      sku: product.sku,
      name: product.name,
      description: product.description,
      price: pricing.price,
      stock: pricing.stock,
    });
  }

  return {
    totalFile1: file1Rows.length,
    totalFile2: file2Rows.length,
    validProducts: merged,
    errors,
  };
}

module.exports = { mergeShopeeFiles };
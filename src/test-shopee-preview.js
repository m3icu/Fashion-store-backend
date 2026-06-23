const {
  previewShopeeImport,
} = require("./services/shopee-preview.service");

const result = previewShopeeImport({
  basicFile:
    "./uploads/excel/shopee/basic.xlsx",

  salesFiles: [
    "./uploads/excel/shopee-sales/1.xlsx",
    "./uploads/excel/shopee-sales/2.xlsx",
    "./uploads/excel/shopee-sales/3.xlsx",
  ],
});

console.log({
  totalProducts: result.totalProducts,
  totalErrors: result.totalErrors,
});

console.log(result.products[0]);

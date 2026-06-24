const {
  parseBasicExcel,
  parseSalesExcel,
  parseShippingExcel,
  buildShopeeVariants,
} = require("./services/shopee-import.service");

// 📦 BASIC (ARRAY)
const basic = parseBasicExcel("./uploads/excel/shopee/basic.xlsx");

console.log("BASIC KEYS:");
console.log(Object.keys(basic[0]));

console.log("BASIC SAMPLE:");
console.log(basic[0]);

// 📦 SALES MULTI FILE (ARRAY)
const sales1 = parseSalesExcel("./uploads/excel/shopee-sales/1.xlsx");
const sales2 = parseSalesExcel("./uploads/excel/shopee-sales/2.xlsx");
const sales3 = parseSalesExcel("./uploads/excel/shopee-sales/3.xlsx");

// 🔥 MERGE CLEAN

const salesRows = [
  ...sales1,
  ...sales2,
  ...sales3,
];

console.log("SALES ROW KEYS:", Object.keys(sales1[0]));
console.log("SALES SAMPLE:");
console.log(sales1[0]);

// SHIPPING MULTI FILE (ARRAY)
const shipping1  = parseShippingExcel("./uploads/excel/shopee-shipping/1.xlsx");
const shipping2 = parseShippingExcel("./uploads/excel/shopee-shipping/2.xlsx");
const shipping3 = parseShippingExcel("./uploads/excel/shopee-shipping/3.xlsx");

// 🔥 MERGE CLEAN

const shippingRows = [
  ...shipping1,
  ...shipping2,
  ...shipping3,
];

console.log("SHIPPING SAMPLE:");
console.log(shippingRows[0]);

// 🚀 RUN ENGINE
const result = 
  buildShopeeVariants(
    basic, 
    salesRows,
    shippingRows
  );
    
console.log("TOTAL PRODUCT:", result.totalProducts);
console.log("TOTAL ERROR:", result.totalErrors);
console.dir(result, {
  depth: null,
});

//console.log(result.products.slice(0, 3));
console.log(
  JSON.stringify(
    result.products[0],
    null,
    2
  )
);
const XLSX = require("xlsx");

const workbook = XLSX.readFile(
  "./uploads/excel/shopee/basic.xlsx"
);

const sheet =
  workbook.Sheets[
    workbook.SheetNames[0]
  ];

const rawRows =
  XLSX.utils.sheet_to_json(
    sheet,
    {
      header: 1,
    }const { parseExcel, buildShopeeVariants } = require("./services/shopee-import.service");

const basic = parseExcel("./uploads/excel/shopee/basic.xlsx");

const sales1 = parseExcel("./uploads/excel/shopee-sales/1.xlsx");
const sales2 = parseExcel("./uploads/excel/shopee-sales/2.xlsx");
const sales3 = parseExcel("./uploads/excel/shopee-sales/3.xlsx");

const salesRows = [...sales1, ...sales2, ...sales3];

const result = buildShopeeVariants(basic, salesRows);

console.log("TOTAL PRODUCT:", result.totalProducts);
console.log("TOTAL ERROR:", result.totalErrors);
console.log(result.products.slice(0, 2));
  );

console.log(
  JSON.stringify(
    rawRows.slice(0, 20),
    null,
    2
  )
);
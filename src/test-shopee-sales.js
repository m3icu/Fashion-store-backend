const XLSX = require("xlsx");

const workbook = XLSX.readFile(
  "./uploads/excel/shopee-sales/1.xlsx"
);

const sheet =
  workbook.Sheets[
    workbook.SheetNames[0]
  ];

const rows = XLSX.utils.sheet_to_json(
  sheet,
  {
    header: 1,
    defval: "",
  }
);

console.log(
  JSON.stringify(
    rows.slice(0, 20),
    null,
    2
  )
);
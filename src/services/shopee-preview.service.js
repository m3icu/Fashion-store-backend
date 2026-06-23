const {
  parseBasicExcel,
  parseSalesExcel,
  buildShopeeVariants,
} = require("./shopee-import.service");

function previewShopeeImport({
  basicFile,
  salesFiles,
}) {
  const basicRows = parseBasicExcel(basicFile);

  let salesRows = [];
  
  for (const file of salesFiles) {
    const rows = parseSalesExcel(file);
    
    salesRows.push(...rows);
  }

  const result = buildShopeeVariants(
    basicRows,
    salesRows
  );

  return result;
}

module.exports = {
  previewShopeeImport,
};
const {
  previewShopeeImport,
} = require("./services/shopee-preview.service");

const {
  executeShopeeImport,
} = require("./services/shopee-execute.service");

async function main() {
  const preview = previewShopeeImport({
    basicFile: "./uploads/excel/shopee/basic.xlsx",
    salesFiles: [
      "./uploads/excel/shopee-sales/1.xlsx",
      "./uploads/excel/shopee-sales/2.xlsx",
      "./uploads/excel/shopee-sales/3.xlsx",
    ],
  });

  console.log("PREVIEW DONE:", {
    total: preview.totalProducts,
    errors: preview.totalErrors,
  });

  const result = await executeShopeeImport(preview);

  console.log("EXECUTE RESULT:");
  console.log(result);
}

main();
const XLSX = require("xlsx");

/**
 * =========================
 * BASIC FILE PARSER
 * =========================
 */
function parseBasicExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
  });

  const dataRows = rows.filter((row) => {
    const kodeProduk = row[0];

    if (!kodeProduk) return false;
    if (String(kodeProduk).includes("et_title")) return false;
    if (String(kodeProduk).includes("basic_info")) return false;
    if (kodeProduk === "Kode Produk") return false;

    return /^\d+$/.test(String(kodeProduk));
  });

  return dataRows.map((row) => ({
    kodeProduk: String(row[0]).trim(),
    skuInduk: row[1] || "",
    namaProduk: row[2] || "",
    deskripsi: row[3] || "",
  }));
}

/**
 * =========================
 * SALES FILE PARSER
 * =========================
 */
function parseSalesExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
  });

  const dataRows = rows.filter((row) => {
    const kodeProduk = row[0];

    if (!kodeProduk) return false;
    if (String(kodeProduk).includes("et_title")) return false;
    if (String(kodeProduk).includes("sales_info")) return false;
    if (kodeProduk === "Kode Produk") return false;

    return /^\d+$/.test(String(kodeProduk));
  });

  return dataRows.map((row) => ({
    kodeProduk: String(row[0]).trim(),
    namaProduk: row[1] || "",
    kodeVariasi: row[2] || "",
    namaVariasi: row[3] || "DEFAULT",
    skuInduk: row[4] || "",
    sku: row[5] || "",
    harga: Number(String(row[6] || 0).replace(/[^\d]/g, "")),
    stok: Number(row[8] || 0),
  }));
}

/**
 * =========================
 * BUILD SALES MAP
 * =========================
 */
function buildSalesMap(salesRows) {
  const salesMap = new Map();

  for (const row of salesRows) {
    const productId = row.kodeProduk;
    if (!productId) continue;

    if (!salesMap.has(productId)) {
      salesMap.set(productId, []);
    }

    salesMap.get(productId).push({
      variantName: row.namaVariasi,
      sku:
        row.sku ||
        `${productId}-${row.namaVariasi}`
          .replace(/\s+/g, "-")
          .toUpperCase(),
      price: row.harga,
      stock: row.stok,
    });
  }

  return salesMap;
}

/**
 * =========================
 * BUILD VARIANT PRODUCTS
 * =========================
 */
function buildVariantProducts(basicRows, salesMap) {
  const products = [];
  const errors = [];

  for (const row of basicRows) {
    const productId = String(row.kodeProduk || "").trim();
    if (!productId) continue;

    const variants = salesMap.get(productId);

    if (!variants || variants.length === 0) {
      errors.push({
        productId,
        message: "No variant found",
      });
      continue;
    }

    products.push({
      productId,
      name: row.namaProduk,
      description: row.deskripsi,
      variants,
    });
  }

  return { products, errors };
}

/**
 * =========================
 * MAIN ENGINE
 * =========================
 */
function buildShopeeVariants(basicRows, salesRows) {
  const salesMap = buildSalesMap(salesRows);

  const { products, errors } = buildVariantProducts(
    basicRows,
    salesMap
  );

  return {
    totalProducts: products.length,
    totalErrors: errors.length,
    products,
    errors,
  };
}

/**
 * =========================
 * EXPORTS
 * =========================
 */
module.exports = {
  parseBasicExcel,
  parseSalesExcel,
  buildSalesMap,
  buildVariantProducts,
  buildShopeeVariants,
};
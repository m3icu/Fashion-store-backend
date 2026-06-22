function validateBasicProduct(row) {
  const errors = [];
  
  if (!row.kodeProduk) {
    errors.push("Missing kodeProduk");
  }

  if (!row.namaProduk || row.namaProduk.trim() === "") {
    errors.push("Missing namaProduk");
  }

  if (!/^\d+$/.test(String(row.kodeProduk))) {
    errors.push("Invalid kodeProduk format");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function validateVariant(variant) {
  const errors = [];
    
  if (!variant.variantName) {
    errors.push("Missing variantName");
  }

  if (variant.price === undefined || variant.price < 0) {
    errors.push("Invalid price");
  }

  if (variant.stock === undefined || variant.stock < 0) {
    errors.push("Invalid stock");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateBasicProduct,
  validateVariant,
};

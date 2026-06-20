function formatImportError({ row, field, message, value = null }) {
  return {
    row,
    field,  
    message,
    value,
  };
}

module.exports = {
  formatImportError,
};

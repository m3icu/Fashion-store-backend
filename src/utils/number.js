//SAFE NUMBER PARSER
function toNumber(value, fallback = 0) {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
}

module.exports = { toNumber };
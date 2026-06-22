const stringSimiliarity = require("string-similiarity");
const { normalizeName } = require("./normalize");

function findBestMatch(name, map, threshold = 0.85) {
  const keys = [...map.keys()];

  const { bestMatch } = stringSimiliarity.findBestMatch(
    normalizeName(name),
    keys
  );

  if (bestMatch.rating >= threshold) {
    return map.get(bestMatch.target);
  }

  return null;
}

module.exports = ( findBestMatch );
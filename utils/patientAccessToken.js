const crypto = require("crypto");

function generateAccessToken(date, objectId, healthID) {
  const length = 6;
  // Step 1: Concatenate the inputs
  const inputString = `${date}-${objectId}-${healthID}`;

  // Step 2: Create a SHA-256 hash of the concatenated string
  const hash = crypto.createHash("sha256").update(inputString).digest("hex");

  // Step 3: Convert the hash to a Base64 string to make it more compact
  const base64Hash = Buffer.from(hash, "hex").toString("base64");

  // Step 4: Ensure the token is of the desired fixed length
  // If the length is greater than the available Base64 string, repeat the Base64 hash
  const fixedLengthToken =
    base64Hash.length >= length
      ? base64Hash.slice(0, length)
      : (base64Hash + base64Hash).slice(0, length);

  return fixedLengthToken;
}

module.exports = {
  generateAccessToken,
};

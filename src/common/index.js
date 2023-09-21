const { v4: uuidv4 } = require('uuid');

function generateUniqueToken(userId) {
  const token = uuidv4();
  const uniqueToken = `${userId}_${token}`;

  return uniqueToken;
}

function buildVerificationLink(baseUrl, uniqueToken, queryParams) {
  const url = new URL(baseUrl);
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  url.searchParams.append("token", uniqueToken);

  return url.toString();
}

module.exports = {
  generateUniqueToken,
  buildVerificationLink,
};
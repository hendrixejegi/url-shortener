const { readFile, writeFile } = require('node:fs/promises');
const path = require('node:path');

/**
 * Helper function to read DB
 * @returns {Promise<{db: {id:string; originalURL: string; shortenedURL: string}[]}>}
 */
async function readDB() {
  try {
    const filePath = path.resolve(process.env.DB_PATH);
    const contents = await readFile(filePath, { encoding: 'utf-8' });
    console.log('Data read successfully');
    return JSON.parse(contents);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

/**
 * Helper function to write to DB
 * @param {{db: {id:string; originalURL: string; shortenedURL: string}[]}} data
 */
async function writeDB(data) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    const filePath = path.resolve(process.env.DB_PATH);
    await writeFile(filePath, jsonString, { encoding: 'utf-8' });
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

/**
 * Generates string with given length
 * @param {number} length Number of characters
 * @returns Random string
 */
function generateString(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = { readDB, writeDB, generateString };

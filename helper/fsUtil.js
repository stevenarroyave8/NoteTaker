const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

/**
 * Writes content to the given destination as JSON with 4 spaces indentation.
 * @param {string} destination The file path to write to.
 * @param {object} content The content to write to the file.
 * @param {string} [message] Optional message to log after writing to file.
 * @returns {Promise<void>} Promise that resolves when writing is complete.
 */
const writeToFile = (destination, content, message = `\nData written to ${destination}`) => {
  return new Promise((resolve, reject) => {
    const json = JSON.stringify(content, null, 4);
    fs.writeFile(destination, json, (err) => {
      if (err) {
        reject(err);
      } else {
        console.info(message);
        resolve();
      }
    });
  });
};

/**
 * Appends content to the given file as JSON.
 * @param {object} content The content to append to the file.
 * @param {string} file The file path to append to.
 * @returns {Promise<void>} Promise that resolves when writing is complete.
 */
const readAndAppend = async (content, file) => {
  try {
    const data = await readFromFile(file);
    const parsedData = JSON.parse(data);
    parsedData.push(content);
    await writeToFile(file, parsedData);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { readFromFile, writeToFile, readAndAppend };
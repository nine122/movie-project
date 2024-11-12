const fs = require("fs").promises;

const removeFile = async (path) => {
  let fileExits;
  try {
    await fs.access(path);
    fileExits = true;
  } catch {
    fileExits = false;
  }
  if (fileExits) {
    fs.unlink(path);
  }
};

module.exports = removeFile;

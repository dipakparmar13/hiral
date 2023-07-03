const sharp = require("sharp");
const path = require("path");

class Resize {
  constructor(folder) {
    this.folder = folder;
  }
  async saveThumbs(buffer, fn) {
    const filename = fn;
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(300, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(filepath);

    return filename;
  }
  async save(buffer, fn) {
    const filename = fn;
    const filepath = this.filepath(filename);

    await sharp(buffer).toFile(filepath);

    return filename;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`);
  }
}
module.exports = Resize;

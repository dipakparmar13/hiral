const { v4: uuidv4 } = require("uuid");
const mime = require("mime-types");
var path = require("path");
const Resize = require("../middleware/resize");

module.exports.profilePhoto = async (imageData, folder_name) => {
  if (imageData) {
    var profileImage = `${uuidv4()}.${mime.extension(imageData.mimetype)}`;

    const imageThumbsPath = path.join(__dirname, `../uploads/${folder_name}`);
    const imagePath = path.join(__dirname, `../uploads/${folder_name}/thumb`);

    //save thumb image
    const f1 = new Resize(imageThumbsPath);
    f1.saveThumbs(imageData.buffer, profileImage);

    //save orignal image
    const f2 = new Resize(imagePath);
    f2.save(imageData.buffer, profileImage);

    return profileImage;
  }
};

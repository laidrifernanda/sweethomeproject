const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    return cb(new Error("Only images are allowed"));
  }
  cb(null, true);
};
module.exports = imageFilter;

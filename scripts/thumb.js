const imageThumbnail = require('image-thumbnail');
const fs = require('fs');
const IMAGE_FULLSIZE_DIR = 'static/images';
const IMAGE_THUMBS_DIR = 'static/images/thumbs';
const options = { 
  width: 405, 
  height: 270, 
  jpegOptions: { 
    force: true, 
    quality: 90 
  }
};

fs.readdirSync(IMAGE_FULLSIZE_DIR).forEach(fileName => {
  const fullsizeImagePath = `${IMAGE_FULLSIZE_DIR}/${fileName}`;
  const thumbImagePath = `${IMAGE_THUMBS_DIR}/__thumb-${fileName}`;

  if (fs.statSync(fullsizeImagePath).isDirectory() || fs.existsSync(thumbImagePath)) {
    return;
  } else {
    imageThumbnail(fullsizeImagePath, options)
      .then(thumbnail => fs.writeFileSync(thumbImagePath, thumbnail))
      .catch(err => console.error(fileName, err)); 
  }
});
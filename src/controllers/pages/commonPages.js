const PagesController = require('./pagesController');
const fs = require('fs');
const { NotFoundError } = require('../../validators/customError');
const path = require('path');

class CommonPages extends PagesController {
  constructor() {
    super();
  }

  homePage = (req, res, next) => {
    try {
      const svgDirPath = path.join(__dirname, '..', '..', 'static', 'images', 'svg');
      fs.readdir(svgDirPath, (err, files) => {
        if (err) {
          throw new NotFoundError('error in reading files');
        }

        const filesData = [];

        files.forEach((file) => {
          const svgData = {
            id: file.split('.')[0],
            path: `/images/svg/${file}`,
          };

          filesData.push(svgData);
        });

        const tempData = this.createTempData({
          name: 'ivan',
          filesData
        });

        return res.render('home', tempData);
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CommonPages();
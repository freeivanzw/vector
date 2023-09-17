const PagesController = require('./pagesController');
const fs = require('fs');
const fsPromises = fs.promises;
const { NotFoundError, BadRequestError } = require('../../validators/customError');
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
  detailsPage = async (req, res, next) => {
    try {
      if (!req.params?.id) {
        throw new BadRequestError('id not available');
      }

      const vectorId = req.params.id;

      const fileName = `${vectorId}.svg`;
      const filePath = path.join(__dirname, '..', '..', 'static', 'images', 'svg', fileName);

      await fsPromises.access(filePath);

      const fileUrl = `/images/svg/${fileName}`;


      const tempData = this.createTempData({
        id: vectorId,
        svgUrl: fileUrl,
      });

      return res.render('details', tempData);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new CommonPages();
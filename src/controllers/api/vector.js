const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const { BadRequestError, NotFoundError } = require('../../validators/customError');
const { v4: uuidv4 } = require('uuid');

class VectorController {
  async add(req, res, next) {
    try {
      if (!req.files?.svg) {
        throw new BadRequestError('svg empty');
      }

      const fileData = req.files.svg.data;

      const uuidFile = uuidv4();
      const fileName = uuidFile + '.svg';
      const uploadPath = path.join(__dirname, '..', '..', 'static', 'images', 'svg', fileName);

      await fsPromises.writeFile(uploadPath, fileData);

      const resData = {
        success: true,
        svgData: {
          id: uuidFile,
          path: `/images/svg/${fileName}`,
        }
      };

      return res.json(resData);
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      if (!req.query?.id) {
        throw new BadRequestError('id not available');
      }

      const fileName = req.query?.id + '.svg';
      const filePath = path.join(__dirname, '..', '..', 'static', 'images', 'svg', fileName);

      await fsPromises.unlink(filePath);

      return res.json({ success: true });
    } catch (err) {
      if (err.code === 'ENOENT') {
        return next(new NotFoundError('file not found'));
      }

      next(err);
    }
  }
  async getById(req, res, next) {
    try {
      if (!req.params?.id) {
        throw new BadRequestError('id not available');
      }

      const vectorId = req.params.id;

      const fileName = `${vectorId}.svg`;
      const filePath = path.join(__dirname, '..', '..', 'static', 'images', 'svg', fileName);

      await fsPromises.access(filePath);

      const fileUrl = `/images/svg/${fileName}`;

      res.json({
        success: true,
        fileUrl
      });
    } catch (err) {
      if (err.code === 'ENOENT') {
        return next(new NotFoundError('file not found'));
      }
      next(err);
    }
  }
  async getAll(req, res, next) {
    try {
      const svgDirPath = path.join(__dirname, '..', '..', 'static', 'images', 'svg');
      fs.readdir(svgDirPath, (err, files) => {
        if (err) {
          throw new NotFoundError('error in reading files');
        }

        const resData = {
          success: true,
          list: [],
          count: 0,
        };

        files.forEach((file) => {
          const svgData = {
            id: file.split('.')[0],
            path: `/images/svg/${file}`,
          };

          resData.list.push(svgData);
          resData.count++;
        });

        res.json(resData);
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new VectorController();
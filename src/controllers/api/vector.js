const fs = require('fs');
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
      const uploadPath = path.join(__dirname, '..', '..', 'static', 'images', fileName);


      await fs.promises.writeFile(uploadPath, fileData);

      return res.json({ success: true });
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
      const filePath = path.join(__dirname, '..', '..', 'static', 'images', fileName);

      await fs.promises.unlink(filePath);

      return res.json({ success: true });
    } catch (err) {
      if (err.code === 'ENOENT') {
        return next(new NotFoundError('file not found'));
      }

      next(err);
    }
  }
}

module.exports = new VectorController();
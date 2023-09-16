const PagesController = require('./pagesController');

class CommonPages extends PagesController {
  constructor() {
    super();
  }

  homePage = (req, res, next) => {
    try {
      const tempData = this.createTempData({
        name: 'ivan',
      });

      return res.render('home', tempData);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CommonPages();
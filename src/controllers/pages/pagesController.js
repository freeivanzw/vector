class PagesController {
  constructor() {
    this.pageData = {};
  }

  createTempData(data) {
    if (!data) {
      return ;
    }
    
    this.pageData = {
      host: process.env.HOST,
      siteName: process.env.SITE_NAME,
      ...data,
    };

    return this.pageData;
  }

}
module.exports = PagesController;
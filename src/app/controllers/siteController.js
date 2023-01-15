class siteController {
  // [GET] /
  index(req, res, next) {
    res.render("home");
  }

  // [GET] /about
  about(req, res, next) {
    res.render("about");
  }
}

export default new siteController();

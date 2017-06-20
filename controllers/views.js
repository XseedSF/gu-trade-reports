const BaseController = require("./baseController.js");

class ViewsController extends BaseController {
  constructor(app) {
    super(app);
  }

  redirect(req, res, redirection) {
    let query = req._parsedOriginalUrl.query;
    query = query == "" || query == null ? "" : "?" + query;
    res.redirect("/" + redirection + query);
  }

  unauthorized(req, res) {
    this.returnView(res, "401.html");
  }
}

module.exports = ViewsController;

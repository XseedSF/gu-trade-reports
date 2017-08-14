const BaseController = require("./baseController.js");
const GuTradeApi = require("../guTradeApi");

var sess;
class FormsReportController extends BaseController {
  constructor(app) {
    super(app);
  }

  /// API
  getCompletedForms(req, res) {
    sess = req.session;
    let filter = {
      formId: req.query.formId,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
      points: req.query.points,
      persons: req.query.persons,
      userId: sess.userId
    };
    let formsApi = new GuTradeApi.FormApi(sess.ambient);
    formsApi.getCompletedForms(
      filter,
      data => {
        res.send({ error: false, data: data });
      },
      err => {
        res.send({ error: true, data: null });
      }
    );
  }
}

module.exports = FormsReportController;

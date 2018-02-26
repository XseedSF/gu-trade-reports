const BaseController = require("./baseController.js");
const GuTradeApi = require("../guTradeApi");

class FormsReportController extends BaseController {
  constructor(app) {
    super(app);
  }

  /// API
  getCompletedForms(req, res) {
    const session = req.session;
    const filter = {
      formId: req.query.formId,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
      points: req.query.points,
      persons: req.query.persons,
      userId: session.userId
    };
    const formsApi = new GuTradeApi.FormApi(session);
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

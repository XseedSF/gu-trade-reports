const BaseController = require("./baseController.js");
const GuTradeApi = require("../guTradeApi");

var sess;
class AnswerController extends BaseController {
  constructor(app) {
    super(app);
  }

  /// API
  getImage(req, res) {
    const answerId = req.query.answerId;

    sess = req.session;
    const answerApi = new GuTradeApi.AnswerApi(sess);

    answerApi.getImage(
      answerId,
      data => {
        res.send({ error: false, data: data });
      },
      err => {
        res.send({ error: true, data: null });
      }
    );
  }
}

module.exports = AnswerController;

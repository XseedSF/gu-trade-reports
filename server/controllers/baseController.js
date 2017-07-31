var path = require('path');

class BaseController {
	constructor(app, controllerName) {
		this.app = app;
		this.viewspath = path.dirname(require.main.filename) + "/views/";
		//this.controllerFolder = controllerName;
	}

	/// Get - Set
	getApp() {
		return this.app;
	}

	/// Controller Logic
	returnView(res, view) {
		res.render(view);
	}
}

module.exports = BaseController;
// app/api/units.js

module.exports = function (app) {

	// Require mongoDB Request model
	var Units = require('./../models/unit.js');
	var middlewares = require('./../middlewares.js');

	function createUnit(data, res) {
		Units.create(data, function (err, unit) {
			if(err) {
				res.send(err);
				console.error(err);
			}
			res.json(unit);
		});
	}

	// GET /api/units
	app.get('/api/units', middlewares.requireLogin, function(req, res){// TODO: change the middleware to adminCheck
		Units.find(function (err, units) {
			if (err) {
				res.send(err);
			}
			res.json(units);
		})
	})

	// POST /api/units
	app.post('/api/units', middlewares.requireLogin, function (req, res) {
		var data = {
			unitName: 	req.body.unitName,
			subunit: 	req.body.subunit
		};
		createUnit(data, res)
	});
}

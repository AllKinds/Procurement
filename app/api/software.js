// app/api/software.js

module.exports = function (app) {

	// Require mongoDB Request model
	var Softwares = require('./../models/software.js');
	var middlewares = require('./../middlewares.js');

	function fetchAllSoftwares(res) {
		Softwares.find({}).exec(function (err, softwares){ // Explain exec
			// Error fetching softwares
			if(err){
				res.send(err);
			}
			// Send all softwares in json format
			res.json(softwares);
		});
	}

	function createSoftware(data, res) {
		Softwares.create(data, function (err, software) {
			if(err) {
				res.send(err);
				console.error(err);
			}
			res.json(software);
		});
	}

	// GET /api/softwares
	app.get('/api/softwares', middlewares.requireLogin, function(req, res){// TODO: change the middleware to adminCheck
		fetchAllSoftwares(res);
	})
	
	app.get('/api/softwares/:software_id', middlewares.requireLogin, function(req, res){// TODO: change the middleware to adminCheck
		Softwares.findById(req.params.software_id, function (err, software) {
			if (err) {
				res.send(err);
			}
			
			res.json(software);
		});
	})

	// POST /api/softwares
	app.post('/api/softwares', middlewares.requireLogin, function (req, res) {
		var data = {
			// catNoSapir: 	req.body.catNoSapir,
			producerId: 	req.body.producerId ,
			// catNoTltn: 		req.body.catNoTltn ,
			publisherName: 		req.body.publisherName,
			softCon: 		req.body.softCon ,
			// productGroup: 	req.body.productGroup ,
			platform: 		req.body.platform ,
			// intelNeed: 		req.body.intelNeed ,
			licenceCost: 	req.body.licenceCost ,
			supportCost: 	req.body.supportCost ,
			type: 			req.body.type 
			// comments: 		req.body.comments ,
			// alternatives: 	req.body.alternatives ,
			// updateCost: 	req.body.updateCost ,
			// monitorTools: 	req.body.monitorTools ,
			// extraInfo: 		req.body.extraInfo
		};
		createSoftware(data, res)
	});
}
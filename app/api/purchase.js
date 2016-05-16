// app/api/purchase.js

module.exports = function (app) {

	// Require mongoDB Request model
	var Purchase 	= require('./../models/purchase.js');
	var Unit 	 	= require('./../api/unit.js');
	var Software 	= require('./../models/software.js');
	var middlewares = require('./../middlewares.js');




	function createPurchase(data, res) {
		Purchase.create(data, function (err, purchase) {
			if(err) {
				res.send(err);
				console.error(err);
			}

			purchase.populate('software', function(err) { // populate('unit')
				if(err) {
					console.error(err);
				}
				res.json(purchase);
			});
		});
	}

	// GET /api/purchase
	app.get('/api/purchase', middlewares.requireLogin, function(req, res){// TODO: change the middleware to adminCheck
		Purchase.find(function (err, purchase) {
			if (err) {
				res.send(err);
			}
			res.json(purchase);
		})
	})

	// POST /api/purchase
	app.post('/api/purchase', middlewares.requireLogin, function (req, res) {
		var data = {
			unit: 		req.body.unit,
			// software: 	req.body.software,
			ammount: 	req.body.ammount
		};
		Software.findOne({ producerId: req.body.sProducerId}, function(err, software) {
			if(err) {
				console.error(err);
				res.send(err);
			}

			if(!software){
				//TODO: delete
				Software.create({
					producerId: 	req.body.sProducerId,
					publisherName: 	req.body.sPublisherName,
					softCon: 		req.body.sSoftCon,
					platform: 		req.body.sPlatform,
					licenceCost: 	req.body.sLicenceCost,
					type: 			req.body.sType
				}, function (err, new_software) {
					if(err) {
						console.error(err);
						res.send(err);
					}

					data.software = new_software._id;
					createPurchase(data, res);
				});
			}
			else {
				data.software = software._id;
				createPurchase(data, res);
			}
		});
	});
}

			
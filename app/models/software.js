
var mongoose = 	require('mongoose'),
	Schema   = 	mongoose.Schema;

var softwareSchema = new Schema({
	producerId: {
		type: String,
		required: true
	},
	publisherName: {
		type: String,
		required: true
	},
	softCon: {
		type: String,                                  
		required: true
	},
	platform: {
		type: String,
		default: "Reg"
	},
	licenceCost: {
		type: Number,
		required: true
	},
	supportCost: {
		type: Number
	},
	type: {
		type: String,
		default: "Reg"
	}
});

softwareSchema.method('toJSON', function(){
	return {
		id: this._id,
		// catNoSapir: 	this.catNoSapir,
		producerId: 	this.producerId ,
		// catNoTltn: 		this.catNoTltn ,
		publisherName: 		this.publisherName,
		softCon: 		this.softCon ,
		// productGroup: 	this.productGroup ,
		platform: 		this.platform ,
		// intelNeed: 		this.intelNeed ,
		licenceCost: 	this.licenceCost ,
		supportCost: 	this.supportCost ,
		type: 			this.type 
		// comments: 		this.comments ,
		// alternatives: 	this.alternatives ,
		// updateCost: 	this.updateCost ,
		// monitorTools: 	this.monitorTools ,
		// extraInfo: 		this.extraInfo
	};
});

var Software = mongoose.model('Software', softwareSchema);

module.exports = Software;
var mongoose =  require('mongoose'),
	Schema	 = 	mongoose.Schema;

var purchaseSchema = new Schema({
	unit: {
		// type: Schema.ObjectId,
		// ref: "Unit"
		type: String,
		default: "Temp Unit"
	},
	software: {
		type: Schema.ObjectId,
		ref: "Software"
	},
	ammount: {
		type: Number,
		required: true,
		default: 1
	}
});

purchaseSchema.method('toJSON', function(){
	return {
		id: this._id,
		unit: this.unit,
		software: this.software,
		ammount: this.ammount
	};
});

var Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
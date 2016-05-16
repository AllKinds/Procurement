var mongoose =  require('mongoose'),
	Schema	 = 	mongoose.Schema;

var unitSchema = new Schema({
	unitName: {
		type: String,
		required: true
	},
	subunit: {
		type: String,
		default: ""
	}
});

unitSchema.method('toJSON', function(){
	return {
		id: this._id,
		unitName: this.unitName,
		subunit: this.subunit
	};
});

var Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;
const { Schema, model } = require('mongoose');

const carSchema = Schema({
	model: {
		type: String,
		required: true,
	},
	engine: {
		type: String,
		required: true,
	},
	categoryId: {
		type: Number,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	gearbox: {
		type: String,
		required: true,
	},
	maxSpeed: {
		type: String,
		required: true,
	},
	power: {
		type: String,
		required: true,
	},
	zeroToHundred: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: true,
	}
},
	{
		timeStamps: true
	});

	const CarModel = model('Car', carSchema);

	module.exports = CarModel;

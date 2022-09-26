const { Schema, Types, model } = require('mongoose');
const yup = require('yup');

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
		type: Schema.Types.ObjectId,
		ref: 'Category',
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
	},
}, {
	timestamps: true
});


const carValidationSchema = yup.object().shape({
	model: yup
		.string().typeError('Car model must be a string')
		.required('Car model is required'),
	engine: yup
		.string().typeError('Car engine must be a string')
		.required('Car engine is required'),
	categoryId: yup
		.string().typeError('Car categoryId must be a string')
		.test(
			'is-mongo-object-id',
			'Car categoryId must be valid MongoDB object Id',
			Types.ObjectId.isValid
		)
		.required('CategoryId is required'),
	color: yup
		.string().typeError('Car color must be a string')
		.required('Car color is required'),
	gearbox: yup
		.string().typeError('Car gearbox must be a string')
		.required('Car gearbox is required'),
	maxSpeed: yup
		.string().typeError('Car maxSpeed must be a string')
		.required('Car maxSpeed is required'),
	power: yup
		.string().typeError('Car power must be a string')
		.required('Car power is required'),
	zeroToHundred: yup
		.string().typeError('Car zeroToHundred must be a string')
		.required('Car zeroToHundred is required'),
	price: yup
		.string().typeError('Car price must be a string')
		.required('Car price is required'),
	img: yup
		.string().typeError('Car img address must be a string')
		.required('Car img adress is required')
});

const carUpdateValidationSchema = yup.object().shape({
	model: yup.string().typeError('Car model must be a string'),
	engine: yup.string().typeError('Car engine must be a string'),
	categoryId: yup.string().typeError('Car categoryId must be a string')
	.test(
		'is-mongo-object-id',
		'Car categoryId must be valid MongoDB object Id',
		Types.ObjectId.isValid
	),
	color: yup.string().typeError('Car color must be a string'),
	gearbox: yup.string().typeError('Car gearbox must be a string'),
	maxSpeed: yup.string().typeError('Car maxSpeed must be a string'),
	power: yup.string().typeError('Car power must be a string'),
	zeroToHundred: yup.string().typeError('Car zeroToHundred must be a string'),
	price: yup.string().typeError('Car price must be a string'),
	img: yup.string().typeError('Car img address must be a string')
});

carSchema.statics.validateData = (carData) => carValidationSchema.validate(carData)
carSchema.statics.validateUpdateData = (carData) => carUpdateValidationSchema.validate(carData)

const CarModel = model('Car', carSchema);

module.exports = CarModel;

const { Schema, Types, model } = require('mongoose');
const yup = require('yup');

const userSchema = Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['USER', 'ADMIN'],
		default: 'USER'
	},
	img: {
		type: String,
	},
}, {
	timestamps: true
});

const userValidationSchema = yup.object({
	email: yup
		.string().typeError('User email must be a string')
		.required('User email is required')
		.email('Invalid User email format')
		.test(
			'email-check',
			'User email already exists',
			async (email) => {
				const foundUser = await UserModel.findOne({ email });

				return foundUser === null;
			}
		),
	password: yup.string().typeError('User password must be a string')
		.required('User password is required')
		.min(8, 'User password must have at least 8 symbols')
		.max(32, 'User password must be no more than 32 symbols')
		.matches(/[a-z]/, 'User password must have at least one lowercase letter')
		.matches(/[A-Z]/, 'User password must have at least one uppercase letter')
		.matches(/\d/, 'User password must have at least one number')
		.matches(/\W/, 'User password must have at least one special symbol'),
	passwordConfirmation: yup.string().typeError('User password confirmation must be a string')
		.required('User password confirmation is required')
		.oneOf([yup.ref('password')], 'User password confirmation does not match User password'),
	role: yup.string().typeError('User role must be a string')
		.oneOf(['USER', 'ADMIN']),
	img: yup
		.string().typeError('User img must be a string'),
});

const userUpdateValidationSchema = yup.object({
	email: yup
		.string().typeError('User email must be a string')
		.email('Invalid User email format')
		.test(
			'email-check',
			'User email already exists',
			async (email) => {
				const foundUser = await UserModel.findOne({ email });

				return foundUser === null;
			}
		),
	password: yup
		.string().typeError('User password must be a string')
		.min(8, 'User password must have at least 8 symbols')
		.max(32, 'User password must be no more than 32 symbols')
		.matches(/[a-z]/, 'User password must have at least one lowercase letter')
		.matches(/[A-Z]/, 'User password must have at least one uppercase letter')
		.matches(/\d/, 'User password must have at least one number')
		.matches(/\W/, 'User password must have at least one special symbol')
		.oneOf([yup.ref('passwordConfirmation')], 'User password does not match User password confirmation'),
	passwordConfirmation: yup.string().typeError('User password confirmation must be a string'),
	role: yup.string().typeError('User role must be a string').oneOf(['USER', 'ADMIN']),
	img: yup.string().typeError('User.img must be a string')
});

userSchema.statics.validateData = (userData) => userValidationSchema.validate(userData);
userSchema.statics.validateUpdateData = (userData) => userUpdateValidationSchema.validate(userData);

const UserModel = model('User', userSchema);

UserModel.validate

module.exports = UserModel;

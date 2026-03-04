// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
	{

		firstName: {
			type: String,
			required: true,
			trim: true,
			validate: {
				validator: function (v) {
					return /^[a-zA-Z ]+$/.test(v); // Validate that it contains only letters
				},
				message: props => `${props.value} is not a valid first name`
			}
		},

		lastName: {
			type: String,
			trim: true,
			validate: {
				validator: function (v) {
					return /^[a-zA-Z ]+$/.test(v); // Validate that it contains only letters 
				},
				message: props => `${props.value} is not a valid last name`
			}
		},

		email: {
			type: String,
			required: true,
			trim: true,
			validate: {
				validator: function (v) {
					// Basic email format validation
					return /\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(v);
				},
				message: props => `${props.value} is not a valid Gmail address`
			}
		},

		password: {
			type: String,
			required: true,
			minlength: 5, // Minimum length validation
		},

		accountType: {
			type: String,
			enum: ["Admin", "Student", "Instructor"],
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
		approved: {
			type: Boolean,
			default: true,
		},
		additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Profile",
		},
		courses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
			},
		],
		token: {
			type: String,
		},
		resetPasswordExpires: {
			type: Date,
		},
		image: {
			type: String,
			required: true,
		},
		courseProgress: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "courseProgress",
			},
		],
	},
	{ timestamps: true }
);


module.exports = mongoose.model("user", userSchema);

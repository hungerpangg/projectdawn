const mongoose = require("mongoose");
const { isEmail } = require("validator");

const staffSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Please enter an email"],
		unique: true,
		lowercase: true,
		validate: [isEmail, "Please enter a valid email"],
	},
	role: {
		type: String,
		enum: [
			"admin",
			"corpsec",
			"accounting",
			"hrms",
			"insurance",
			"legal",
			"it/product",
		],
		required: true,
	},
	name: {
		type: String,
		required: [true, "Please enter a name"],
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minlength: [6, "Minimum password length is 6 characters"],
	},
});

// static method to login user
staffSchema.statics.login = async function (email, password) {
	console.log("wtf");
	const staff = await this.findOne({ email });
	if (staff) {
		if (password === staff.password) {
			return staff;
		}
		throw Error("incorrect password");
	}
	throw Error("incorrect email");
};

const Staff = mongoose.model("staff", staffSchema);

module.exports = Staff;

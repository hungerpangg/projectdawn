const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Please enter an email"],
		unique: true,
		lowercase: true,
		validate: [isEmail, "Please enter a valid email"],
	},
	company: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "company",
	},
	role: {
		type: String,
		enum: ["director", "employee", "admin"],
		required: true,
	},
	name: {
		type: String,
		required: [true, "Please enter a name"],
	},
	singaporeCitizen: {
		type: Boolean,
		required: [true, "Please enter a country"],
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minlength: [6, "Minimum password length is 6 characters"],
	},
});

// static method to login user
userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		if (password === user.password) {
			return user;
		}
		throw Error("incorrect password");
	}
	throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;

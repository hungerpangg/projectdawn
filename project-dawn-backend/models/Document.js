const mongoose = require("mongoose");
const { isEmail } = require("validator");

const documentSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: [true, "Please enter a country"],
	},
	category: {
		type: String,
		required: [true, "Please enter a country"],
	},
	ticket: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "ticket",
	},
	company: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "company",
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

// static method to login user
// userSchema.statics.login = async function (email, password) {
// 	const user = await this.findOne({ email });
// 	if (user) {
// 		const auth = await bcrypt.compare(password, user.password);
// 		if (auth) {
// 			return user;
// 		}
// 		throw Error("incorrect password");
// 	}
// 	throw Error("incorrect email");
// };

// documentSchema.pre("updateOne", function (next) {
// 	this.update({}, { $set: { updatedAt: new Date() } });
// 	next();
// });

const Document = mongoose.model("document", documentSchema);

module.exports = Document;

const mongoose = require("mongoose");
const { isEmail } = require("validator");

const ticketSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ["Issue Shares", "Appoint a Director"],
		required: true,
	},
	category: {
		type: String,
		enum: ["corpsec", "accounting", "hrms", "insurance", "legal"],
		required: [true, "Please enter a country"],
	},
	company: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "company",
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	assignee: {
		type: Boolean,
	},
	payload: {
		type: mongoose.Schema.Types.Mixed,
		required: [true, "Please enter a country"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	completedAt: {
		type: Date,
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

ticketSchema.pre("updateOne", function (next) {
	this.update({}, { $set: { updatedAt: new Date() } });
	next();
});

const Ticket = mongoose.model("ticket", ticketSchema);

module.exports = Ticket;

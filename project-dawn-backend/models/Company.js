const mongoose = require("mongoose");
const { isEmail } = require("validator");

const companySchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: [true, "Please enter a name"],
	},
	businessEntity: {
		type: String,
		required: [true, "Please enter a country"],
	},
	shareholdersNo: {
		type: Number,
		required: [true, "Please enter a country"],
	},
	virtualOfficeServices: {
		type: Boolean,
		required: [true, "Please enter a country"],
	},
	visaServices: {
		type: Boolean,
		required: [true, "Please enter a country"],
	},
	otherServices: {
		type: Boolean,
		required: [true, "Please enter a country"],
	},
	UEN: {
		type: String,
	},
	prevServiceProviderUEN: {
		type: String,
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

const Company = mongoose.model("company", companySchema);

module.exports = Company;

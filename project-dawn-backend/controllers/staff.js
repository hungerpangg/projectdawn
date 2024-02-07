const Staff = require("../models/Staff");
const Ticket = require("../models/Ticket");
const Document = require("../models/Document");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const s3 = new aws.S3({
	accessKeyId: process.env.S3_ACCESS_KEY,
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
	region: process.env.S3_BUCKET_REGION,
});

const upload = multer({
	storage: multerS3({
		s3,
		bucket: "sequence-projectdawn",
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname, "Content-Type": file.mimetype });
		},
		key: function (req, file, cb) {
			const token = req.cookies.jwt;
			jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decodedToken) => {
				console.log(decodedToken.id, "decoded");
				cb(null, decodedToken.id + "_" + file.originalname);
			});
		},
	}),
});

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, userType) => {
	return jwt.sign({ id, userType }, process.env.JWT_TOKEN_SECRET, {
		expiresIn: maxAge,
	});
};

// handle errors
const handleErrors = (err) => {
	let errors = {};

	// incorrect email
	if (err.message === "incorrect email") {
		errors.email = "That email is not registered";
	}

	// incorrect password
	if (err.message === "incorrect password") {
		errors.password = "That password is incorrect";
	}

	// duplicate email error
	if (err.code === 11000) {
		errors.email = "That email is already registered";
		return errors;
	}

	// validation errors
	if (err.message.includes("user validation failed")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

module.exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const staff = await Staff.login(email, password);
		console.log(staff);
		const { name, role } = staff;
		const token = createToken(staff._id, "staff");
		res.cookie("jwt", token, {
			maxAge: maxAge * 1000,
			secure: true,
			sameSite: "None",
			domain: ".projectdawn-sequence.com",
			path: "/",
		});
		res.status(201).json({
			success: true,
			data: { email, name, role },
		});
	} catch (err) {
		console.log(err, "err");
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

// module.exports.getTickets = async (req, res) => {
// 	var category;
// 	const token = req.cookies.jwt;
// 	({ category, companyId } = req.query);
// 	console.log(companyId, "companyId");
// 	if (category || companyId) {
// 		try {
// 			const tickets = await Ticket.find({ category, company: companyId })
// 				.populate("creator", "name")
// 				.lean();
// 			res.status(201).json(tickets);
// 		} catch (err) {
// 			console.log(err);
// 			res.status(404).json({ ok: false, error: "Unable to retrieve tickets" });
// 		}
// 	} else {
// 		res.status(404).json({ ok: false, error: "Invalid category or companyId" });
// 	}
// 	// } else {
// 	// 	try {
// 	// 		const user = await User.findById(id);
// 	// 		req.user = user;
// 	// 	} catch (err) {
// 	// 		req.user = null;
// 	// 	}
// 	// }
// };

module.exports.sendAuthenticatedCachedDetails = async (req, res) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(
			token,
			process.env.JWT_TOKEN_SECRET,
			async (err, decodedToken) => {
				const staff = await Staff.findOne({ _id: decodedToken.id });
				res.status(201).json(staff);
			}
		);
	}
};

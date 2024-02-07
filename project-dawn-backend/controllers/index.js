const User = require("../models/User");
const Company = require("../models/Company");
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

module.exports.deleteAllTickets = async (req, res) => {
	console.log("Delete ran!");
	const deleteTickets = await Ticket.deleteMany({});
	const deleteDocuments = await Document.deleteMany({});
};

module.exports.signup_post = async (req, res) => {
	console.log(req.body);
	var {
		nameInput,
		directorInput,
		businessEntityInput,
		companyNameInput,
		citizenInput,
		shareholdersInput,
		virtualOfficeInput,
		servicesInput,
		visaInput,
		emailInput,
		passwordInput,
	} = req.body;

	try {
		const company = await Company.create({
			name: companyNameInput,
			businessEntity: businessEntityInput,
			shareholdersNo: shareholdersInput,
			virtualOfficeServices: virtualOfficeInput,
			otherServices: servicesInput,
			visaServices: visaInput,
		});
		const companyId = company._id;
		console.log(company);
		const user = await User.create({
			email: emailInput,
			name: nameInput,
			password: passwordInput,
			singaporeCitizen: citizenInput,
			role: directorInput,
			company: company._id,
		});
		console.log(user);
		const token = createToken(user._id, "client");
		res.cookie("jwt", token, {
			maxAge: maxAge * 1000,
		});
		const userId = user._id.toString();
		res.status(201).json({ redirected: true, userId, companyId });
	} catch (err) {
		console.log(err);
		const errors = handleErrors(err);
		console.log(errors, "manual");
		res.status(400).json({ errors });
	}
};

module.exports.sendAuthenticatedCachedDetails = async (req, res) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(
			token,
			process.env.JWT_TOKEN_SECRET,
			async (err, decodedToken) => {
				const user = await User.findOne({ _id: decodedToken.id });
				res.status(201).json(user);
			}
		);
	}
};

module.exports.issueSharesRequest = async (req, res) => {
	const uploadArray = upload.array("files");
	uploadArray(req, res, (err) => {
		if (err) console.log(err);
		const token = req.cookies.jwt;
		if (token) {
			jwt.verify(
				token,
				process.env.JWT_TOKEN_SECRET,
				async (err, decodedToken) => {
					if (err) {
						console.log(err);
					} else {
						console.log(decodedToken);
						try {
							let documents = [];
							console.log(req.body.category, "category");
							for (let file of req.files) {
								let document = await Document.create({
									url: file.location,
									name: file.originalname,
									creator: decodedToken.id,
									category: req.body.category,
								});
								documents.push(document);
							}
							const documentsIds = documents.map((document) => document._id);
							const { type, category, ...rest } = req.body;
							const ticketPayload = {
								...rest,
								documentsIds,
							};
							const user = await User.findOne({
								_id: decodedToken.id,
							});
							const ticket = await Ticket.create({
								type,
								category,
								company: user.company,
								creator: user._id,
								payload: ticketPayload,
							});
							for (let document of documents) {
								document.ticket = ticket._id;
								document.company = ticket.company;
								await document.save();
							}
							console.log(ticket);
							if (ticket) {
								res.status(200).json({ success: true });
							}
							// if (result.modifiedCount === 1) {
							// 	res
							// 		.status(200)
							// 		.json({ redirected: true, ok: true, id: decodedToken.id });
							// } else {
							// 	console.log(result, "No documents were modified.");
							// }
						} catch (err) {
							console.log(err);
							res.status(404).json({ message: err.message });
						}
					}
				}
			);
		} else {
			console.log("Authentication failed");
		}
	});
};

module.exports.login = async (req, res) => {
	var { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const token = createToken(user._id, "client");
		res.cookie("jwt", token, {
			maxAge: maxAge * 1000,
		});
		// var { email, _id, name } = user;
		// const userId = _id.toString();
		const { company } = user;
		console.log(user);
		res.status(201).json({
			success: true,
			data: { company },
		});
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.getTickets = async (req, res) => {
	// var category;
	const token = req.cookies.jwt;
	const { category, companyId, ticketId } = req.query;
	console.log(companyId, category, ticketId, "companyId");
	let query = {};
	if (category) {
		query.category = category;
	}
	if (companyId) {
		query.company = companyId;
	}
	if (ticketId) {
		query._id = ticketId;
	}
	if (category || companyId || ticketId) {
		try {
			const tickets = await Ticket.find(query)
				.populate("creator")
				.populate("company")
				.lean();
			res.status(201).json(tickets);
		} catch (err) {
			console.log(err);
			res.status(404).json({ ok: false, error: "Unable to retrieve tickets" });
		}
	} else {
		res.status(404).json({ ok: false, error: "Invalid category or companyId" });
	}
	// } else {
	// 	try {
	// 		const user = await User.findById(id);
	// 		req.user = user;
	// 	} catch (err) {
	// 		req.user = null;
	// 	}
	// }
};

module.exports.getDocuments = async (req, res) => {
	// var category;
	const token = req.cookies.jwt;
	const { category, companyId, ticketId } = req.query;
	console.log(companyId, category, ticketId, "getdocuments");
	let query = {};
	if (category) {
		query.category = category;
	}
	if (companyId) {
		query.company = companyId;
	}
	if (ticketId) {
		query.ticket = ticketId;
	}
	try {
		const documents = await Document.find(query)
			.populate("creator", "name")
			.lean();
		res.status(201).json(documents);
	} catch (err) {
		console.log(err);
		res.status(404).json({ ok: false, error: "Unable to retrieve documents" });
	}

	// } else {
	// 	try {
	// 		const user = await User.findById(id);
	// 		req.user = user;
	// 	} catch (err) {
	// 		req.user = null;
	// 	}
	// }
};

module.exports.logout = (req, res) => {
	res.cookie("jwt", "", {
		maxAge: 1,
	});
	res.status(200).json({ success: true });
};

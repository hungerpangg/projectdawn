require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const cors = require("cors");

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: ["https://projectdawn.onrender.com"],
		methods: "GET,POST,PUT,DELETE", // The allowed HTTP methods
		allowedHeaders: "Content-Type,Authorization", // The allowed request headers
		credentials: true,
	})
);
app.use(routes);

// database connection
const dbURI =
	"mongodb+srv://pangkawai:Singapore2023@cluster0.boyr2za.mongodb.net/project-dawn";
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log("DB connected");
		app.listen(443);
	})
	.catch((err) => console.log(err));

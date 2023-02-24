import { config } from "dotenv";
import express from "express";
import hbs from "express-hbs";
import session from "express-session";
import {
	array,
	misc,
	string as stringHelper,
	comparison,
	math,
	number as numberHelper,
	collection,
	object,
	html,
	regex,
	url,
} from "useful-handlebars-helpers";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import customHelpers from "@helpers/index";
import homeRoute from "@routes/home";
import aboutRoute from "@routes/about";
import contactRoute from "@routes/contact";
import teamsRoute from "@routes/team";
import posts1Route from "@routes/posts-1";
import posts2Route from "@routes/posts-2";
import loginRoute from "@routes/login";
import userRoute from "@routes/user";
import apiRoute from "@routes/api";
import productRoute from "@routes/products";
import error404Route from "@routes/404";
import utils from "@utils/index";
import middlewares from "@middlewares/index";
config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	session({
		secret: process.env.SESSION_SECRET || "my_secret",
		resave: false,
		saveUninitialized: false,
	})
);

[
	array,
	misc,
	stringHelper,
	comparison,
	math,
	numberHelper,
	collection,
	object,
	html,
	regex,
	url,
	customHelpers,
].forEach((helper) => hbs.registerHelper(helper));

// => Here we expose the views so it can be rendered.
app.engine(
	".hbs",
	hbs.express4({
		partialsDir: utils.file.dirname + "/src/views/partials",
		layoutsDir: utils.file.dirname + "/src/views/layouts",
	})
);
app.set("view engine", ".hbs");
app.set("views", path.join(utils.file.dirname, "src/views"));

app.use("/public", express.static(path.join(utils.file.dirname, "public")));

app.use(middlewares.http.popupalteCurrentURLInContext);
app.use(middlewares.htmx.checkHTMXRequest);
app.use(middlewares.session.populateUserSessionInContext);
app.use("/", middlewares.auth.setCheckAuthAsHxTrigger, homeRoute);
app.use("/about", middlewares.auth.setCheckAuthAsHxTrigger, aboutRoute);
app.use("/contact", middlewares.auth.setCheckAuthAsHxTrigger, contactRoute);
app.use("/posts-1", middlewares.auth.setCheckAuthAsHxTrigger, posts1Route);
app.use("/posts-2", middlewares.auth.setCheckAuthAsHxTrigger, posts2Route);
app.use("/team", middlewares.auth.setCheckAuthAsHxTrigger, teamsRoute);
app.use("/products", middlewares.auth.setCheckAuthAsHxTrigger, productRoute);
app.use(
	"/login",
	middlewares.auth.checkAuthenticatedUserAndRedirect,
	middlewares.auth.setCheckAuthAsHxTrigger,
	loginRoute
);
app.use("/users", middlewares.auth.setCheckAuthAsHxTrigger, userRoute);
app.use("/api", apiRoute);
app.use(middlewares.http.error404NotFound);
// app.use('*', error404Route);
app.use(middlewares.http.error500Handler);

app.listen(utils.env.port, () => {
	console.log("Server running");
});

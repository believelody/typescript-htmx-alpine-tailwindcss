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
import { customHelpers } from "@helpers/customHelper";
import { fileUtil } from "@utils/file/file.util";
import { httpMiddleware } from "@middlewares/http/http.middleware";
import { authMiddleware } from "@middlewares/auth/auth.middleware";
import { htmxMiddleware } from "@middlewares/htmx/htmx.middleware";
import { sessionMiddleware } from "@middlewares/session/session.middleware";
import { envConfig } from "@configs/env/env.config";
import { homeController } from "@controllers/home/home.controller";
import { aboutController } from "@controllers/about/about.controller";
import { contactController } from "@controllers/contact/contact.controller";
import { posts1Controller } from "@controllers/posts-1/posts-1.controller";
import { posts2Controller } from "@controllers/posts-2/posts-2.controller";
import { teamsController } from "@controllers/teams/teams.controller";
import { productsController } from "@controllers/products/products.controller";
import { usersController } from "@controllers/users/users.controller";
import { cartController } from "@controllers/cart/cart.controller";
import { subscriptionController } from '@controllers/subscription/subscription.controller';
import { reactionController } from "@controllers/reaction/reaction.controller";
import { commentsController } from "@controllers/comments/comments.controller";
import { authController } from "@controllers/auth/auth.controller";
import { sidebarController } from "@controllers/sidebar/sidebar.controller";
import { categoriesController } from "@controllers/categories/categories.controller";
import { brandsController } from "@controllers/brands/brands.controller";
import { faqController } from "@controllers/faq/faq.controller";
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
].forEach(helper => hbs.registerHelper(helper));

// => Here we expose the views so it can be rendered.
app.engine(
	".hbs",
	hbs.express4({
		partialsDir: fileUtil.dirname + "/src/views/partials",
		layoutsDir: fileUtil.dirname + "/src/views/layouts",
	})
);
app.set("view engine", ".hbs");
app.set("views", path.join(fileUtil.dirname, "src/views"));

app.use("/public", express.static(path.join(fileUtil.dirname, "public")));

app.use(httpMiddleware.popupalteCurrentURLInContext);
app.use(htmxMiddleware.checkHTMXRequest);
app.use(sessionMiddleware.populateUserSessionInContext);
app.use("/", authMiddleware.setCheckAuthAsHxTrigger, homeController);
app.use("/about", authMiddleware.setCheckAuthAsHxTrigger, aboutController);
app.use("/cart", cartController);
app.use("/contact", contactController);
app.use("/posts-1", posts1Controller);
app.use("/posts-2", posts2Controller);
app.use("/team", authMiddleware.setCheckAuthAsHxTrigger, teamsController);
app.use("/products", productsController);
app.use("/categories", categoriesController);
app.use("/brands", brandsController);
app.use("/users", usersController);
app.use("/subscription", subscriptionController);
app.use("/faq", faqController);
app.use(
	"/reaction",
	authMiddleware.checkUnauthenticatedUserAndRedirect,
	reactionController
);
app.use('/comments', commentsController);
app.use('/auth', authController);
app.use('/sidebar', sidebarController);
app.use(httpMiddleware.error404NotFound);
// app.use('*', error404Controller);
app.use(httpMiddleware.errorHandler);

app.listen(envConfig.port, () => {
	console.log("Server running");
});

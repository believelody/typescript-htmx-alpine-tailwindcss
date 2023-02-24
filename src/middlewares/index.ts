import authMiddleware from "./auth.middleware";
import htmxMiddleware from "./htmx.middleware";
import httpMiddleware from "./http.middleware";
import sessionMiddleware from "./session.middleware";

export default {
  auth: authMiddleware,
  htmx: htmxMiddleware,
  http: httpMiddleware,
  session: sessionMiddleware
}
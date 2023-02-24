import { UserBodyRequest, UserResponse } from "@interfaces/user.interface";
import api from "../api";

const login = async (body: UserBodyRequest): Promise<UserResponse> => {
  const options = {
		// body,
		body: {
			username: "kminchelle",
			password: "0lelplR",
			expiresInMins: 2, // optional
		},
	}
  return await api.post("/auth/login", options);
}

export default { login };
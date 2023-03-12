import { UserBodyRequest, UserResponse } from "@interfaces/user.interface";
import { fetch } from "@services/fetch";

const login = async (body: UserBodyRequest): Promise<UserResponse> => {
	const options = {
		body,
		// body: {
		// 	username: "kminchelle",
		// 	password: "0lelplR",
		// 	expiresInMins: 2, // optional
		// },
	};
	return await fetch.post("/auth/login", options);
};

export const authService = { login };

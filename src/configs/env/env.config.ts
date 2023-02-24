import { config } from "dotenv";
config();

export const envConfig = {
	dummyDataURL: process.env.DUMMY_DATA_URL,
	port: process.env.PORT || 8000,
};

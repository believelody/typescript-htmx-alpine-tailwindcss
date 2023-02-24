import { config } from 'dotenv';
config();

const dummyDataURL = process.env.DUMMY_DATA_URL;
const port = process.env.PORT || 8000;

export default { dummyDataURL, port };
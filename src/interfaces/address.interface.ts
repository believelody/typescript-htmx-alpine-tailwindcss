import { Coordinates } from "./coordinates.interface";

export interface Address {
	address: string;
	city: string;
	coordinates: Coordinates;
	postalCode: string;
	state: string;
}
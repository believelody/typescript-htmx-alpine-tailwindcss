import { Address } from "./address.interface";
import { Bank } from "./bank.interface";
import { Company } from "./company.interface";
import { Hair } from "./hair.interface";

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	maidenName: string;
	age: number;
	gender: string;
	email: string;
	phone: string;
	username: string;
	password?: string;
	birthDate: string;
	image: string;
	bloodGroup: string;
	height: number;
	weight: number;
	eyeColor: string;
	hair: Hair;
	domain: string;
	ip: string;
	address: Address;
	macAddress: string;
	university: string;
	bank: Bank;
	company: Company;
	ein: string;
	ssn: string;
	userAgent: string;
	likedPosts?: number[];
	likedProducts?: number[];
	subscribed: boolean;
}

export interface Author extends Pick<User, "id" | "username"> {};

export interface UserBodyRequest extends Pick<User, "username" | "password"> {
	expiresInMins?: number;
};

export interface UserUpdate extends Omit<User, "id" | "password"> {}

export interface UserResponse extends Omit<User, "password"> {
	token: string;
}
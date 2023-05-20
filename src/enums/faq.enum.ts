export interface FAQQuestion {
	question: string;
	answer: string;
}

export interface FAQ {
	basics: FAQQuestion[];
	mobile: FAQQuestion[];
	account: FAQQuestion[];
	payments: FAQQuestion[];
	privacy: FAQQuestion[];
	delivery: FAQQuestion[];
}

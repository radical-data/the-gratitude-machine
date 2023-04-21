interface ThankYou {
	content: string;
	timestamp: number;
	creator: 'user' | 'ai';
	response_to?: number;
}

export async function get_ai_response(
	input_text: string,
	placeholder_request?: boolean
): Promise<string[]> {
	if (placeholder_request) {
		return ['Thank you for the love of testing and experimentation.', 'Thank you for code.'];
	}

	const response = await fetch('/api/reply', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ input_text })
	});

	if (!response.ok) {
		throw new Error('Failed to fetch AI response');
	}

	const response_text = await response.json();
	return response_text;
}

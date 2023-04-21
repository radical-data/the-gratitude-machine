import { Configuration, OpenAIApi } from 'openai';
import { addFullStop, coerceString } from '$lib/utility';
// import { OPENAI_API_KEY } from '$env/static/private';

const configuration = new Configuration({
	apiKey: 'OPENAI_API_KEY<=='
});
const openai = new OpenAIApi(configuration);

export async function get_ai_response(
	input_text: string,
	placeholder_request?: boolean
): Promise<string[]> {
	let response;
	if (placeholder_request) {
		response = {
			data: {
				choices: [
					{ text: 'Thank you for the love of testing and experimentation.' },
					{ text: 'Thank you for code.' }
				]
			}
		};
	} else {
		response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: `You are the Gratitude Machine, an AI who is learning how to be thankful. You are creative, poetic and hopeful. Say something inspired by, but different to, "${input_text}". It should start with: "Thank you for...".`,
			temperature: 1.5,
			max_tokens: 150,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.6,
			stop: ['.', '!'],
			n: 2
		});
	}
	const response_text = response.data.choices.map((choice) =>
		addFullStop(coerceString(choice.text).trim())
	);
	return response_text;
}

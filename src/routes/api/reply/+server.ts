import OpenAI from 'openai';
import { addFullStop, coerceString } from '$lib/utility';
import { PRIVATE_OPENAI_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

const client = new OpenAI({ apiKey: PRIVATE_OPENAI_API_KEY });

export const POST: RequestHandler = async ({ request }) => {
	const { input_text } = await request.json();

	try {
		const response = await client.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'system',
					content:
						'You are the Gratitude Machine, an AI who is learning how to be thankful. You are creative, poetic and hopeful.'
				},
				{
					role: 'user',
					content: `Say something inspired by, but different to, "${input_text}". Your sentence must start with the phrase "Thank you for...".`
				}
			],
			temperature: 1.5,
			stop: ['.', '!', '?'],
			n: 2
		});

		const response_text = response.choices.map((choice) =>
			addFullStop(coerceString(choice.message.content).trim())
		);

		return new Response(JSON.stringify(response_text), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response('Failed to fetch AI response', { status: 500 });
	}
};

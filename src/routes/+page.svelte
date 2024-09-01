<script lang="ts">
	import { addFullStop, coerceString } from '$lib/utility';
	import { get_ai_response } from '$lib/get_ai_response.js';

	import { initializeApp } from 'firebase/app';
	import { getDatabase, ref, push, set } from 'firebase/database';

	import {
		PUBLIC_FIREBASE_API_KEY,
		PUBLIC_FIREBASE_AUTH_DOMAIN,
		PUBLIC_FIREBASE_DATABASE_URL,
		PUBLIC_FIREBASE_PROJECT_ID,
		PUBLIC_FIREBASE_STORAGE_BUCKET,
		PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		PUBLIC_FIREBASE_APP_ID
	} from '$env/static/public';

	const firebaseConfig = {
		apiKey: PUBLIC_FIREBASE_API_KEY,
		authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
		databaseURL: PUBLIC_FIREBASE_DATABASE_URL,
		projectId: PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		appId: PUBLIC_FIREBASE_APP_ID
	};

	const app = initializeApp(firebaseConfig);

	// writeThankYouData({ content: 'Thank you for berries.', timestamp: new Date(), creator: 'user' });

	import { thankYous } from '../stores.js';

	let inputText: string = '';

	function textValid(text: string): boolean {
		if (text.toLowerCase().startsWith('thank you')) {
			return true;
		} else {
			return false;
		}
	}

	async function handleSubmit() {
		let full_stopped_input_text = addFullStop(inputText);
		inputText = '';
		if (textValid(full_stopped_input_text)) {
			let formatted_user_response: ThankYou = {
				content: full_stopped_input_text,
				timestamp: new Date().getTime(),
				creator: 'user'
			};
			thankYous.update((arr) => {
				arr.push(formatted_user_response);
				return arr;
			});
			const db = getDatabase();
			const newObjectRef = push(ref(db, 'thank_yous'));
			set(newObjectRef, formatted_user_response);
			const ai_response = await get_ai_response(full_stopped_input_text);
			let formatted_ai_response: Array<ThankYou> = ai_response.map((item) => ({
				content: item,
				timestamp: new Date().getTime(),
				creator: 'ai'
			}));
			thankYous.update((arr) => {
				formatted_ai_response.map((item) => {
					arr.push(item);
					const newObjectRef = push(ref(db, 'thank_yous'));
					set(newObjectRef, item);
				});
				return arr;
			});
		} else {
			alert('Submissions need to start with "Thank you".');
		}
	}

	import { onMount, afterUpdate } from 'svelte';
	let scrollContainer: HTMLElement;
	const scrollToBottom = () => {
		scrollContainer.scrollTop = scrollContainer.scrollHeight;
	};

	onMount(() => {
		scrollToBottom();
	});

	afterUpdate(() => {
		scrollToBottom();
	});
</script>

<svelte:head>
	<title>The Gratitude Machine</title>
	<meta name="description" content="The Gratitude Machine is an AI learning how to be thankful." />
</svelte:head>

<article>
	<section id="thank-yous" class="scroll-container" bind:this={scrollContainer}>
		<p>
			{#each $thankYous as message}
				<span class={message.creator}>
					{message.content + ' '}
				</span>
			{/each}
		</p>
	</section>

	<section id="submissions">
		<form autocomplete="off" on:submit={handleSubmit}>
			<label for="input-field" class="visually-hidden">Enter text:</label>
			<input
				type="text"
				id="input-field"
				aria-label="Thank you message"
				bind:value={inputText}
				placeholder="Thank you for..."
			/>
			<button type="submit" class="button-17">Submit</button>
		</form>
	</section>
</article>

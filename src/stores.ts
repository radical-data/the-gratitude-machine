import { writable } from 'svelte/store';

export const thankYous = writable<ThankYou[]>([]);

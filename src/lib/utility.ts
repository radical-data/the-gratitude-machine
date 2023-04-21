export function coerceString(value: string | undefined): string {
	if (typeof value === 'undefined') {
		return '';
	}
	return value;
}

export function addFullStop(str: string): string {
	// Check if the string ends with a full stop
	if (str.endsWith('.') || str.endsWith('!')) {
		return str; // Return the original string if it already ends with a full stop
	} else {
		return str + '.'; // Otherwise, add a full stop and return the updated string
	}
}

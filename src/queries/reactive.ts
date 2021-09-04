import { makeVar } from '@apollo/client';

const defaultRecentCharacters: Array<number> = JSON.parse(localStorage.getItem("recentCharacters") || "[]")

export const RECENT_CHARACTERS = makeVar<Array<number>>(defaultRecentCharacters);

export function addRecentCharacter(characterId: number) {
	let recentCharacters: Array<number> = RECENT_CHARACTERS();

	// Remove characterId from recent, if existing
	let currentIndex = recentCharacters.indexOf(characterId);
	if (currentIndex !== -1) {
		recentCharacters.splice(currentIndex, 1)
	}

	if(recentCharacters.length === 10) {
		recentCharacters.shift()
	}

	recentCharacters.push(characterId);
	RECENT_CHARACTERS(recentCharacters);
	localStorage.setItem("recentCharacters", JSON.stringify(recentCharacters));
}

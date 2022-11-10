export function setInLocalStorage(storageKey: string, obj: object): void {
	localStorage.setItem(storageKey, JSON.stringify(obj));
}

export function getFromLocalStorage(storageKey: string) {
	return JSON.parse(localStorage.getItem(storageKey) as string);
}

import React from 'react';

export interface TagProps {
	tagId: number;
	tagName: string;
	tagItems: Array<number>;
}

export interface AppContextProps {
	appName: string;
	appVersion: string;
	todoStorageKey: string;
	tagStorageKey: string;
	tagStorage: Array<TagProps>;
	currentTagId: number;
}

export const AppContext = React.createContext<AppContextProps | null>(null);

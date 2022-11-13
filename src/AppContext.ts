import React from 'react';

export interface TagProps {
	tagId: number;
	tagName: string;
	tagTodos: Array<number>;
}

export interface AppContextProps {
	appName: string;
	appVersion: string;
	todoListKey: string;
	tagListKey: string;
	tagListStorage: Array<TagProps>;
	currentTagId: number;
}

export const AppContext = React.createContext<AppContextProps | null>(null);

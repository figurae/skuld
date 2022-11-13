import React from 'react';

export interface TagListProps {
	tagId: number;
	tagName: string;
	tagTodos?: Array<number>;
}

export interface AppContextProps {
	appName: string;
	appVersion: string;
	todoListKey: string;
	tagListKey: string;
	tagListStorage: TagListProps | null;
}

export const AppContext = React.createContext<AppContextProps | null>(null);

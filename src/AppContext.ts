import React from 'react';

export interface IAppContext {
	appName: string;
	appVersion: string;
	storageKey: string;
}

export const AppContext = React.createContext<IAppContext | null>(null);

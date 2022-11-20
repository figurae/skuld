import React from 'react';

export interface AppContextProps {
	appName: string;
	appVersion: string;
}

export const AppContext = React.createContext<AppContextProps | null>(null);

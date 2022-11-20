import { createContext } from 'react';

export interface AppProps {
	appName: string;
	appVersion: string;
}

export const AppContext = createContext<AppProps | null>(null);

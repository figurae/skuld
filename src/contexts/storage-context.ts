import { createContext } from 'react';

export interface StorageProps {
	itemStorageKey: string;
	tagStorageKey: string;
}

export const StorageContext = createContext<StorageProps | null>(null);

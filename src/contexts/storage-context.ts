import { createContext } from 'react';

export interface StorageProps {
	todoStorageKey: string;
	tagStorageKey: string;
}

export const StorageContext = createContext<StorageProps | null>(null);

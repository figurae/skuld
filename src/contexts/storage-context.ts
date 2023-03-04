import { createContext } from 'react';

export interface StorageProps {
	todoItemStorageKey: string;
	todoListStorageKey: string;
}

export const StorageContext = createContext<StorageProps | null>(null);

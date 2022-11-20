import React from 'react';

export interface TagProps {
	tagId: number;
	tagName: string;
	tagItems: Array<number>;
}

export interface StorageProps {
	todoStorageKey: string;
	tagStorageKey: string;
	tagStorage: Array<TagProps>;
	currentTagId: number;
}

export const StorageContext = React.createContext<StorageProps | null>(null);

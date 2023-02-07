import { ReactNode } from 'react';
import './ItemHeader.css';

interface ItemHeaderProps {
	children: ReactNode;
}

function ItemHeader(props: ItemHeaderProps) {
	return <div className='item-header'>{props.children}</div>;
}

export default ItemHeader;

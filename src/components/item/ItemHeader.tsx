import { ReactNode } from 'react';
import 'css/ItemHeader.css';

interface ItemHeaderProps {
	children: ReactNode;
}

function ItemHeader(props: ItemHeaderProps) {
	return <div className='item-header'>{props.children}</div>;
}

export default ItemHeader;

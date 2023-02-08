import { ReactNode } from 'react';
import styles from './ItemHeader.module.sass';

interface ItemHeaderProps {
	children: ReactNode;
}

function ItemHeader(props: ItemHeaderProps) {
	return <div className={styles.element}>{props.children}</div>;
}

export default ItemHeader;

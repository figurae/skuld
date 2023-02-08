import { useState } from 'react';
import styles from './ItemFooter.module.sass';
import { TagMenu } from 'features';

interface ItemFooterProps {
	addedOn: Date;
	itemId: number;
}

function ItemFooter(props: ItemFooterProps) {
	const [tagMenuState, setTagMenuState] = useState(false);

	const tagMenu = tagMenuState ? (
		<TagMenu
			itemId={props.itemId}
			setTagMenuState={setTagMenuState}
			onClickOutside={() => {
				setTagMenuState(false);
			}}
		></TagMenu>
	) : null;

	return (
		<div className={styles.element}>
			<table className={styles.table}>
				<tbody>
					<tr>
						<td>
							<button
								className={styles.addTag}
								type='button'
								disabled={tagMenuState}
								onClick={() => setTagMenuState(true)}
							>
								tags
							</button>
							{tagMenu}
						</td>
						<td className={styles.addedOn}>
							{/* FIXME: stopped working recently, investigate */}
							added on: {props.addedOn.toLocaleString()}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default ItemFooter;

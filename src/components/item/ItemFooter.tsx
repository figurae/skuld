import { useContext, useState } from 'react';
import './ItemFooter.css';
import { StorageContext } from 'contexts/StorageContext';
import TagMenu, { saveTags } from 'components/tagmenu/TagMenu';

interface ItemFooterProps {
	addedOn: Date;
	itemId: number;
}

function ItemFooter(props: ItemFooterProps) {
	const storageContext = useContext(StorageContext);
	const [tagMenuState, setTagMenuState] = useState(false);

	const tagMenu = tagMenuState ? (
		<TagMenu
			itemId={props.itemId}
			setTagMenuState={setTagMenuState}
			onClickOutside={() => {
				// TODO: check if tags have changed
				if (storageContext !== null) {
					saveTags(storageContext);
				}

				setTagMenuState(false);
			}}
		></TagMenu>
	) : null;

	return (
		<div className='item-footer'>
			<table className='item-footer-table'>
				<tbody>
					<tr>
						<td>
							<button
								className='item-footer-add-tag'
								type='button'
								disabled={tagMenuState}
								onClick={() => setTagMenuState(true)}
							>
								tags
							</button>
							{tagMenu}
						</td>
						<td className='item-footer-added-on'>
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

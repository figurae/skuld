import { useContext, useState } from 'react';
import 'css/ItemFooter.css';
import TagMenu from 'components/tag-menu/TagMenu';
import { StorageContext } from 'contexts/storage';
import { storeTags } from 'helpers/tag-management';

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
					storeTags(storageContext);
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

import { AppContext } from 'contexts/AppContext';
import { useContext, useState } from 'react';
import TagMenu, { saveTags } from 'components/tagmenu/TagMenu';
import './ItemFooter.css';

interface ItemFooterProps {
	addedOn: Date;
	itemId: number;
}

function ItemFooter(props: ItemFooterProps) {
	const appContext = useContext(AppContext);
	const [tagMenuState, setTagMenuState] = useState(false);

	const tagMenu = tagMenuState ? (
		<TagMenu
			itemId={props.itemId}
			setTagMenuState={setTagMenuState}
			onClickOutside={() => {
				// TODO: check if tags have changed
				if (appContext !== null) {
					saveTags(appContext);
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

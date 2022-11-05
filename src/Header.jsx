import './Header.css';
import React from 'react';
import { AppContext } from './AppContext';

function Header(props) {
	const appContext = React.useContext(AppContext);

	return (
		<header className='header'>
			<h1 className='text-center'>{appContext.appName}</h1>
			{props.children}
		</header>
	);
}

export default Header;
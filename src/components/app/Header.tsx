import './Header.css';
import React from 'react';
import { AppContext } from 'contexts/AppContext';

function Header() {
	const appContext = React.useContext(AppContext);

	return (
		<header className='header'>
			<h1 className='text-center'>{appContext?.appName}</h1>
		</header>
	);
}

export default Header;

import React from 'react';
import './Header.css';
import { AppContext } from 'contexts';

function Header() {
	const appContext = React.useContext(AppContext);

	return (
		<header className='header'>
			<h1 className='text-center'>{appContext?.appName}</h1>
		</header>
	);
}

export default Header;

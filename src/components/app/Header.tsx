import React from 'react';
import 'css/Header.css';
import { AppContext } from 'contexts/app-context';

function Header() {
	const appContext = React.useContext(AppContext);

	return (
		<header className='header'>
			<h1 className='text-center'>{appContext?.appName}</h1>
		</header>
	);
}

export default Header;

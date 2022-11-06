import React from 'react';
import { AppContext } from './AppContext';
import './Footer.css';

function Footer() {
	const appContext = React.useContext(AppContext);

	return (
		<footer className='footer'>
			<p className='text-center'>
				(╯°□°）╯︵ ┻━┻ ||| ver. {appContext?.appVersion}
			</p>
		</footer>
	);
}

export default Footer;

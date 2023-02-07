import React from 'react';
import './Footer.css';
import { AppContext } from 'contexts/app-context';

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

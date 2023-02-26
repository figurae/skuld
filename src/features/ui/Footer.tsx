interface FooterProps {
	appVersion: string;
}

function Footer({ appVersion }: FooterProps) {
	return (
		<footer className='bg-slate-300 h-4'>
			<p className='text-right pr-4 text-xs'>
				(╯°□°）╯︵ ┻━┻&emsp;⚒&emsp;ver. {appVersion}
			</p>
		</footer>
	);
}

export default Footer;

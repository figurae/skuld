interface HeaderProps {
	appName: string;
}

function Header({ appName }: HeaderProps) {
	return (
		<header className='bg-slate-600 p-4'>
			<h1 className='text-right text-xl text-slate-200 text-shadow-sm shadow-black font-bold'>
				{appName}
			</h1>
		</header>
	);
}

export default Header;

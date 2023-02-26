interface BodyProps {
	children: React.ReactNode;
}

function Body({ children }: BodyProps) {
	return <main className='min-h-0 flex flex-grow'>{children}</main>;
}

export default Body;

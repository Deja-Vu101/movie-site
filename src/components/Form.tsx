import React, { useState } from "react";

interface IOwnProps{
	title: string
	handleClick: (email: string, password: string) => void
}

const Form: React.FC<IOwnProps> = ({title, handleClick}) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	return ( 
		<div>
		<input 
		type="email"
		value={email}
		onChange={(e) => setEmail(e.target.value)}
		placeholder="email"
		/>
		<input 
		type="password" 
		value={password}
		onChange={(e) => setPassword(e.target.value)}
		placeholder="password"
		/>
		<button onClick={() => handleClick(email, password)}>{title}</button>
		</div>
	 );
}
 
export default Form;
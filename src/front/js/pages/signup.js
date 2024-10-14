import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
	const { actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();
		const success = await actions.signup(email, password);
		if (success) {
			navigate("/");
		} else {
			alert("Signup failed");
		}
	};

	return (
		<div className="text-center mt-5">
			<h1>Sign Up</h1>
			<form onSubmit={handleSignup}>
				<input 
					type="email" 
					value={email} 
					onChange={(e) => setEmail(e.target.value)} 
					placeholder="Email" 
					required 
				/>
				<input 
					type="password" 
					value={password} 
					onChange={(e) => setPassword(e.target.value)} 
					placeholder="Password" 
					required 
				/>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
};
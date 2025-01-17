import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from '../errorMessages/ErrorMessage';

export default function ForgotPassword() {

	const navigation = useNavigate();
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const clicked = (message) => {
		if (message === "true") {
			navigation("/home");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const missatge = await axios.post('http://localhost:3000/resetPassword', { email });
		setMessage(missatge.data.message);
	};

	if (message === "") {
		return (
			<div className="page_login">
				<div className="container" id="forgot_password">
					<h1>Reset your password</h1>
					<form className="login-form" onSubmit={handleSubmit}>
						<input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"></input>
						<button type="submit">Send email</button>
					</form>
				</div>
			</div>
		);
	} else if (message === "Password reset email send correctly") {
		return (
			navigation("/home")
		);
	} else {
		return (
			<div className="pep">
				<ErrorMessage errorMessage={message} clicked={clicked}></ErrorMessage>;
			</div>
		)
	}
}
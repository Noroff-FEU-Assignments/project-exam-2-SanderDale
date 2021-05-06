import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import AuthContext from "./../../context/AuthContext";

const schema = yup.object().shape({
	identifier: yup.string().required("Please enter your username"),
	password: yup.string().required("Please enter your password"),
});

function LoginForm() {
	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);
	const router = useRouter();

	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});

	const [auth, setAuth] = useContext(AuthContext);

	async function onSubmit(data) {
		setSubmitting(true);
		setLoginError(null);

		console.log(data);

		try {
			const response = await axios.post("http://localhost:1337/auth/local", data);
			console.log("response", response.data);
			setAuth(response.data);
			router.push("/adminPage");
		} catch (error) {
			console.log("error", error);
			setLoginError("Wrong username or password");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<form
			className="flex justify-center items-center flex-col w-4/5 font-heading"
			onSubmit={handleSubmit(onSubmit)}
			disabled={submitting}>
			{loginError && <span className="text-center p-1 mb-5 w-full bg-red-400 border-red-600 border-2">{loginError}</span>}
			<fieldset className="flex justify-center items-center flex-col gap-8 w-full" disabled={submitting}>
				<input
					className="bg-transparent placeholder-white border-white border-2 w-full"
					type="text"
					name="identifier"
					placeholder="Username"
					ref={register}
				/>
				{errors.identifier && <span>{errors.identifier.message}</span>}
				<input
					className="bg-transparent placeholder-white border-white border-2 w-full"
					type="password"
					name="password"
					placeholder="Password"
					autoComplete="on"
					ref={register}
				/>
				{errors.password && <span>{errors.password.message}</span>}
				<button className="bg-blue-500 placeholder-white border-blue-500 border-2 w-full py-2 text-xl" type="submit">
					{submitting ? "Logging in..." : "Login"}
				</button>
			</fieldset>
		</form>
	);
}

export default LoginForm;

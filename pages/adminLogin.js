import Head from "next/head";
import LoginForm from "./../components/adminLogin/LoginForm";

export default function AdminLogin() {
	return (
		<div className="flex justify-center items-center flex-col">
			<Head>
				<title>Holidaze | Admin Login</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex justify-center items-center w-full">
				<h1 className="font-heading text-4xl py-7">Admin Login</h1>
			</div>
			<div className="flex justify-center items-start py-10 bg-gray-800 w-full h-80 text-white">
				<LoginForm />
			</div>
		</div>
	);
}

import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function AdminPage() {
	const router = useRouter();

	const [auth, setAuth] = useContext(AuthContext);

	if (auth === null) {
		router.push("/");
	}

	function logout() {
		setAuth(null);
		router.push("/");
	}

	return (
		<div className="flex justify-center items-center flex-col">
			<Head>
				<title>Holidaze | Admin Page</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Admin Page</h1>
			<button onClick={logout}>Log out</button>
		</div>
	);
}

import Head from "next/head";
import Searchbar from "./../components/search/Searchbar";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="h-bannerHeight lg:bg-home-banner-big md:bg-home-banner-medium bg-home-banner-small bg-center bg-cover flex justify-center items-center text-white flex-col">
				<div className="w-3/4 xl:w-2/4 text-center h-full flex items-end pb-20">
					<h1 className="font-headingAlt text-2xl md:text-5xl lg:text-7xl leading-snug">
						Find the best hotel for your next stay in Bergen
					</h1>
				</div>
				<div className="h-full flex items-start justify-center w-3/4 sm:w-1/2 lg:w-1/3">
					<Searchbar />
				</div>
			</div>
		</div>
	);
}

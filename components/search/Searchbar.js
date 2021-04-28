import React from "react";
import { useState } from "react";
import styled from "styled-components";

export default class Searchbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			suggestions: [],
			text: "",
		};
	}

	onTextChange = (event) => {
		const { hotels } = this.props;
		let suggestions = [];
		const value = event.target.value;
		if (value.length > 0) {
			const regex = new RegExp(`^${value}`, `i`);
			suggestions = hotels.sort().filter((v) => regex.test(v));
		}

		this.setState(() => ({
			suggestions,
			test: value,
		}));
	};

	suggestionsSelected = (value) => {
		this.setState(() => ({
			text: value,
			suggestions: [],
		}));
	};

	renderSuggestions = () => {
		const { suggestions } = this.state;
		console.log("suggestions: ", suggestions);
		if (suggestions.length === 0) {
			return null;
		}
		return (
			<ul>
				{suggestions.map((hotel) => (
					<li key={hotel} onClick={(event) => this.suggestionsSelected(hotel)}>
						{hotel}
					</li>
				))}
			</ul>
		);
	};

	render() {
		const { text } = this.state;
		return (
			<div>
				<input onChange={this.onTextChange} placeholder="Search..." value={text} type="search" />
				{this.renderSuggestions()}
			</div>
		);
	}
}

/*const StyledSearchbar = styled.input`
	background-color: ${(props) => props.backgroundColor};
	border-color: ${(props) => props.borderColor};
	color: ${(props) => props.textColor};
	&:focus {
		outline: ${(props) => props.outlineColor};
		border-color: ${(props) => props.borderColor};
	}
	&::placeholder {
		color: ${(props) => props.textColor};
	}
`;

function Searchbar(props) {
	return (
		<StyledSearchbar
			className="bg-black bg-opacity-50 text-white border-white border-2 rounded-full placeholder-white pl-5 font-heading h-12 lg:h-14 focus:border-white focus:ring-white mb-11 w-full"
			type="search"
			id="search"
			name="search"
			placeholder="Search..."
			backgroundColor={props.backgroundColor}
			borderColor={props.borderColor}
			textColor={props.textColor}
			outlineColor={props.outlineColor}
		/>
	);
}

export default Searchbar;*/

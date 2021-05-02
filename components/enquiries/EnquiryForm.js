import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
	name: yup.string().required("Please enter your name"),
	email: yup.string().required("Please enter your email address").email("Please enter a valid email address"),
	from: yup.date().required("Please choose the date you wish to start your visit"),
	to: yup
		.date()
		.when("from", (from, schema) => from && schema.min(from, "Your end date can not be before your start date"))
		.required("Please choose the date you wish to end your visit"),
});

function EnquiryForm({ hotelName }) {
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState(null);
	const [submitSuccess, setSubmitSuccess] = useState(null);

	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});

	async function onSubmit(data) {
		setSubmitting(true);
		setServerError(null);
		console.log(data);

		try {
			const response = await axios.post("http://localhost:1337/enquiries/", data);
			console.log("response", response.data);
			setSubmitSuccess("Thank you for your booking!");
		} catch (error) {
			console.log("error", error);
			setServerError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	console.log(errors);

	return (
		<>
			{submitSuccess && <span>{submitSuccess}</span>}
			{submitSuccess ? (
				""
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
					{serverError && <span>{serverError}</span>}
					<input className="hidden" name="hotel" defaultValue={hotelName} ref={register} />
					<input type="text" name="name" placeholder="Full name" ref={register} />
					{errors.name && <span>{errors.name.message}</span>}
					<input type="email" name="email" placeholder="Email" ref={register} />
					{errors.email && <span>{errors.email.message}</span>}
					<div className="flex flex-col md:flex-row">
						<input type="date" name="from" ref={register} />
						{errors.from && <div>{errors.from.message}</div>}
						<input type="date" name="to" ref={register} />
						{errors.to && <div>{errors.to.message}</div>}
					</div>
					<button>{submitting ? "Booking..." : "Submit"}</button>
				</form>
			)}
		</>
	);
}

export default EnquiryForm;

"use client";
import React, { useState } from "react";
import "./styles.css";
import { Responses } from "./types/provisionAPI";
import { homeStrings } from "./types/strings";
import { Link } from "./components/link";
import { StyledButton } from "./components/styledButton";
import { StyledLabel } from "./components/styledLabel";
import { StyledInput } from "./components/styledInput";
import { useRouter } from "next/navigation";

export default function Home() {
	let responseData: Responses = {};
	const router = useRouter();

	const [formData, setFormData] = useState({
		hunger: 0,
		thirst: 0,
		goalHunger: 90,
		goalThirst: 90,
	});

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();

		// Perform any validation here before submitting  HAHAHAHA
		const currentValues =
			"?current_energy=" +
			formData.hunger +
			"&current_hydration=" +
			formData.thirst;
		const goalValues =
			"&goal_energy=" +
			formData.goalHunger +
			"&goal_hydration=" +
			formData.goalThirst;
		const request =
			"http://54.69.21.244:8000/provisions_calculator_api/" +
			currentValues +
			goalValues;

		// Sending form values off to be calculated
		try {
			console.log("sending request", request);
			const response = await fetch(request, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log("recieved", response);
			// Handle the response accordingly
			if (response.ok) {
				// Form submission successful
				responseData = await response.json();
				console.log("Form submitted successfully");
			} else {
				// Form submission failed
				console.error("Form submission failed");
			}
		} catch (error) {
			router.push("/results");
			console.error("Error submitting form:", error);
		}
	};

	const handleInputChange = (event: { target: { name: any; value: any } }) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<main className='container'>
			<div
				style={{ textAlign: "center", color: "white", fontFamily: "monospace" }}
			>
				<p style={{ fontSize: "50px" }}>{homeStrings.title}</p>
				<p style={{ fontSize: "20px", paddingTop: "1%", paddingBottom: "3%" }}>
					{homeStrings.header}
				</p>
			</div>

			<div
				className='divContainer'
				style={{
					background: "#727273",
					flexDirection: "row",
					width: "95%",
					justifyContent: "center",
				}}
			>
				<form
					style={{
						display: "flex",
						gap: "5%",
						alignSelf: "center",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							flex: 1,
							textWrap: "nowrap",
						}}
					>
						<StyledLabel text={homeStrings.form.hunger} />
						<br />
						<StyledLabel text={homeStrings.form.thirst} />
						<br />
						<StyledLabel text={homeStrings.form.goalHunger} />
						<br />
						<StyledLabel text={homeStrings.form.goalThirst} />
						<br />
						<StyledButton text={homeStrings.form.calc} onClick={handleSubmit} />
					</div>

					<div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
						<StyledInput
							type='text'
							name='hunger'
							defaultValue={formData.hunger as unknown as string}
							handleChange={handleInputChange}
						/>
						<br />
						<StyledInput
							type='text'
							name='thirst'
							defaultValue={formData.thirst as unknown as string}
							handleChange={handleInputChange}
						/>
						<br />
						<StyledInput
							type='text'
							name='goalHunger'
							defaultValue={formData.goalHunger as unknown as string}
							handleChange={handleInputChange}
						/>
						<br />
						<StyledInput
							type='text'
							name='goalThirst'
							defaultValue={formData.goalThirst as unknown as string}
							handleChange={handleInputChange}
						/>
						<br />
					</div>
				</form>
			</div>

			<div
				className='mb-32 flex flex-col lg:w-full lg:mb-0 lg:flex-row lg:justify-between p-5'
				style={{ color: "white" }}
			>
				<Link
					header={homeStrings.links.maps}
					description={homeStrings.links.description.maps}
					link='https://tarkov.dev/maps/'
				/>
				<Link
					header={homeStrings.links.ammo}
					description={homeStrings.links.description.ammo}
					link='https://www.eft-ammo.com/'
				/>
				<Link
					header={homeStrings.links.reddit}
					description={homeStrings.links.description.reddit}
					link='https://www.reddit.com/r/Tarkov/'
				/>
			</div>
		</main>
	);
}

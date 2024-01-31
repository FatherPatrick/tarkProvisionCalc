"use client";
import React from "react";
import "../styles.css";
import { Responses } from "../types/provisionAPI";
import { homeStrings } from "../types/strings";
import { Link } from "../components/link";
import { StyledLabel } from "../components/styledLabel";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	let responseData: Responses = {};

	const handleBack = async (event: { preventDefault: () => void }) => {
		event.preventDefault();

		try {
			console.log("navigating to home");
			router.push("/");
		} catch (error) {
			console.error("Error backing, try again", error);
		}
	};

	return (
		<main className='container'>
			<div
				style={{ textAlign: "center", color: "white", fontFamily: "monospace" }}
			>
				<p style={{ fontSize: "50px" }} onClick={handleBack}>
					{homeStrings.title}
				</p>
				<p style={{ fontSize: "20px", paddingTop: "1%", paddingBottom: "3%" }}>
					{homeStrings.header}
				</p>
			</div>

			<div
				className='divContainer'
				style={{
					background: "#727273",
					flexDirection: "row",
					alignItems: "flex-start",
					width: "95%",
					justifyContent: "space-evenly",
					padding: "1%",
				}}
			>
				{/*Column for response*/}
				<StyledLabel text='Provisions' />
				<br />
				{responseData &&
					responseData.provisions &&
					responseData.provisions.length > 0 &&
					responseData.provisions.map((provision, index) => (
						<div key={index}>
							<p className='responseOutput'>{`Name: ${provision.name}`}</p>
						</div>
					))}
				<StyledLabel text='Energy' />
				<br />
				{responseData &&
					responseData.provisions &&
					responseData.provisions.length > 0 &&
					responseData.provisions.map((provision, index) => (
						<div key={index}>
							<p className='responseOutput'>{`Name: ${provision.energy}`}</p>
						</div>
					))}
				<StyledLabel text='Hydration' />
				<br />
				{responseData &&
					responseData.provisions &&
					responseData.provisions.length > 0 &&
					responseData.provisions.map((provision, index) => (
						<div key={index}>
							<p className='responseOutput'>{`Name: ${provision.hydration}`}</p>
						</div>
					))}
				<StyledLabel text='Price' />
				<br />
				{responseData &&
					responseData.provisions &&
					responseData.provisions.length > 0 &&
					responseData.provisions.map((provision, index) => (
						<div key={index}>
							<p className='responseOutput'>{`Name: ${provision.price}`}</p>
						</div>
					))}
			</div>

			<div
				className='mb-32 flex flex-col lg:w-full lg:mb-0 lg:flex-row lg:justify-between p-5'
				style={{
					color: "white",
					marginTop: "1%",
					background: "#727273",
					width: "97%",
					borderRadius: "20px",
					alignSelf: "center",
				}}
			>
				<StyledLabel text={homeStrings.totals.energy} />
				<p className='responseOutput'>{responseData.final_energy}</p>
				<br />
				<StyledLabel text={homeStrings.totals.thirst} />
				<p className='responseOutput'>{responseData.final_hydration}</p>
				<br />
				<StyledLabel text={homeStrings.totals.cost} />
				<p className='responseOutput'>{responseData.min_price}</p>
			</div>

			<div
				className='mb-32 flex flex-col lg:w-full lg:mb-0 lg:flex-row lg:justify-between p-5'
				style={{ color: "white", marginTop: "1%" }}
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

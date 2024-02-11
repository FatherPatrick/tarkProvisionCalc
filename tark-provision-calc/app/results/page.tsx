"use client";
import React, { useEffect, useState } from "react";
import "../styles.css";
import { Responses } from "../types/provisionAPI";
import { homeStrings } from "../types/strings";
import { Link } from "../components/link";
import { StyledLabel } from "../components/styledLabel";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	const [responseData, setResponseData] = useState(
		null as unknown as Responses
	);

	useEffect(() => {
		// Perform localStorage action
		const data = localStorage.getItem("key");
		const parsedData = JSON.parse(data as string);
		setResponseData(parsedData as Responses);
	}, []);

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
				<p style={{ fontSize: "50px", cursor: "pointer" }} onClick={handleBack}>
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
				<div className='verticalDiv'>
					<StyledLabel text='Provision Name' />
					<br />
					{responseData &&
						responseData.provisions &&
						responseData.provisions.length > 0 && (
							<p>
								{responseData.provisions.map(
									(
										provision: { name: any },
										index: React.Key | null | undefined
									) => (
										<div key={index}>
											<p className='responseOutput'>{provision.name}</p>
										</div>
									)
								)}
							</p>
						)}
				</div>
				<div className='verticalDiv'>
					<StyledLabel text='Energy' />
					<br />
					{responseData &&
						responseData.provisions &&
						responseData.provisions.length > 0 && (
							<div>
								{responseData.provisions.map(
									(
										provision: { energy: any },
										index: React.Key | null | undefined
									) => (
										<div key={index}>
											<p className='responseOutput'>{provision.energy}</p>
										</div>
									)
								)}
							</div>
						)}
				</div>
				<div className='verticalDiv'>
					<StyledLabel text='Hydration' />
					<br />
					{responseData &&
						responseData.provisions &&
						responseData.provisions.length > 0 && (
							<div>
								{responseData.provisions.map(
									(
										provision: { hydration: any },
										index: React.Key | null | undefined
									) => (
										<div key={index}>
											<p className='responseOutput'>{provision.hydration}</p>
										</div>
									)
								)}
							</div>
						)}
				</div>
				<div className='verticalDiv'>
					<StyledLabel text='Price' />
					<br />
					{responseData &&
						responseData.provisions &&
						responseData.provisions.length > 0 && (
							<div>
								{responseData.provisions.map(
									(
										provision: { price: any },
										index: React.Key | null | undefined
									) => (
										<div key={index}>
											<p className='responseOutput'>{provision.price}₽</p>
										</div>
									)
								)}
							</div>
						)}
				</div>
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
				<div className='horizontalDiv'>
					<StyledLabel text={homeStrings.totals.energy} />
					{responseData?.final_energy && (
						<p
							style={{
								backgroundColor: "white",
								color: "black",
								padding: "5px 15px",
								borderRadius: "5px",
								boxShadow: "0px 2px 2px lightgray",
								fontFamily: "monospace",
							}}
						>
							{responseData?.final_energy}
						</p>
					)}
				</div>
				<div className='horizontalDiv'>
					<StyledLabel text={homeStrings.totals.thirst} />
					{responseData?.final_hydration && (
						<p
							style={{
								backgroundColor: "white",
								color: "black",
								padding: "5px 15px",
								borderRadius: "5px",
								boxShadow: "0px 2px 2px lightgray",
								fontFamily: "monospace",
							}}
						>
							{responseData?.final_hydration}
						</p>
					)}
				</div>
				<div className='horizontalDiv'>
					<StyledLabel text={homeStrings.totals.cost} />
					{responseData?.min_price && (
						<p
							style={{
								backgroundColor: "white",
								color: "black",
								padding: "5px 15px",
								borderRadius: "5px",
								boxShadow: "0px 2px 2px lightgray",
								fontFamily: "monospace",
							}}
						>
							{responseData?.min_price}₽
						</p>
					)}
				</div>
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

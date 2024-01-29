"use client";
import React, { useState } from 'react';
import background from "../public/homeBackground.webp"
import { Responses } from './types/provisionAPI';
import { homeStrings } from './types/strings';
import { Link } from './components/link';
import { StyledButton } from './components/styledButton';
import { StyledLabel } from './components/styledLabel';
import { StyledInput } from './components/styledInput';

export default function Home() {

  const [formData, setFormData] = useState({
    hunger: 0,
    thirst: 0,
    goalHunger: 90,
    goalThirst: 90
  });

  let responseData: Responses = {}
  
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    // Perform any validation here before submitting  HAHAHAHA
    const currentValues = '?current_energy=' + formData.hunger + '&current_hydration=' + formData.thirst
    const goalValues = '&goal_energy=' + formData.goalHunger + '&goal_hydration=' + formData.goalThirst
    const request = 'https://54.69.21.244:8000/provisions_calculator_api/' + currentValues + goalValues 

    // Sending form values off to be calculated
    try {
      console.log("sending request", request)
      const response = await fetch(request, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("recieved", response)
      // Handle the response accordingly
      if (response.ok) {
        // Form submission successful
        responseData= await response.json();
        console.log('Form submitted successfully');
      } else {
        // Form submission failed
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <main style={{display:"flex", flexDirection:"column", minHeight:"100vh", justifyContent:"space-between", padding:"5%", backgroundImage: `url(${background})`}}>
      
      <div style={{textAlign:"center"}}>
          <p style={{ fontSize:"50px", fontFamily: "monospace" }}>{homeStrings.title}</p>
          <p style={{ fontSize:"20px", paddingTop:"1%", fontFamily: "monospace"}}>{homeStrings.header}</p>
      </div>

      <div style={{background:"#e5e5e5", display:"flex", flexDirection: "row", flex: 1}}>
        {/*Column for form*/}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingRight:'5%'}}>
          <form style={{display:"flex", flexDirection:"row", gap:"5%", marginLeft:"10%", padding:"3%"}} onSubmit={handleSubmit}>
            <div style={{display:"flex", flexDirection: "column", flex: 1, textWrap: "nowrap"}}>
              <StyledLabel text={homeStrings.form.hunger}/>
              <br />
              <StyledLabel text={homeStrings.form.thirst}/>
              <br />
              <StyledLabel text={homeStrings.form.goalHunger}/>
              <br />
              <StyledLabel text={homeStrings.form.goalThirst}/>
              <br />
              <StyledButton text={homeStrings.form.calc}/>
            </div>
  
            <div style={{display:"flex", flexDirection: "column", flex: 1}}>
              <StyledInput type="text" name="hunger" defaultValue={formData.hunger as unknown as string} handleChange={handleInputChange}/>
              <br />
              <StyledInput type="text" name="thirst" defaultValue={formData.thirst as unknown as string} handleChange={handleInputChange}/>
              <br />
              <StyledInput type="text" name="goalHunger" defaultValue={formData.goalHunger as unknown as string} handleChange={handleInputChange}/>
              <br />
              <StyledInput type="text" name="goalThirst" defaultValue={formData.goalThirst as unknown as string} handleChange={handleInputChange}/>
              <br />
            </div>
          </form>
        </div>

        {/*Column for response*/}
        {responseData.min_price !== undefined &&
        <div style={{display:"flex", flexDirection: "row", flex: 1, fontFamily: "monospace"}}>
          <div style={{display:"flex", flexDirection: "column", flex: 1}}>
            <p>Provisions</p>
            {responseData && responseData.provisions && responseData.provisions.length > 0 && responseData.provisions.map((provision, index) => (
            <div key={index}>
              <p>{`Name: ${provision.name}`}</p>
            </div>
          ))}
          </div>
          <div style={{display:"flex", flexDirection: "column", flex: 1}}>
            <p>Energy</p>
            {responseData && responseData.provisions && responseData.provisions.length > 0 && responseData.provisions.map((provision, index) => (
            <div key={index}>
              <p>{`Name: ${provision.energy}`}</p>
            </div>
          ))}
          </div>
          <div style={{display:"flex", flexDirection: "column", flex: 1}}>
            <p>Hydration</p>
            {responseData && responseData.provisions && responseData.provisions.length > 0 && responseData.provisions.map((provision, index) => (
            <div key={index}>
              <p>{`Name: ${provision.hydration}`}</p>
            </div>
          ))}
          </div>
          <div style={{display:"flex", flexDirection: "column", flex: 1}}>
            <p>Price</p>
            {responseData && responseData.provisions && responseData.provisions.length > 0 && responseData.provisions.map((provision, index) => (
            <div key={index}>
              <p>{`Name: ${provision.price}`}</p>
            </div>
          ))}
          </div>
        </div>
        }
      </div>
      
      {responseData.min_price !== undefined &&
      <div style={{display:"flex", flexDirection: "column", flex: 1, background:"#e5e5e5", paddingLeft:"2%", fontFamily:"monospace"}}>
        <p>{homeStrings.totals.energy}{responseData.final_energy}</p>
        <br/>
        <p>{homeStrings.totals.thirst}{responseData.final_hydration}</p>
        <br/>
        <p>{homeStrings.totals.cost}{responseData.min_price}</p>
      </div>
    }

      <div className="mb-32 flex flex-col lg:w-full lg:mb-0 lg:flex-row lg:justify-between p-5">
        <Link header={homeStrings.links.maps} description={homeStrings.links.description.maps} link="https://tarkov.dev/maps/"/>
        <Link header={homeStrings.links.ammo} description={homeStrings.links.description.ammo} link="https://www.eft-ammo.com/"/>
        <Link header={homeStrings.links.reddit} description={homeStrings.links.description.reddit} link="https://www.reddit.com/r/Tarkov/"/>
      </div>
    </main>
  );
}



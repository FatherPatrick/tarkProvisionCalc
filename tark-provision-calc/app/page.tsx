"use client";
import React, { useState } from 'react';

interface Provision {
  energy: number,
  hydration: number,
  name: string,
  price: number,
  url: string
}
interface Responses {
  final_energy?: number,
  final_hydration?: number,
  min_price?: number,
  provisions?: [Provision],
}

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

    // Sending form values off to be calculated
    try {
      const response = await fetch('/provisions_calculator_api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

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
    <main className="flex min-h-screen flex-col justify-between p-24">
      
      <div style={{textAlign:"center"}}>
          <p style={{ fontSize:"50px" }}>Tarkov Provisions Calculator</p>
          <p style={{ fontSize:"20px", paddingTop:"10px"}}>Welcome to Tarkov Provision Calculator. This site is meant to show you the most efficient way to replenish your food/hunger in Escape From Tarkov.</p>
      </div>

      <div style={{background:"#e5e5e5", display:"flex", flexDirection: "row", flex: 1}}>
        {/*Column for form*/}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingRight:'50px'}}>
          <form style={{display:"flex", flexDirection:"row", gap:"10px", marginLeft:"10%", padding:"10px"}} onSubmit={handleSubmit}>
            <div style={{display:"flex", flexDirection: "column", flex: 1, textWrap: "nowrap"}}>
              <label style={{marginBottom:"10px"}}>Current Hunger: </label>
              <br />
              <label style={{marginBottom:"10px"}}>Current Thirst: </label>
              <br />
              <label style={{marginBottom:"10px"}}>Desired Hunger: </label>
              <br />
              <label style={{marginBottom:"10px"}}>Desired Thirst: </label>
              <br />
              <button type="submit">Calculate</button>
            </div>
  
            <div style={{display:"flex", flexDirection: "column", flex: 1}}>
              <input type="text" name="hunger" style={{marginBottom:"10px"}} defaultValue={formData.hunger} onChange={handleInputChange}/>
              <br />
              <input type="thirst" name="thirst" style={{ marginBottom: '10px'}} defaultValue={formData.thirst} onChange={handleInputChange}/>
              <br />
              <input type="goalHunger" name="goalHunger" style={{ marginBottom: '10px'}} defaultValue={formData.goalHunger} onChange={handleInputChange}/>
              <br />
              <input type="goalThirst" name="goalThirst" style={{ marginBottom: '10px'}} defaultValue={formData.goalThirst} onChange={handleInputChange}/>
              <br />
            </div>
          </form>
        </div>

        {/*Column for response*/}
        {responseData.min_price !== undefined &&
        <div style={{display:"flex", flexDirection: "row", flex: 1}}>
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
      <div style={{display:"flex", flexDirection: "column", flex: 1, background:"#e5e5e5"}}>
        <p>Total Price: {responseData.min_price}</p>
        <br/>
        <p>Final Hydration: {responseData.final_hydration}</p>
        <br/>
        <p>Final Energy: {responseData.final_energy}</p>
      </div>
    }

      <div className="mb-32 flex flex-col lg:w-full lg:mb-0 lg:flex-row lg:justify-between">
        <a
          href="https://tarkov.dev/maps/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Interactive Maps{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Great interactive maps to help you loot and find extracts!
          </p>
        </a>

        <a
          href="https://www.eft-ammo.com/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            EFT-Ammo{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Compare all Tarkov ammo types!
          </p>
        </a>

        <a
          href="https://www.reddit.com/r/Tarkov/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            r/Tarkov{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            A reddit forum dedicated to EFT.
          </p>
        </a>
      </div>
    </main>
  );
}

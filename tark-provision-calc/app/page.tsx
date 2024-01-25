import React from 'react';
import Starfield from "react-starfield";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      
      <div style={{textAlign:"center"}}>
          <p style={{ fontSize:"50px" }}>Tarkov Provisions Calculator</p>
          <p style={{ fontSize:"20px", paddingTop:"10px"}}>Welcome to Tarkov Provision Calculator. This site is meant to show you the most efficient way to replenish your food/hunger in Escape From Tarkov.</p>
      </div>

      <div style={{ background:"#e5e5e5", display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
      <form style={{display:"flex", flexDirection:"row", gap:"20px", marginLeft:"10%", padding:"10px"}}>
        <div style={{display:"flex", flexDirection: "column", flex: 1}}>
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
        <input type="text" name="hunger" style={{marginBottom:"10px"}}/>
        <br />
        <input type="thirst" name="thirst" style={{ marginBottom: '10px'}}/>
        <br />
        <input type="dHunger" name="dHunger" style={{ marginBottom: '10px'}} defaultValue={90}/>
        <br />
        <input type="dThirst" name="dThirst" style={{ marginBottom: '10px'}} defaultValue={90}/>
        <br />
        </div>

      </form>
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
    </div>

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

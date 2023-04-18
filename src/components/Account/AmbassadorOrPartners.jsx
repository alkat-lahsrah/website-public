import React, { useState } from "react";
import { supabase } from "../../helpers/supabaseClient";

export const AmbassadorOrPartners = ({session}) => {
  const [a_or_p, setAOrP] = useState("a");
  

  async function updateProfile(aorp) {
    console.log("okokok");
    const { user } = session;
    const updates = {
      id: user.id,
      full_name: "",
      phone_number: "",
      email: user.email,
      organization_name: "",
      a_or_p: aorp,
    };

    let { error } = await supabase.from("profiles").upsert(updates);


    if (error) {
      console.log(error);
    }
    location.reload();
  }
  
  return (
    <div className="h-screen w-screen flex">
      {/* left side */}
      <div className="grow w-full">
        <div className="flex flex-col items-center h-full justify-center">
          <div className="flex flex-col gap-10">
            <p className="text-6xl">Ambassador</p>
            <p className="text-3xl">Choose this if you are an individual</p>
            <button onClick={()=>updateProfile("a")} className="bg-gray-200 p-5 text-2xl active:bg-slate-400 hover:bg-slate-300">Choose</button>
          </div>
        </div>
      </div>

      {/* center */}
      <div className="grow-0 text-gray-500 text-3xl">
        <div className="flex flex-col items-center h-full justify-center">
          <div className="h-full py-10">
            {/* make a vertical line */}
            <div className="h-full w-2 rounded-full bg-gray-500"></div>
          </div>
          Or
          <div className="h-full py-10">
            {/* make a vertical line */}
            <div className="h-full w-2 rounded-full bg-gray-500"></div>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="grow w-full">
        <div className="flex flex-col items-center h-full justify-center">
          <div className="flex flex-col gap-10">
            <p className="text-6xl">Partners</p>
            <p className="text-3xl">Choose this if you are a Company</p>
            <button onClick={()=>updateProfile("p")} className="bg-gray-200 p-5 text-2xl active:bg-slate-400 hover:bg-slate-300">Choose</button>
          </div>
        </div>
      </div>
    </div>
  );
};

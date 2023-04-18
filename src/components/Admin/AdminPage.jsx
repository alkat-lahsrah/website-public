import React from "react";
import { LeadTable } from "./LeadTable";
import { ProfileTable } from "./ProfileTable";

export const AdminPage = ({ session }) => {
  const [profile, setProfile] = React.useState(true);

  return (
    <div className="font-mono ">
      <h1 className="font-mono font-bold flex pt-5 justify-center items-center text-5xl">Admin</h1>
      <div className="flex gap-4 px-20">
        <button
          onClick={() => setProfile(true)}
          className={`${profile?"bg-green-200 p-2 hover:bg-green-300 active:bg-green-400":"bg-gray-200 p-2 hover:bg-gray-300 active:bg-gray-400"}  px-3`}
        >
          Profiles
        </button>
        <button
          onClick={() => setProfile(false)}
          className={`${!profile?"bg-green-200 p-2 hover:bg-green-300 active:bg-green-400":"bg-gray-200 p-2 hover:bg-gray-300 active:bg-gray-400"}  px-3`}
        >
          Leads
        </button>
      </div>
      <div className="p-5">{profile ? <ProfileTable session={session} /> : <LeadTable session={session}/>}</div>
    </div>
  );
};

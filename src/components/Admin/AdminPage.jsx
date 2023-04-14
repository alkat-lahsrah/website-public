import React from "react";
import { LeadTable } from "./LeadTable";
import { ProfileTable } from "./ProfileTable";

export const AdminPage = ({ session }) => {
  const [profile, setProfile] = React.useState(true);

  return (
    <div>
      <h1>Admin</h1>
      <div className="flex gap-4">
        <button
          onClick={() => setProfile(true)}
          className="bg-gray-200 p-2 hover:bg-gray-300 active:bg-gray-400 px-3"
        >
          Profiles Section
        </button>
        <button
          onClick={() => setProfile(false)}
          className="bg-gray-200 p-2 hover:bg-gray-300 active:bg-gray-400 px-3"
        >
          Leads Section
        </button>
      </div>
      <div className="p-5">{profile ? <ProfileTable session={session} /> : <LeadTable session={session}/>}</div>
    </div>
  );
};

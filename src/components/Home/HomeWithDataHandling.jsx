import React, { useEffect, useState } from "react";
import { supabase } from "../../helpers/supabaseClient";
import { Headers } from "./Headers";
import { Insights } from "./Insights";
import { Integrations } from "./Integrations";
import { Leads } from "./Leads";

export const HomeWithDataHandling = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const email = session?.user.email;

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      const { user } = session;
      console.log(session);

      let { data, error } = await supabase
        .from("profiles")
        .select("full_name,ph_number,avatar_url")
        .eq("id", user.id)
        .single();
      console.log(data);

      if (error) {
        console.log(error);
      } else if (data) {
        setUserName(data.full_name);
        setPhoneNumber(data.ph_number);
        setAvatarUrl(data.avatar_url);
      }
      setLoading(false);
    }
    getProfile();
  }, [session]);

  return (
    <div className="flex pt-[74px] h-screen gap-4 items-center overflow-scroll w-screen flex-col">
      <Headers
        name={userName}
        session={session}
        key={session.user.id}
        id={session.user.id}
      />
      <Insights />
      <div className="">
        <Leads session={session} key={session.user.id} />
      </div>
      <Integrations />
    </div>
  );
};

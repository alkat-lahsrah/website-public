import React, { useEffect, useState } from "react";
import { supabase } from "../../helpers/supabaseClient";

export const Profile = ({ session }) => {
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

  async function updateProfile() {
    console.log("okokok");
    const { user } = session;
    const updates = {
      id: user.id,
      full_name: userName,
      avatar_url: avatarUrl,
      ph_number: phoneNumber,
      updated_at: new Date(),
    };

    console.log(updates);

    let { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={updateProfile} className="">
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" value={email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          type="text"
          id="username"
          required
          value={userName || ""}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="number"
          id="phone_number"
          required
          value={phoneNumber || ""}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button block primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <a href="/home">
          <button className="button block" type="button">
            Go to Home
          </button>
        </a>
      </div>

      <div>
        <button
          className="button block"
          type="button"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </form>
  );
};

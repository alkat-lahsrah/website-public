import React, { useEffect, useState } from "react";
import { supabase } from "../../helpers/supabaseClient";

export const Profile = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const email = session?.user.email;

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      const { user } = session;
      console.log(session);

      let { data, error } = await supabase
        .from("profiles")
        .select("full_name,phone_number")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log(error);
        if(error.code==="PGRST116"){
          updateProfile();
        }
      } else if (data) {
        setUserName(data.full_name);

        setPhoneNumber(data.phone_number);
        console.log(data)
        console.log(phoneNumber);
        console.log(userName);
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
      phone_number: phoneNumber,
      email: user.email
    };

    console.log(updates);

    let { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col p-5">
      <div className="flex gap-3 text-5xl font-bold">
        <div className="flex">
          <p className="text-orange-500">Ed</p>
          <p className="text-green-400">you</p>
        </div>
        <p>Partners</p>
      </div>
      <div className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
        <p>Profile</p>
      </div>
      <form onSubmit={updateProfile} className="flex flex-col md:w-1/3 lg:1/4">
        <div className="">
          <label
            htmlFor="email"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            disabled
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          />
        </div>
        <div className="">
          <label
            htmlFor="username"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="username"
            required
            value={userName || ""}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            disabled
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone_number"
            required
            value={phoneNumber || ""}
            disabled
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* <div>
          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </button>
        </div> */}

        <div className="flex gap-10 justify-end pt-10">
          <a href="/home">
            <button
              className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
              type="button"
            >
              Go to Home
            </button>
          </a>
          <button
            className="shadow bg-red-600 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
            type="button"
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </button>
        </div>
      </form>
    </div>
  );
};

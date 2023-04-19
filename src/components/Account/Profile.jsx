import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { supabase } from "../../helpers/supabaseClient";
import { AmbassadorOrPartners } from "./AmbassadorOrPartners";

export const Profile = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [aOrP, setAOrP] = useState("a");
  const [userName, setUserName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [organizationName, setOrganizationName] = useState(null);

  const email = session?.user.email;

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      let { data, error } = await supabase
        .from("profiles")
        .select("full_name,phone_number,organization_name,a_or_p")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log(error);
        if (error.code === "PGRST116") {
          setNewUser(true);
        }
      } else if (data) {
        setUserName(data.full_name);
        setNewUser(false);
        setPhoneNumber(data.phone_number);
        setOrganizationName(data.organization_name);
        setAOrP(data.a_or_p);
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
      email: user.email,
      organization_name: organizationName,
    };

    let { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      {newUser ? (
        <AmbassadorOrPartners session={session} />
      ) : (
        <div className="w-screen h-screen flex justify-center items-center flex-col p-5">
          <div className="flex text-3xl font-sans justify-center items-center">
            {/* add logo */}
            <img src="finalLogo.png" alt="" className="w-10" />
            <div className="flex">
              <p className="font-extrabold">edyou</p>
            </div>
            <p>{aOrP == "a" ? "ambassador" : "partners"}</p>
          </div>
          <div className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
            <p>Profile</p>
          </div>
          <form
            onSubmit={updateProfile}
            className="flex flex-col md:w-1/3 lg:1/4"
          >
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
            {aOrP === "p" ? (
              <div>
                <label
                  htmlFor="organization_name"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Organization Name
                </label>
                <input
                  type="text"
                  id="organization_name"
                  required
                  value={organizationName || ""}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) => setOrganizationName(e.target.value)}
                />
              </div>
            ) : null}
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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="flex gap-10 justify-end pt-10">
              
                <button
                  onClick={() => Router.push("/")}
                  className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                  type="button"
                >
                  Go to Home
                </button>
              
              <button
                className="shadow bg-red-600 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                type="button"
                onClick={() => supabase.auth.signOut()}
              >
                Sign Out
              </button>
              <button
                className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                type="button"
                onClick={() => updateProfile()}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

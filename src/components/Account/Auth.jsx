import React, { useState } from "react";
import { supabase } from "../../helpers/supabaseClient";

export const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [recieveOtp, setRecieveOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      setRecieveOtp(true);
      alert("Check your email for the OTP!");
    }
    setLoading(false);
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: "magiclink",
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      setRecieveOtp(true);
      alert("You have successfully logged in!");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen text-xl">
      <div className="flex text-6xl font-sans justify-center items-center">
        {/* add logo */}
        {/* <img src="finalLogo.png" alt="" className="w-10" /> */}
        <div className="flex">
          <p className="font-extrabold">speak</p>
        </div>
        <p>Pro</p>
      </div>
      {recieveOtp ? (
        <div className="">
          <h1 className="mt-4 text-lg leading-7 text-gray-500 font-regular uppercase">
            Login with otp
          </h1>
          <p className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">
            Input otp
          </p>
          <form className="form-widget" onSubmit={handleOtp}>
            <div>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Your otp"
                value={otp}
                required={true}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div>
              <button
                className="shadow bg-green-600 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                disabled={loading}
              >
                {loading ? <span>Loading</span> : <span>Submit</span>}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="">
          <h1 className="mt-4 text-lg leading-7 text-gray-500 font-regular uppercase">
            Login with Otp
          </h1>
          <p className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">
            Sign in via magic link with your email below
          </p>
          <form className="form-widget" onSubmit={handleLogin}>
            <div>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="email"
                placeholder="Your email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <button
                className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                disabled={loading}
              >
                {loading ? <span>Loading</span> : <span>Send otp</span>}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

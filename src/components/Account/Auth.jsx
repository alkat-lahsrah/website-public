import React, { useState } from "react";
import { supabase } from "../../helpers/supabaseClient";

export const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [recieveOtp, setRecieveOtp] = useState(false);
  const [otp,setOtp]=useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      setRecieveOtp(true);
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({ email:email, token:otp,type:"magiclink"});

    if (error) {
      alert(error.error_description || error.message);
    } else {
      setRecieveOtp(true);
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  return (
    <div className="row flex flex-center">
      {recieveOtp ? (
        <div className="col-6 form-widget">
          <h1 className="header">Supabase + React + otp</h1>
          <p className="description">
            Input otp
          </p>
          <form className="form-widget" onSubmit={handleOtp}>
            <div>
              <input
                className="inputField"
                type="text"
                placeholder="Your otp"
                value={otp}
                required={true}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div>
              <button className={"button block"} disabled={loading}>
                {loading ? <span>Loading</span> : <span>Submit</span>}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="col-6 form-widget">
          <h1 className="header">Supabase + React</h1>
          <p className="description">
            Sign in via magic link with your email below
          </p>
          <form className="form-widget" onSubmit={handleLogin}>
            <div>
              <input
                className="inputField"
                type="email"
                placeholder="Your email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <button className={"button block"} disabled={loading}>
                {loading ? <span>Loading</span> : <span>Send magic link</span>}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

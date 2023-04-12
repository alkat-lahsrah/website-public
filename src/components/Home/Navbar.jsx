import React from "react";
import { motion } from "framer-motion";
import { BiSupport } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Navigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { RxCopy } from "react-icons/rx";

export const Navbar = () => {
  return (
    <div className="flex bg-white justify-center">
      <div className="w-screen flex justify-between font-mono items-center px-20 p-4">
        <div className="flex gap-3 text-3xl font-bold">
          <div className="flex">
            <p className="text-orange-500">Ed</p>
            <p className="text-green-400">you</p>
          </div>
          <p>Partners</p>
        </div>

        <div className="flex items-center gap-5">
          <Popup
            trigger={
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-1 text-lg"
              >
                <BiSupport /> Support
              </motion.button>
            }
            position="bottom center"
            className="bg-white"
          >
            <div className="bg-white flex flex-col gap-5 p-2 border">
              <p className="text-gray-500 p-3">
                For any queries, please contact us at
              </p>
              <div className="flex p-2 items-center bg-slate-100 justify-between rounded-sm gap-2">
                <p>+91 1234567890</p>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText("+91 1234567890")
                  }
                  className="flex items-center p-2 rounded-md bg-slate-300 active:bg-green-100 active:text-green-900 text-blue-600"
                >
                  <RxCopy /> Copy
                </button>
              </div>
              <div className="flex p-2 items-center bg-slate-100 justify-between rounded-sm gap-2 ">
                <p>edyouabroad@gmail.com</p>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText("edyouabroad@gmail.com")
                  }
                  className="flex items-center p-2 rounded-md bg-slate-300 active:bg-green-100 active:text-green-900 text-blue-600"
                >
                  <RxCopy /> Copy
                </button>
              </div>
              <p className="text-gray-500 p-3"></p>
            </div>
          </Popup>

          <a href="/account">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 text-lg"
            >
              <CgProfile /> Profile
            </motion.button>
          </a>
        </div>
      </div>
    </div>
  );
};

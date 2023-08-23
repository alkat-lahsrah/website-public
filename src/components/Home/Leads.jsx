import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../helpers/supabaseClient";
import TimeAgo from "react-timeago";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillFilterCircleFill } from "react-icons/bs";
import Popup from "reactjs-popup";
import { Services } from "./Leads/Services";
import { UpdateLead } from "./Leads/UpdateLead";
import { Navigate } from "react-router-dom";

export const Leads = ({ session }) => {
  const [data, setData] = useState([{}]);
  const [data1, setData1] = useState([]);
  const [search, setSearch] = useState("");

  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  useEffect(() => {
    async function getVideosList() {
      const { user } = session;

      let { data, error } = await supabase
        .from("videouserlist")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.log(error);
      } else if (data) {
        console.log(data);
        setData(data);
        setData1(data);
      }
    }
    getVideosList();
  }, []);



  return (
    <div className="max-w-[1700px] overflow-x-auto rounded-sm bg-white w-screen">
      <div className="flex flex-col justify-between m-10">
        {/* top */}
        <div className="flex">
          <p className="text-3xl font-bold py-2">Your videos</p>
        </div>

        {/* bottom */}
        <div className="flex gap-5"></div>
        <table className="border-2 table-auto overflow-scroll">
          <thead>
            <tr>
              <th className="border p-2">
                Index
              </th>
              <th className="border p-2">
                Video Name
              </th>
              <th className="border p-2">
                Created at
              </th>
              <th className="border p-2">
                Analize
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item.video_name}</td>
                <td className="border p-2">
                  <TimeAgo date={item.created_at} />
                </td>
                <td className="border p-2">
                  <a href={`/#/v/${item.video_id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Analyze
                  </a>
                </td>
              </tr>
            ))}


          </tbody>
        </table>
      </div>
    </div>
  );
};

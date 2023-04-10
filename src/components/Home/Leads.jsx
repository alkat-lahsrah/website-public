import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../helpers/supabaseClient";
import TimeAgo from "react-timeago";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillFilterCircleFill } from "react-icons/bs";
import Popup from "reactjs-popup";

export const Leads = ({ session }) => {
  const [data, setData] = useState([{}]);
  const [data1, setData1] = useState([]);
  const [search, setSearch] = useState("");
  const [f1, setF1] = useState(true);
  const [f2, setF2] = useState(true);
  const [f3, setF3] = useState(true);
  const [f4, setF4] = useState(true);
  const [f5, setF5] = useState(true);
  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  useEffect(() => {
    async function getLeads() {
      const { user } = session;
      console.log(session);

      let { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.log(error);
      } else if (data) {
        setData(data);
        setData1(data);
        console.log(data);
      }
    }
    getLeads();
  }, [session]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleFilter1 = (e) => {
    setF1(!f1);
  };
  const handleFilter2 = (e) => {
    setF2(!f2);
  };
  const handleFilter3 = (e) => {
    setF3(!f3);
  };
  const handleFilter4 = (e) => {
    setF4(!f4);
  };
  const handleFilter5 = (e) => {
    setF5(!f5);
  };

  const handleFilters = (e) => {
    console.log([f1, f2, f3, f4, f5]);
    closeTooltip();
    const filteredData = data.filter((lead) => {
      console.log(lead.status);

      //code below is mot working as expected
      if (f1) {
        if (lead.status?.contacted === true) {
          return lead;
        }
      }
      if (f2) {
        if (lead.status?.awaiting_response === true) {
          return lead;
        }
      }
      if (f3) {
        if (lead.status?.in_process === true) {
          return lead;
        }
      }
      if (f4) {
        if (lead.status?.booked === true) {
          return lead;
        }
      }
      if (f5) {
        if (lead.status?.did_not_book === true) {
          return lead;
        }
      }
    });
    console.log(filteredData);
    setData1(filteredData);
    console.log(data1);
  };

  const handleClear = (e) => {
    setF1(true);
    setF2(true);
    setF3(true);
    setF4(true);
    setF5(true);
    handleFilters(e);
  };

  return (
    <div className="max-w-[1700px] overflow-x-auto rounded-sm bg-white w-screen">
      <div className="flex flex-col justify-between m-10">
        {/* top */}
        <div className="flex">
          <p className="text-3xl font-bold py-2">Leads</p>
        </div>

        {/* bottom */}
        <div className="flex gap-5"></div>
        <table className="border-2">
          <thead>
            <tr>
              <th className="flex w-full justify-center items-center py-4 text-xl">
                <p className="basis-[14.28%]">Lead ID</p>
                <p className="basis-[14.28%] flex justify-center"><Popup
                  trigger={
                    <button className="flex gap-1 items-center">
                      <AiOutlineSearch />
                      <p>Lead Name</p>
                    </button>
                  }
                  position="top center"
                  className="bg-white"
                >
                  <div className="bg-white p-2 border">
                    <input
                      type="search"
                      name=""
                      id=""
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={handleSearch}>Submit</button>
                  </div>
                </Popup></p>
                
                <p className="basis-[14.28%] flex justify-center"><Popup
                  ref={ref}
                  trigger={
                    <button className="flex gap-1 items-center">
                      <BsFillFilterCircleFill></BsFillFilterCircleFill>
                      <p>Status</p>
                    </button>
                  }
                  position="top center"
                  className="bg-white"
                >
                  <div className="bg-white p-2 rounded-lg shadow-md border">
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        name="status"
                        id="status"
                        value={f1}
                        checked={f1}
                        onChange={handleFilter1}
                      />
                      <span>Contacted</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        name="status"
                        id="status"
                        value={f2}
                        checked={f2}
                        onChange={handleFilter2}
                      />
                      <span>Awaiting response</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        name="status"
                        id="status"
                        value={f3}
                        checked={f3}
                        onChange={handleFilter3}
                      />
                      <span>In process</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        name="status"
                        id="status"
                        value={f4}
                        checked={f4}
                        onChange={handleFilter4}
                      />
                      <span>Booked</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        name="status"
                        id="status"
                        value={f5}
                        checked={f5}
                        onChange={handleFilter5}
                      />
                      <span>Did not book</span>
                    </div>
                    <div className="flex justify-around">
                      <button
                        onClick={handleFilters}
                        className="bg-blue-500 text-white rounded-md p-2"
                      >
                        Apply
                      </button>
                      <button
                        onClick={handleClear}
                        className="bg-red-500 text-white rounded-md p-2"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </Popup></p>
                <p className="basis-[14.28%] justify-center items-center">Services taken</p>
                <p className="basis-[14.28%] justify-center items-center">Total Cost</p>
                <p className="basis-[14.28%] justify-center items-center">Your Commission 10% after successful transaction</p>
                <p className="basis-[14.28%] justify-center items-center">Created At</p>
              </th>
            </tr>
          </thead>
          {data1.map((lead) => {
            return (
              <tbody>
                <tr>
                  <td className="flex w-full justify-evenly border items-center text-xl">
                    <p className="w-full basis-[14.28%] overflow-x-auto flex items-center py-2 justify-center self-center">
                      <button onClick={() => {navigator.clipboard.writeText(lead.id)}} className="bg-gray-200 hover:shadow rounded-full p-2 px-3 shadow-xl active:shadow-lg active:bg-green-200">Click to copy</button>
                    </p>
                    <p className="w-full basis-[14.28%] overflow-x-auto flex items-center justify-center self-center">
                      <>{lead.name}</>
                    </p>
                    <p className="w-full basis-[14.28%] overflow-x-auto flex self-center items-center justify-center">
                      {/* check if lead.status is n object. if so return all the keys whose values are true */}
                      {typeof lead.status === "object"
                        ? Object.keys(lead.status).map((key) => {
                            if (lead.status[key] === true) {
                              return (
                                key
                                  .replace(/_/g, " ")
                                  .replace(key[0], key[0].toUpperCase()) + " "
                              );
                            }
                          })
                        : lead.status}
                    </p>
                    <p className="w-full basis-[14.28%] overflow-x-auto flex gap-2 p-3 flex-wrap items-center justify-center self-center">
                      {/* lead.services is an object that has many services each service is an object that has used as boolean and cost as number return a service key if used is true*/}
                      {typeof lead.services === "object"
                        ? Object.keys(lead.services).map((key) => {
                            if (lead.services[key].used === true) {
                              //key is an object and i want to return its name not value so i have to replace the _ with space and capitalize the first letter
                              key = key.replace(/_/g, " ");
                              key = key.replace(key[0], key[0].toUpperCase());
                              return (
                                <p className="p-1 w-fit text-sm px-3 bg-gray-200 rounded-full shadow-lg">
                                  {key}
                                </p>
                              );
                            }
                          })
                        : lead.services}
                    </p>
                    <p className="w-full basis-[14.28%] overflow-x-auto flex item-center justify-center self-center">
                      {
                        // lead.services is an object that has many services each service is an object that has used as boolean and cost as number return sum of all the costs where used is true
                        typeof lead.services === "object"
                          ? Object.keys(lead.services).reduce((acc, key) => {
                              if (lead.services[key].used === true) {
                                return acc + lead.services[key].cost;
                              } else {
                                return acc;
                              }
                            }, 0)
                          : lead.services
                      }
                    </p>
                    <p className="w-full basis-[14.28%] overflow-x-auto flex item-center justify-center self-center">
                      {
                        // lead.services is an object that has many services each service is an object that has used as boolean and cost as number return sum of all the costs where used is true
                        typeof lead.services === "object"
                          ? Object.keys(lead.services).reduce((acc, key) => {
                              if (lead.services[key].used === true) {
                                return acc + (lead.services[key].cost)/10;
                              } else {
                                return acc;
                              }
                            }, 0)
                          : lead.services
                      }
                    </p>
                    <p className="w-full basis-[14.28%] overflow-x-auto flex item-center justify-center self-center">
                      <TimeAgo date={lead.created_at} />
                    </p>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

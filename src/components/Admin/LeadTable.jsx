import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../helpers/supabaseClient";
import TimeAgo from "react-timeago";
import { AiOutlineSearch } from "react-icons/ai";
import Popup from "reactjs-popup";
import { LeadPopup } from "./LeadPopup";

export const LeadTable = ({ session }) => {
  const [leadsData, setLeadsData] = useState([]);
  const [leadsData1, setLeadsData1] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchUserId, setSearchUserId] = useState("");
  const [searchCreatorEmail, setSearchCreatorEmail] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  const handleSearchId = (e) => {
    setSearchId(e.target.value);
    closeTooltip();
    const filteredData = leadsData1.filter((lead) =>
      lead.id.toLowerCase().includes(searchId.toLowerCase())
    );
    setLeadsData(filteredData);
  };

  const handleSearchUserId = (e) => {
    setSearchUserId(e.target.value);
    closeTooltip();
    const filteredData = leadsData1.filter((lead) =>
      lead.user_id.toLowerCase().includes(searchUserId.toLowerCase())
    );
    setLeadsData(filteredData);
  };

  const handleSearchCreatorEmail = (e) => {
    setSearchCreatorEmail(e.target.value);
    closeTooltip();
    const filteredData = leadsData1.filter((lead) =>
      lead.creator_email
        .toLowerCase()
        .includes(searchCreatorEmail.toLowerCase())
    );
    setLeadsData(filteredData);
  };

  const handleSearchEmail = (e) => {
    setSearchEmail(e.target.value);
    closeTooltip();
    const filteredData = leadsData1.filter((lead) =>
      lead.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
    setLeadsData(filteredData);
  };

  const handleSearchName = (e) => {
    setSearchName(e.target.value);
    closeTooltip();
    const filteredData = leadsData1.filter((lead) =>
      lead.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setLeadsData(filteredData);
  };

  const handleSearchPhone = (e) => {
    setSearchPhone(e.target.value);
    closeTooltip();
    const filteredData = leadsData1.filter((lead) =>
      lead.phone_number.toLowerCase().includes(searchPhone.toLowerCase())
    );
    setLeadsData(filteredData);
  };

  useEffect(() => {
    const getLeads = async () => {
      let { data, error } = await supabase.from("leads").select("*");


      if (error) {
        console.log(error);
      }

      if (data) {
        setLeadsData(data);
        setLeadsData1(data);
      }
    };
    getLeads();
  }, [session]);

  return (
    <div className="w-full border p-5 rounded-lg shadow-lg">
      <p className="p-5">Total Leads: {leadsData.length}</p>
      <div className="rounded-lg shadow-xl p-5 border">
        <table className="table-auto overflow-scroll">
          <thead>
            <tr>
              <th className="border p-2">
                <Popup
                  ref={ref}
                  trigger={
                    <div className="flex items-center justify-center gap-1">
                      <p>Lead Id</p>
                      <AiOutlineSearch />
                    </div>
                  }
                  position="right center"
                  closeOnDocumentClick
                >
                  <div className="flex flex-col items-end gap-2 bg-white p-2 border">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="m-0 border active:border-0 p-2 border-black focus:border-0"
                      onChange={(e) => setSearchId(e.target.value)}
                    />
                    <button
                      onClick={handleSearchId}
                      className="bg-green-500 p-2 px-5 text-white rounded "
                    >
                      Submit
                    </button>
                  </div>
                </Popup>
              </th>
              <th className="border p-2">
                <Popup
                  ref={ref}
                  trigger={
                    <div className="flex items-center justify-center gap-1">
                      <p>User Id</p>
                      <AiOutlineSearch />
                    </div>
                  }
                  position="right center"
                  closeOnDocumentClick
                >
                  <div className="flex flex-col items-end gap-2 bg-white p-2 border">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="m-0 border active:border-0 p-2 border-black focus:border-0"
                      onChange={(e) => setSearchUserId(e.target.value)}
                    />
                    <button
                      onClick={handleSearchUserId}
                      className="bg-green-500 p-2 px-5 text-white rounded "
                    >
                      Submit
                    </button>
                  </div>
                </Popup>
              </th>
              <th className="border p-2">
                <Popup
                  ref={ref}
                  trigger={
                    <div className="flex items-center justify-center gap-1">
                      <p>Creator Email</p>
                      <AiOutlineSearch />
                    </div>
                  }
                  position="right center"
                  closeOnDocumentClick
                >
                  <div className="flex flex-col items-end gap-2 bg-white p-2 border">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="m-0 border active:border-0 p-2 border-black focus:border-0"
                      onChange={(e) => setSearchCreatorEmail(e.target.value)}
                    />
                    <button
                      onClick={handleSearchCreatorEmail}
                      className="bg-green-500 p-2 px-5 text-white rounded "
                    >
                      Submit
                    </button>
                  </div>
                </Popup>
              </th>
              <th className="border p-2">
                <Popup
                  ref={ref}
                  trigger={
                    <div className="flex items-center justify-center gap-1">
                      <p>Email</p>
                      <AiOutlineSearch />
                    </div>
                  }
                  position="right center"
                  closeOnDocumentClick
                >
                  <div className="flex flex-col items-end gap-2 bg-white p-2 border">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="m-0 border active:border-0 p-2 border-black focus:border-0"
                      onChange={(e) => setSearchEmail(e.target.value)}
                    />
                    <button
                      onClick={handleSearchEmail}
                      className="bg-green-500 p-2 px-5 text-white rounded "
                    >
                      Submit
                    </button>
                  </div>
                </Popup>
              </th>
              <th className="border p-2">Name of lead</th>
              <th className="border p-2">Phone.no of lead</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Services</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {leadsData.map((lead) => (
              <tr key={lead.id}>
                <td className="border p-2">{lead.id}</td>
                <td className="border p-2">{lead.user_id}</td>
                <td className="border p-2">{lead.creator_email}</td>
                <td className="border p-2">{lead.email}</td>
                <td className="border p-2">{lead.name}</td>
                <td className="border p-2">{lead.phone_number}</td>
                <td className="border p-2">
                  {
                    // lead.status is an object which has many keys. return keys which are true
                    Object.keys(lead.status).filter(
                      (key) => lead.status[key] === true
                    )
                  }
                </td>
                <td className="border p-2">
                  {
                    // lead.services is an object which has many services as key. each key is an object which has used as boolean and cost as int. return services which are used in <p> tag
                    Object.keys(lead.services).map((key) =>
                      lead.services[key].used ? (
                        <p key={key}>
                          {key} - {lead.services[key].cost}
                        </p>
                      ) : null
                    )
                  }
                </td>
                <td className="border p-2">
                  <TimeAgo date={lead.created_at} />
                </td>
                <td className="border p-2">
                  <LeadPopup lead={lead} session={session}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

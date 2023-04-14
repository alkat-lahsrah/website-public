import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../helpers/supabaseClient";
import TimeAgo from "react-timeago";
import { ProfilePopup } from "./ProfilePopup";
import { AiOutlineSearch } from "react-icons/ai";
import Popup from "reactjs-popup";

export const ProfileTable = ({ session }) => {
  const [profilesData, setProfilesData] = useState([]);

  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const [profileData1, setProfileData1] = useState([]);

  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  useEffect(() => {
    const getProfiles = async () => {
      let { data, error } = await supabase
        .from("profiles")
        .select("id,full_name,phone_number,email,created_at");
      console.log(data);

      if (error) {
        console.log(error);
      }

      if (data) {
        console.log(data);
        setProfilesData(data);
        setProfileData1(data);
      }
    };

    getProfiles();
  }, [session]);

  const handleSearchId = (e) => {
    setSearchId(e.target.value);
    closeTooltip();
    const filteredData = profileData1.filter((profile) =>
      profile.id.toLowerCase().includes(searchId.toLowerCase())
    );
    setProfilesData(filteredData);
  };

  const handleSearchName = (e) => {
    setSearchName(e.target.value);
    closeTooltip();
    const filteredData = profileData1.filter((profile) =>
      profile.full_name.toLowerCase().includes(searchName.toLowerCase())
    );
    setProfilesData(filteredData);
  };

  const handleSearchPhone = (e) => {
    setSearchPhone(e.target.value);
    closeTooltip();
    const filteredData = profileData1.filter((profile) =>
      profile.phone_number.toLowerCase().includes(searchPhone.toLowerCase())
    );
    setProfilesData(filteredData);
  };

  const handleSearchEmail = (e) => {
    setSearchEmail(e.target.value);
    closeTooltip();
    const filteredData = profileData1.filter((profile) =>
      profile.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
    setProfilesData(filteredData);
  };

  return (
    <div className="w-full border p-5 rounded-lg shadow-lg">
      <p className="p-5 ">Total Profiles : {profilesData.length}</p>
      <div className="rounded-lg shadow-xl p-5 border">
        <table className=" table-auto w-full overflow-scroll">
          <thead>
            <tr className="">
              <th className="border p-2">
                <p>Index</p>
              </th>
              <th className="border p-2">
                <Popup
                  ref={ref}
                  trigger={
                    <div className="flex items-center justify-center gap-1">
                      <p>Id</p>
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
                      <p>Full Name</p>
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
                      onChange={(e) => setSearchName(e.target.value)}
                    />
                    <button
                      onClick={handleSearchName}
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
                      <p>Phone Number</p>
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
                      onChange={(e) => setSearchPhone(e.target.value)}
                    />
                    <button
                      onClick={handleSearchPhone}
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
              <th className="border p-2">
                <p>Created At</p>
              </th>
              <th className="border p-2">
                <p>Edit a column</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {profilesData.map((profile, index) => (
              <tr key={profile.id}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{profile.id}</td>
                <td className="border p-2">{profile.full_name || "Blank"}</td>
                <td className="border p-2">
                  {profile.phone_number || "Blank"}
                </td>
                <td className="border p-2">{profile.email}</td>
                <td className="border p-2">
                  <TimeAgo date={profile.created_at} />
                </td>
                <td className="border p-2">
                  <ProfilePopup profile={profile} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { supabase } from "../../helpers/supabaseClient";

export const ProfilePopup = ({ profile }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [name, setName] = React.useState(profile.full_name);
  const [phone, setPhone] = React.useState(profile.phone_number);

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updateProfile = async () => {
    const {data,error} = await supabase
      .from("profiles")
      .update({ full_name: name,phone_number: phone })
      .eq("id", profile.id);
  }

  const handleSubmit = (e) => {
    closeModal();
    e.preventDefault();
    updateProfile();
  };

  return (
    <div>
      <button onClick={openModal}>Edit ?</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="absolute border overflow-auto rounded mr-[-50%] bg-white w-full md:w-1/3 -translate-x-2/4 -translate-y-2/4 p-5 border-solid border-[rgb(204,204,204)] inset-[50%_auto_auto_50%]"
        contentLabel="Example Modal"
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="bg-red-500 text-white p-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>

          <form onSubmit={(e)=>{handleSubmit(e)}} className=" p-4 bg-gray-100 flex flex-col gap-2 rounded-3xl ">
            <div className="flex self-center p-1 px-3 bg-slate-300 rounded-full gap-1">Profile : <p className="font-black font-mono">{profile.id}</p></div>
            <div className="flex flex-col ">
              <label
                htmlFor="email"
                className="p-2 w-min bg-blue-600 text-white px-3 rounded-t-3xl"
              >
                Email
              </label>
              <input
                type="email"
                name=""
                id="email"
                disabled
                value={profile.email}
                className="w-full pl-2 rounded-e-full rounded-b-full text-gray-700 italic p-2 px-3 font-bold bg-slate-300"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="user-id"
                className="p-2 w-min bg-blue-600 flex gap-1 text-white px-3 rounded-t-3xl"
              >
                <p>User</p> <p>Id</p>
              </label>
              <input
                type="text"
                name=""
                id="user-id"
                disabled
                value={profile.id}
                className="w-full pl-2 rounded-e-full rounded-b-full text-gray-700 italic p-2 px-3 font-bold bg-slate-300"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="p-2 w-min bg-blue-600 flex gap-1 text-white px-3 rounded-t-3xl"
              >
                <p>Name</p>
              </label>
              <input
                type="text"
                name=""
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full pl-2 rounded-e-full rounded-b-full p-2 px-3 font-bold bg-slate-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="p-2 w-min bg-blue-600 flex gap-1 text-white px-3 rounded-t-3xl"
              >
                <p>Phone</p>
                <p>Number</p>
              </label>
              <input
                type="text"
                name=""
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="w-full pl-2 rounded-e-full rounded-b-full p-2 px-3 font-bold bg-slate-200"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 text-white p-2 px-4 rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

import React from "react";
import ReactDOM from "react-dom";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "react-modal";
import { supabase } from "../../../helpers/supabaseClient";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const UpdateLead = ({ lead, session }) => {
  const [services, setServices] = React.useState({
    service1: {
      used: lead.services.service1.used,
      cost: 100,
    },
    service2: {
      used: lead.services.service2.used,
      cost: 200,
    },
    service3: {
      used: lead.services.service3.used,
      cost: 300,
    },
    service4: {
      used: lead.services.service4.used,
      cost: 400,
    },
  });
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

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
  const handleS1 = () => {
    setServices({
      ...services,
      service1: { ...services.service1, used: !services.service1.used },
    });
  };
  const handleS2 = () => {
    setServices({
      ...services,
      service2: { ...services.service2, used: !services.service2.used },
    });
  };
  const handleS3 = () => {
    setServices({
      ...services,
      service3: { ...services.service3, used: !services.service3.used },
    });
  };
  const handleS4 = () => {
    setServices({
      ...services,
      service4: { ...services.service4, used: !services.service4.used },
    });
  };

  const editLead = async () => {
    const { user } = session;
    const { data, error } = await supabase
      .from("leads")
      .update({ services: services })
      .eq("id", lead.id)
      .eq("user_id", user.id);
  };

  return (
    <div>
      <button onClick={openModal} className="p-0">
        <AiOutlineEdit />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="p-2 px-4 rounded-full bg-red-600 text-white"
          >
            Close
          </button>
        </div>
        <div className="px-5 py-3 flex flex-col">
          <p>Edit lead for id : </p>
          <p className="font-bold p-2 bg-slate-200 rounded-full">{lead.id}</p>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-md border">
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="status"
              id="status"
              value={services.service1.used}
              checked={services.service1.used}
              onChange={handleS1}
            />
            <span>Service 1</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="status"
              id="status"
              value={services.service2.used}
              checked={services.service2.used}
              onChange={handleS2}
            />
            <span>Service 2</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="status"
              id="status"
              value={services.service3.used}
              checked={services.service3.used}
              onChange={handleS3}
            />
            <span>Service 3</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="status"
              id="status"
              value={services.service4.used}
              checked={services.service4.used}
              onChange={handleS4}
            />
            <span>Service 4</span>
          </div>
        </div>
        <div className="flex p-2 justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              editLead();
              closeModal();
            }}
            className="bg-green-500 text-white p-2 px-3 rounded-lg"
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

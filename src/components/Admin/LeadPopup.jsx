import React from "react";

import Modal from "react-modal";
import { supabase } from "../../helpers/supabaseClient";

export const LeadPopup = ({ lead, session }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [status, setStatus] = React.useState(lead.status);
  const [services, setServices] = React.useState(lead.services);

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
  const handleS5 = () => {
    setServices({
      ...services,
      service5: { ...services.service5, used: !services.service5.used },
    });
  };

  const editLead = async () => {
    const { user } = session;
    const { data, error } = await supabase
      .from("leads")
      .update({ services: services })
      .eq("id", lead.id);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="bg-slate-200 p-2 rounded-lg">
        Edit ?
      </button>
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

          <div className="flex flex-col ">
            <div className="flex self-center p-1 px-3 bg-slate-300 rounded-full gap-1">
              Lead : <p className="font-black font-mono">{lead.id}</p>
            </div>
            <div className="flex flex-col ">
              {handleStatus(status, setStatus, lead, closeModal)}
              <div>
                <p>Change services</p>
                {handleServices(
                  services,
                  handleS1,
                  handleS2,
                  handleS3,
                  handleS4,
                  handleS5
                )}
                <div className="flex p-2 justify-center">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      editLead();
                      closeModal();
                    }}
                    className="bg-gray-200  w-full p-2 px-3 rounded-lg"
                  >
                    Update Services
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

function handleServices(
  services,
  handleS1,
  handleS2,
  handleS3,
  handleS4,
  handleS5
) {
  return (
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
      <div className="flex gap-2">
        <input
          type="checkbox"
          name="status"
          id="status"
          value={services.service5.used}
          checked={services.service5.used}
          onChange={handleS5}
        />
        <span>Service 5</span>
      </div>
    </div>
  );
}

const handleStatus = (status, setStatus, lead, closeModal) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="name" className="font-bold">
        Set Status
      </label>
      {/* create a radio input with 5 values */}
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          <input
            type="radio"
            name="status"
            id="status"
            value="contacted"
            checked={status.contacted}
            onClick={() =>
              setStatus({
                contacted: true,
                awaiting_response: false,
                in_process: false,
                booked: false,
                did_not_book: false,
              })
            }
            className="border border-black rounded-lg"
          />
          <label htmlFor="contacted">Contacted</label>
        </div>
        <div className="flex gap-1">
          <input
            type="radio"
            name="status"
            id="status"
            value="awaiting_response"
            checked={status.awaiting_response}
            onClick={() =>
              setStatus({
                contacted: false,
                awaiting_response: true,
                in_process: false,
                booked: false,
                did_not_book: false,
              })
            }
            className="border border-black rounded-lg"
          />
          <label htmlFor="awaiting_response">Awaiting Response</label>
        </div>
        <div className="flex gap-1">
          <input
            type="radio"
            name="status"
            id="status"
            value="in_process"
            checked={status.in_process}
            onClick={() =>
              setStatus({
                contacted: false,
                awaiting_response: false,
                in_process: true,
                booked: false,
                did_not_book: false,
              })
            }
            className="border border-black rounded-lg"
          />
          <label htmlFor="in_process">In process</label>
        </div>
        <div className="flex gap-1">
          <input
            type="radio"
            name="status"
            id="status"
            value="booked"
            checked={status.booked}
            onClick={() =>
              setStatus({
                contacted: false,
                awaiting_response: false,
                in_process: false,
                booked: true,
                did_not_book: false,
              })
            }
            className="border border-black rounded-lg"
          />
          <label htmlFor="booked">Booked</label>
        </div>
        <div className="flex gap-1">
          <input
            type="radio"
            name="status"
            id="status"
            value="did_not_book"
            checked={status.did_not_book}
            onClick={() =>
              setStatus({
                contacted: false,
                awaiting_response: false,
                in_process: false,
                booked: false,
                did_not_book: true,
              })
            }
            className="border border-black rounded-lg"
          />
          <label htmlFor="did_not_book">Did not book</label>
        </div>
        {/* submit button */}
        <button
          onClick={() => {
            supabase
              .from("leads")
              .update({ status: status })
              .eq("id", lead.id)
              .then((res) => {
                console.log(res);
                closeModal();
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          className="bg-slate-200 p-2 rounded-lg"
        >
          Update Status
        </button>
      </div>
    </div>
  );
};

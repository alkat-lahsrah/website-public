import React from "react";

import Modal from "react-modal";
import { supabase } from "../../helpers/supabaseClient";

export const LeadPopup = ({ lead }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [status, setStatus] = React.useState(lead.status);
  // 

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
                      onClick={() => setStatus({ contacted: true , awaiting_response: false, in_process: false, booked: false, did_not_book: false})}
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
                      onClick={() => setStatus({ contacted: false , awaiting_response: true, in_process: false, booked: false, did_not_book: false})}
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
                      onClick={() => setStatus({ contacted: false , awaiting_response: false, in_process: true, booked: false, did_not_book: false})}
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
                      onClick={() => setStatus({ contacted: false , awaiting_response: false, in_process: false, booked: true, did_not_book: false})}
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
                      onClick={() => setStatus({ contacted: false , awaiting_response: false, in_process: false, booked: false, did_not_book: true})}
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
                    Submit
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

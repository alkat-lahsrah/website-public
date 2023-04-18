import React from "react";
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

export const ModalPopup = ({ session }) => {
  const [leadEmail, setLeadEmail] = React.useState("");
  const [leadName, setLeadName] = React.useState("");
  const [leadPhone, setLeadPhone] = React.useState("");
  const [services, setServices] = React.useState({
    service1: {
      desc: "Services and commission EdyouAsk- 500",
      used: false,
      cost: 500,
    },
    service2: {
      desc: "EdyouPathfinder- 2000",
      used: false,
      cost: 2000,
    },
    service3: {
      desc: "Edyoustrategy- 2000",
      used: false,
      cost: 2000,
    },
    service4: {
      desc: "Edyoubullseye- 2000",
      used: false,
      cost: 2000,
    },
    service5: {
      desc: "EdyouUnlimited- 5000",
      used: false,
      cost: 5000,
    },
  });

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

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

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function addLead() {
    const { user } = session;

    const { data, error } = await supabase.from("leads").insert([
      {
        user_id: user.id,
        creator_email: user.email,
        name: leadName,
        email: leadEmail,
        phone_number: leadPhone,
        services: JSON.parse(JSON.stringify(services)),
      },
    ]);
    if (error) {
      console.log(error);
    } else {
    }

    setServices({
      service1: {
        desc: "Services and commission EdyouAsk- 500",
        used: false,
        cost: 500,
      },
      service2: {
        desc: "EdyouPathfinder- 2000",
        used: false,
        cost: 2000,
      },
      service3: {
        desc: "Edyoustrategy- 2000",
        used: false,
        cost: 2000,
      },
      service4: {
        desc: "Edyoubullseye- 2000",
        used: false,
        cost: 2000,
      },
      service5: {
        desc: "EdyouUnlimited- 5000",
        used: false,
        cost: 5000,
      },
    });
  }

  return (
    <div>
      <button onClick={openModal}>Add Lead</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="absolute border overflow-auto rounded mr-[-50%] bg-white w-full md:w-1/3 -translate-x-2/4 -translate-y-2/4 p-5 border-solid border-[rgb(204,204,204)] inset-[50%_auto_auto_50%]"
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          Enter the following details to submit a request:
        </h2>
        <button onClick={closeModal}></button>
        <div className="text-xl font-bold">Add Leads</div>
        <form
          onSubmit={(e) => {
            addLead();
            closeModal();
          }}
          className="flex flex-col"
        >
          <div className="">
            <label
              htmlFor="name"
              className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder={"John Doe"}
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              onChange={(e) => setLeadName(e.target.value)}
            />
          </div>
          <div className="">
            <label
              htmlFor="email"
              className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder={"example@gmail.com"}
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              onChange={(e) => setLeadEmail(e.target.value)}
            />
          </div>
          <div className="">
            <label
              htmlFor="phone_number"
              className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phone_number"
              placeholder={"+XX XXX XXX XXXX"}
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              onChange={(e) => setLeadPhone(e.target.value)}
            />
          </div>
          <div className="">
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
                <span>Service 1 : Services and commission EdyouAsk- 500</span>
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
                <span>Service 2 : EdyouPathfinder- 2000</span>
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
                <span>Service 3 : Edyoustrategy- 2000</span>
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
                <span>Service 4 : Edyoubullseye- 2000</span>
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
                <span>Service 5 : EdyouUnlimited- 5000</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse justify-around items-center p-2">
            <button
              type="submit"
              className="bg-green-600 p-2 text-xl rounded-md text-white w-1/4"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-[#d9534f] p-2 text-xl rounded-md text-white w-1/4"
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

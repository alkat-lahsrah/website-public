import React, { useEffect, useState } from "react";
import { supabase } from "../../helpers/supabaseClient";

export const Insights = ({ session }) => {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    async function getLeads() {
      const { user } = session;

      let { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("user_id", user.id);

      console.log(data);

      if (error) {
        console.log(error);
      } else if (data) {
        setData(data);
        console.log(data);
      }
    }
    getLeads();
  }, [session]);
  return (
    <div className="max-w-[1700px] rounded-sm bg-white w-screen">
      <div className="flex flex-col justify-between m-10">
        {/* top */}
        <div className="flex">
          <p className="text-3xl font-bold py-2">Insights</p>
        </div>

        {/* bottom */}
        <div className="flex gap-5">
          <div className="flex flex-col border-2 p-4 gap-5 py-5 rounded-md basis-1/6">
            <p className="text-6xl">{data.length}</p>
            <p className="text-xl">Total Leads</p>
          </div>
          <div className="flex flex-col border-2 p-4 gap-5 py-5 rounded-md basis-1/6">
            <p className="text-6xl">
              {
                // check for when lead.status is undefined
                data.filter((lead) => lead.status?.in_process === true).length
              }
            </p>
            <p className="text-xl">Processing Leads</p>
          </div>
          <div className="flex flex-col border-2 p-4 gap-5 py-5 rounded-md basis-1/6">
            <p className="text-6xl">
              {
                // check for when lead.status is undefined
                data.filter((lead) => lead.status?.booked === true).length
              }
            </p>
            <p className="text-xl">Booked</p>
          </div>
          <div className="flex flex-col border-2 p-4 gap-5 py-5 rounded-md basis-1/6">
            <p className="text-6xl">
              {
                // data has an array of leads , each lead is an object that has many services, lead.services is an object , each service is an object that has a cost as number and used as boolean . Return the sum of all the services that are used . check for lead.services to be an object
                data
                  .filter((lead) => lead.services)
                  .map((lead) =>
                    Object.values(lead.services)
                      .filter((service) => service.used)
                      .map((service) => service.cost)
                      .reduce((a, b) => a + b, 0)
                  )
                  .reduce((a, b) => a + b, 0)
                
              }
            </p>
            <p className="text-xl">Total Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

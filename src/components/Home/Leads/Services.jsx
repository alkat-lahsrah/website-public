import React from "react";

export const Services = ({lead}) => {
  {
    return (
      <p className="w-full basis-[14.28%] overflow-x-auto flex gap-2 p-3 flex-wrap items-center justify-center self-center">
        {/* lead.services is an object that has many services each service is an object that has used as boolean and cost as number return a service key if used is true*/}
        {typeof lead.services === "object"
          ? Object.keys(lead.services).map((key) => {
              if (lead.services[key].used === true) {
                //key is an object and i want to return its name not value so i have to replace the _ with space and capitalize the first letter
                key = key.replace(/_/g, " ");
                key = key.replace(key[0], key[0].toUpperCase());
                return (
                  <button className="p-1 w-fit text-sm px-3 bg-gray-200 rounded-full shadow-lg">
                    {key}
                  </button>
                );
              }
            })
          : lead.services}
      </p>
    );
  }
};

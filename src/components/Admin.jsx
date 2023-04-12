import React, { useEffect } from "react";
import { supabase } from "../helpers/supabaseClient";

export const Admin = () => {
  useEffect(() => {
    supabase.auth.admin.listUsers().then(({ data, error }) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    }
    );
  }, []);

  return <div>Admin</div>;
};

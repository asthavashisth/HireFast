

import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { session } = useSession();

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });

      
      const response = await cb(supabaseAccessToken, options, ...args);

      
      console.log("API response:", response);

     
      setData(response);
      setError(null);  
    } catch (error) {
      
      console.error("Fetch error:", error);
      setError(error.message || "An error occurred");
    } finally {
    
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;

import { useState, useEffect } from "react";
import axios from "axios";

const apiURL = "http://192.168.50.110:3000";

const useFetch = (method, endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: `${method}`,
    url: `${apiURL}/${endpoint}`,
    headers: {
      // "X-RapidAPI-Key": "c7a67c4335msh8a676bcc8d41087p1d7cfcjsn1eb4a7fb8e65",
      // "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data);
    } catch (error) {
      setIsLoading(false);
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;

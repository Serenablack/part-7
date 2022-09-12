import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name !== "") {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then((res) => {
          console.log(res.data);

          setCountry(res.data);
        })
        .catch((error) => {
          console.log("error");
          setCountry("");
        });
    }
  }, [name]);

  return country;
};

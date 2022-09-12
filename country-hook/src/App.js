import { useState } from "react";

import { useCountry, useField } from "./useCountry";

const Country = ({ country, name }) => {
  console.log(country);

  if (country === null) {
    return null;
  }
  if (country === "") {
    return <div>not found...</div>;
  } else {
    const countryObj = country[0];
    return (
      <div>
        <h3>{countryObj.name.common}</h3>
        <div>population {countryObj.population}</div>
        <div>capital {countryObj.capital}</div>
        <img
          src={countryObj.flags.png}
          height="100"
          alt={`flag of ${countryObj.name.common}`}
        />
      </div>
    );
  }
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} name={name} />
    </div>
  );
};

export default App;

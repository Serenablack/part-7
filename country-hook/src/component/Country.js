const Country = ({ country }) => {
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
export default Country;

import { useMemo, useState } from 'react';

import countries from 'world-countries';
import { City }  from 'country-state-city';

import { 
  CountrySelectValue
} from "@/app/types";

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = (value?: CountrySelectValue) => {
  const getAllCountries = () => formattedCountries;
  const allCities = City.getAllCities();
  const [selectedCity, setSelectedCity] = useState(null);

  const selectedCities = useMemo(() => {
    return allCities.filter(city => city.countryCode === value?.value).map(city => {
      return {
           ...value,
           value: city.name,
           latlng: [+city.latitude, +city.longitude]
      }
    })
 }, [allCities, value]);

 const selectedCountry = useMemo(() => {
  return value
 }, [value]) as CountrySelectValue;


  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  }

  return {
    getAllCountries,
    getByValue,
    setSelectedCity,
    selectedCities,
    selectedCity,
    selectedCountry
  }
};

export default useCountries;

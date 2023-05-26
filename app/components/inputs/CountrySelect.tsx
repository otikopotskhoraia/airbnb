'use client';

import Select from 'react-select'

import useCountries from '@/app/hooks/useCountries';
import { 
  CountrySelectValue
} from "@/app/types";
interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const classNames = {
  control: () => 'p-3 border-2',
  input: () => 'text-lg',
  option: () => 'text-lg'
}

const customTheme = (theme: any) => {
     return   {...theme,
  borderRadius: 6,
  colors: {
    ...theme.colors,
    primary: 'black',
    primary25: '#ffe4e6'
  }
}
}

const customStyles = {
  container: (styles: any) => ({
    ...styles,
    marginTop: "10px",
  }),
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange
}) => {
  const { getAllCountries, getByValue,setSelectedCity, selectedCities, selectedCity, selectedCountry } = useCountries(value);

  return ( 
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAllCountries()}
        value={value}
        onChange={
          (value) => {
            setSelectedCity(null);
            onChange(value as CountrySelectValue)
          }
        }
        formatOptionLabel={(option: any) => (
          <div className="
          flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={classNames}
        theme={(theme) => customTheme(theme)}
      />
      {!!selectedCities.length && <Select
        placeholder="Select City"
        isClearable
        styles={customStyles}
        options={selectedCities}
        value={selectedCity}
        onChange={(value) => {
          setSelectedCity(value);
          onChange(value ? {...value, value: selectedCountry?.value } : getByValue(selectedCountry?.value || "") as CountrySelectValue)
        }}
        formatOptionLabel={(option: any) => (
          <div className="
          flex flex-row items-center gap-3">
            <div>
              {option.value}
            </div>
          </div>
        )}
        classNames={classNames}
        theme={(theme) => customTheme(theme)}
      />}
    </div>
   );
}
 
export default CountrySelect;
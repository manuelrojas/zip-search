import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SyntheticEvent } from 'react';

 
type CountrySelectProps = {
  onChange: (event: SyntheticEvent, value: CountryType | null) => void;
};  

export interface CountryType {
  code: string;
  label: string;
  suggested?: boolean;
}

const countries: readonly CountryType[] = [
  { code: 'US', label: 'United States' },
  { code: 'MX', label: 'Mexico' },
  { code: 'AR', label: 'Argentina' },
];

export default function CountrySelect({ onChange }: CountrySelectProps) {
  return (
    <Autocomplete
      id='country-select-demo'
      sx={{ width: 300 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      onChange={onChange}
      renderOption={(props, option) => (
        <Box
          component='li'
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading='lazy'
            width='20'
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=''
          />
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Choose a country'
          inputProps={{
            ...params.inputProps,
            autoComplete: '', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}



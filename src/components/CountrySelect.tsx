import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CountrySelect() {
  return (
    <Autocomplete
      id='country-select-demo'
      sx={{ width: 300 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
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
          {option.label} - Postal Code: {option.zip}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Choose a country'
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

interface CountryType {
  code: string;
  label: string;
  zip: string;
  suggested?: boolean;
}

const countries: readonly CountryType[] = [
  { code: 'US', label: 'United States', zip: '00210' },
  { code: 'MX', label: 'Mexico', zip: '01000' },
  { code: 'AR', label: 'Argentina', zip: '1601' },
];

import { SyntheticEvent, useState } from 'react';
import './App.css';
import CountrySelect, { CountryType } from './components/CountrySelect';
import { useQuery, gql } from '@apollo/client';
import CircularColor from './components/Loading';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { RecentSearchs, SearchInput } from './components/RecentSearchs';
import { CountryCard } from './components/CountryCard';
import { Place } from './components/Places';

export const GET_ZIPINFO = gql`
  query ($input: ZipInputFilter!) {
    GetZipInfo(input: $input) {
      country
      postCode
      countryAbbreviation
      places {
        placeName
        longitude
        state
        latitude
        stateAbbreviation
      }
    }
  }
`;

let searchs: SearchInput[] = JSON.parse(
  localStorage.getItem('search') || '[]'
);

function App() {
  const [country, setCountry] = useState<string | null>('us');
  const [postalCode, setPostalCode] = useState<string | null>('90210');
  const [clear, setClear] = useState(false);
  
  const { loading, error, data } = useQuery(GET_ZIPINFO, {
    variables: {
      input: {
        country: country || 'us',
        postalCode: postalCode || '90210',
      },
    },
  });

  const saveRecentSearchs = () => {
    searchs.push({
      country ,
      postalCode,
    });
    localStorage.setItem('search', JSON.stringify(searchs));
  }

  const ZipInfo = {
      country: data?.GetZipInfo?.country as string,
      postalCode: data?.GetZipInfo?.postalCode as string,
      countryAbbreviation: data?.GetZipInfo?.countryAbbreviation as string,
      places: data?.GetZipInfo?.places as [Place],
  };

  return (
    <Box className='App'>
      <Box className='container'>
        <Box className='container-search'>
          <CountrySelect
            onChange={(event: SyntheticEvent, newValue: CountryType | null) => {
              setCountry(newValue?.code || '');
              setPostalCode(newValue?.zip || '');
              saveRecentSearchs();
            }}
          />
          <TextField
            onChange={(event) => {
              setPostalCode(event.target.value);
              saveRecentSearchs();
            }}
            id='outlined-basic'
            label='Zip Code'
            variant='outlined'
          />
        </Box>
        {error && <span>Error: {error?.message}</span>}
        {loading && <CircularColor />}
        <RecentSearchs
          searchs={JSON.parse(localStorage.getItem('search') || '[]')}
          onClear={() => {
            setClear(!clear); 
            searchs = [];
            localStorage.removeItem('search');
          }}
        />
        {!loading && !error && <CountryCard data={ZipInfo} />}
      </Box>
    </Box>
  );
}

export default App;

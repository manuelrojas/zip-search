import { SyntheticEvent, useState } from 'react';
import './App.css';
import CountrySelect, { CountryType } from './components/CountrySelect';
import { useQuery, gql } from '@apollo/client';
import CircularColor from './components/Loading';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Places from './components/Places';

const GET_ZIPINFO = gql`
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

function App() {
  const [country, setCountry] = useState<string | null>('us');
  const [postalCode, setPostalCode] = useState<string | null>('90210');

  const { loading, error, data } = useQuery(GET_ZIPINFO, {
    variables: {
      input: {
        country: country,
        postalCode: postalCode,
      },
    },
  });

  return (
    <div className='App'>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px'
        }}>
          <CountrySelect
            onChange={(event: SyntheticEvent, newValue: CountryType | null) => {
              setCountry(newValue?.code || '');
              setPostalCode(newValue?.zip || '');
            }}
          />
          <TextField
            onChange={(event) => {
              setPostalCode(event.target.value);
            }}
            id='outlined-basic'
            label='Zip Code'
            variant='outlined'
          />
        </div>
          
        {error && <span>Error: {error?.message}</span>}
        {loading && <CircularColor />}
        {!loading && !error && <Box sx={{ minWidth: 275 }}>
          <Card>
            <Typography variant='h3' component='h3'>
              Zippopotam
            </Typography>
            <Divider />
            <Typography color='text.secondary' gutterBottom>
              Country: {data?.GetZipInfo.country}
            </Typography>
            <Typography color='text.secondary' gutterBottom>
              Country Abbreviation: {data?.GetZipInfo.countryAbbreviation}
            </Typography>
            <Typography color='text.secondary' gutterBottom>
              Postal Code: {data?.GetZipInfo.postCode}
            </Typography>
            <Places list={data?.GetZipInfo.places} />
          </Card>
        </Box>}
    </div>
  );
}

export default App;

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

type Place = {
  placeName: string;
  longitude: string;
  state: string;
  latitude: string;
  stateAbbreviation: string;
};

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
      <header className='App-header'>
        <CountrySelect
          onChange={(event: SyntheticEvent, newValue: CountryType | null) => {
            console.log(event);
            setCountry(newValue?.code || '');
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
        {error && <span>Error: {error?.message}</span>}
        {loading && <CircularColor />}
        <Box sx={{ minWidth: 275 }}>
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
            {data?.GetZipInfo?.places?.map((place: Place, index: string) => (
              <div key={index}>
                <Divider />
                <Typography color='text.secondary' gutterBottom>
                  Place Name: {place.placeName}
                </Typography>
                <Typography color='text.secondary' gutterBottom>
                  State: {place.state}
                </Typography>
                <Typography color='text.secondary' gutterBottom>
                  State Abbreviation: {place.stateAbbreviation}
                </Typography>
                <Typography color='text.secondary' gutterBottom>
                  Longitude: {place.longitude}
                </Typography>
                <Typography color='text.secondary' gutterBottom>
                  Latitude: {place.latitude}
                </Typography>
              </div>
            ))}
          </Card>
        </Box>
      </header>
    </div>
  );
}

export default App;

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { Places, Place} from './Places';


export type GetZipInfoProps = {
  data: {
    country: string;
    countryAbbreviation: string;
    postalCode: string;
    places: [Place];
  };
};

export function CountryCard({ data }: GetZipInfoProps) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        <Typography variant='h3' component='h3'>
          Zippopotam
        </Typography>
        <Divider />
        <Typography color='text.secondary' gutterBottom>
          Country: {data?.country}
        </Typography>
        <Typography color='text.secondary' gutterBottom>
          Country Abbreviation: {data?.countryAbbreviation}
        </Typography>
        <Typography color='text.secondary' gutterBottom>
          Postal Code: {data?.postalCode}
        </Typography>
        <Places list={data?.places} />
      </Card>
    </Box>
  );
}




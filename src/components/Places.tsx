import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export type Place = {
  placeName: string;
  longitude: string;
  state: string;
  latitude: string;
  stateAbbreviation: string;
};

type PlacesProps = {
   list: [Place]
}

export default function Places({ list }: PlacesProps) {
    return (
      <>
        {list.map((place: Place, index: number) => (
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
      </>
    );
}
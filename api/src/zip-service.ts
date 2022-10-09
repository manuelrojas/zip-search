import axios from 'axios';
import { gql } from 'apollo-server-express';
const BASE_URL = 'http://api.zippopotam.us';


const getZipInformation = async () => {
  const result = await axios.get(`${BASE_URL}/us/90210`);
  return result.data;
};

export const typeDefs = gql`
  type Place {
    placeName: String
    longitude: String
    state: String
    latitude: String
    stateAbbreviation: String
  }

  type ZipCode {
    country: String
    postCode: String
    countryAbbreviation: String
    places: [Place]
  }

  type Query {
    GetZipInfo: ZipCode
  }
`;

export const resolvers = {
  Query: {
    GetZipInfo: async () => {
      const zipInfo = await getZipInformation();
      console.log('🚀 Raw Data:', zipInfo);
      return {
        ...zipInfo,
        postCode: zipInfo['post code'],
        countryAbbreviation: zipInfo['country abbreviation'],
        places: zipInfo?.places.map((place: { [x: string]: any; }) => ({
          ...place,
          placeName: place['place name'],
          stateAbbreviation: place['state abbreviation'],
        })),
      };
    },
  },
};




 


import axios from 'axios';
import { gql } from 'apollo-server-express';
const BASE_URL = 'http://api.zippopotam.us';


const getZipInformation = async (country: string, postalCode: string) => {
  const result = await axios.get(`${BASE_URL}/${country}/${postalCode}`);
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

  input ZipInputFilter {
    country: String
    postalCode: String
  }

  type Query {
    GetZipInfo(input: ZipInputFilter): ZipCode
  }
`;

export const resolvers = {
  Query: {
    GetZipInfo: async (args: { country: string; postalCode: string; }) => {
      console.log('Args:', args?.country, args?.postalCode);
      const zipInfo = await getZipInformation(args?.country, args?.postalCode);
      console.log('🚀 Raw Data:', zipInfo);
      return {
        ...zipInfo,
        postCode: zipInfo['post code'],
        countryAbbreviation: zipInfo['country abbreviation'],
        places: zipInfo?.places.map((place: { [x: string]: any }) => ({
          ...place,
          placeName: place['place name'],
          stateAbbreviation: place['state abbreviation'],
        })),
      };
    },
  },
};




 


// import {
//   Client,
//   GeocodingAddressComponentType,
// } from '@googlemaps/google-maps-services-js';
// import { GoogleAPIKey } from '../config/googlemap';
import axios from 'axios';

// const client = new Client({});

class MapService {
  // async getZipCode(location: string) {
  //   try {
  //     const response = await client.geocode({
  //       params: {
  //         address: location,
  //         key: GoogleAPIKey.googleMapsApiKey,
  //       },
  //     });
  //     if (response.data.results.length > 0) {
  //       const result = response.data.results[0];
  //       const postalCode = result.address_components.find((component) =>
  //         component.types.includes(
  //           'postal_code' as GeocodingAddressComponentType
  //         )
  //       );
  //       return postalCode ? postalCode.long_name : 'No ZIP code found';
  //     }
  //   } catch (error) {
  //     console.log('---->>', error);
  //   }
  // }

  // async distanceCalculation(pickup: string, destination: string) {
  //   const response = await client.distancematrix({
  //     params: {
  //       origins: [pickup],
  //       destinations: [destination],
  //       key: GoogleAPIKey.googleMapsApiKey,
  //     },
  //   });
  //   if (
  //     response.data.rows.length > 0 &&
  //     response.data.rows[0].elements.length > 0
  //   ) {
  //     const element = response.data.rows[0].elements[0];

  //     if (element.status === 'OK') {
  //       return {
  //         distance: element.distance.text, // Distance in human-readable format (e.g., "15.6 km")
  //         distanceValue: element.distance.value, // Distance in meters
  //         duration: element.duration.text, // Duration in human-readable format (e.g., "18 mins")
  //         durationValue: element.duration.value, // Duration in seconds
  //       };
  //     } else {
  //       return { error: `Unable to calculate distance: ${element.status}` };
  //     }
  //   }
  //   return { error: 'No results found for the given locations' };
  // }

  async getLocationDetails(
    pickupLocation: string,
    destinationLocation: string
  ) {
    console.log(new Date());

    try {
      const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
      const pickupResponse = await axios.get(`${NOMINATIM_BASE_URL}/search`, {
        params: {
          q: pickupLocation,
          format: 'json',
          addressdetails: 1,
          limit: 1,
        },
      });
      const pickupData = pickupResponse.data[0];
      const pickupLatitude = parseFloat(pickupData.lat);
      const pickupLongitude = parseFloat(pickupData.lon);
      const pickupPostcode = pickupData.address.postcode || 'N/A';

      const destinationResponse = await axios.get(
        `${NOMINATIM_BASE_URL}/search`,
        {
          params: {
            q: destinationLocation,
            format: 'json',
            addressdetails: 1,
            limit: 1,
          },
        }
      );
      const destinationData = destinationResponse.data[0];
      const destinationLatitude = parseFloat(destinationData.lat);
      const destinationLongitude = parseFloat(destinationData.lon);
      const destinationPostcode = destinationData.address.postcode || 'N/A';

      const distance = await this.calculateDistance(
        pickupLatitude,
        pickupLongitude,
        destinationLatitude,
        destinationLongitude
      );
      console.log(new Date());

      return {
        pickup: JSON.stringify({
          latitude: pickupLatitude,
          longitude: pickupLongitude,
        }),
        destination: JSON.stringify({
          latitude: destinationLatitude,
          longitude: destinationLongitude,
        }),
        distance,
        pickupPostcode,
        destinationPostcode,
      };
    } catch (error) {
      console.log('----::', error);
      throw error;
    }
  }

  async calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
    const R = 6371;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}

const mapService = new MapService();
export default mapService;

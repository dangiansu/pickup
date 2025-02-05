import { Request, Response } from 'express';
import { success, badRequest, internalServer } from '../helpers/response';
import mapService from '../services/geocoding.service';
import carpricingService from '../services/carpricing.service';
import userService from '../services/auth.service';
import { BOOKING_TYPES, ROLES, ZipCode } from '../helpers/constant';
import { getPassword } from '../helpers/encrypt';
import commonServices from '../services/common.service';
import tripService from '../services/booking.service';
import { statusCode } from '../config/statuscode';
import stripeService from '../services/stripe.service';

class TripController {
  // async create(req: Request, res: Response) {
  //   try {
  //     const payload = req.body;
  //     const { pickup_location, destination_location } = payload;
  //     const details = await getZipCode.getLocationDetails(
  //       pickup_location,
  //       destination_location
  //     );
  //     const checkZipCode = await commonServices.findziptype(
  //       details.pickupPostcode,
  //       details.destinationPostcode
  //     );
  //     const carPrice = await carpricingService.getbyId(payload.car_id);
  //     const checkUser = await userService.findOneByEmail(payload.email);
  //     if ((payload.isRoundTrip = true)) {
  //     } else {
  //     }
  //     if (
  //       checkZipCode.destinationZipType == ZipCode.CITYCENTER &&
  //       checkZipCode.pickupZipType == ZipCode.CITYCENTER
  //     ) {
  //       if (payload.email) {
  //         if (!checkUser) {
  //           const userdata = {
  //             first_name: payload.first_name,
  //             last_name: payload.last_name,
  //             mobile_number: payload.mobile_number,
  //             email: payload.email,
  //             password: getPassword(),
  //             role: ROLES.USER,
  //           };
  //           const Userdetails = await userService.create(userdata);
  //           if (Userdetails) {
  //             const data = {
  //               pickup_location: payload.pickup_location,
  //               destination_location: payload.destination_location,
  //               pickup_lat_long: JSON.parse(details.pickup),
  //               destination_lat_long: JSON.parse(details.destination),
  //               pickup_date: payload.pickup_date,
  //               pickup_time: payload.pickup_time,
  //               adults: payload.adults,
  //               childs: payload.childs,
  //               bags: payload.bags,
  //               flight_number: payload.flight_number,
  //               terminal_number: payload.terminal_number,
  //               addition_notes: payload.addition_notes,
  //               total_amount: carPrice?.total_price || 100,
  //               user_id: Userdetails?.id,
  //             };
  //             const tripDeatails = await tripService.create(data);
  //           }
  //         } else {
  //           const data = {
  //             pickup_location: payload.pickup_location,
  //             destination_location: payload.destination_location,
  //             pickup_lat_long: JSON.parse(details.pickup),
  //             destination_lat_long: JSON.parse(details.destination),
  //             pickup_date: payload.pickup_date,
  //             pickup_time: payload.pickup_time,
  //             adults: payload.adults,
  //             childs: payload.childs,
  //             bags: payload.bags,
  //             flight_number: payload.flight_number,
  //             terminal_number: payload.terminal_number,
  //             addition_notes: payload.addition_notes,
  //             total_amount: carPrice?.total_price || 100,
  //             user_id: checkUser?.id,
  //           };
  //           await tripService.create(data);
  //         }
  //       }
  //     } else if (
  //       (checkZipCode.pickupZipType == ZipCode.CITYCENTER &&
  //         checkZipCode.destinationZipType == ZipCode.AIRPORTBUSTRAIN) ||
  //       (checkZipCode.pickupZipType == ZipCode.AIRPORTBUSTRAIN &&
  //         checkZipCode.destinationZipType == ZipCode.CITYCENTER)
  //     ) {
  //     }
  //   } catch (error) {
  //     internalServer(res, req.body, (error as Error).message);
  //   }
  // }
  // async customer(req: Request, res: Response) {
  //   try {
  //     const payload = req.body;
  //     const { pickup_location, destination_location } = payload;
  //     const details = await getZipCode.getLocationDetails(
  //       pickup_location,
  //       destination_location
  //     );
  //     const checkZipCode = await commonServices.findziptype(
  //       details.pickupPostcode,
  //       details.destinationPostcode
  //     );
  //     if ((payload.is_round_trip = true)) {
  //       const data = {};
  //       if (
  //         checkZipCode.pickupZipType !== null ||
  //         checkZipCode.destinationZipType !== null
  //       ) {
  //         if (
  //           checkZipCode.pickupZipType == ZipCode.CITYCENTER &&
  //           checkZipCode.destinationZipType == ZipCode.CITYCENTER
  //         ) {
  //         }
  //         if (
  //           (checkZipCode.pickupZipType == ZipCode.CITYCENTER &&
  //             checkZipCode.destinationZipType == ZipCode.AIRPORTBUSTRAIN) ||
  //           (checkZipCode.pickupZipType == ZipCode.AIRPORTBUSTRAIN &&
  //             checkZipCode.destinationZipType == ZipCode.CITYCENTER)
  //         ) {
  //         }
  //         if (
  //           checkZipCode.pickupZipType == ZipCode.AIRPORTBUSTRAIN &&
  //           checkZipCode.destinationZipType == ZipCode.AIRPORTBUSTRAIN
  //         ) {
  //         }
  //       }
  //     } else {
  //     }
  //   } catch (error) {
  //     internalServer(res, req.body, (error as Error).message);
  //   }
  // }

  // async calculateCarPrice(req: Request, res: Response) {
  //   try {
  //     const payload = req.body;
  //     const locations = await mapService.getLocationDetails(
  //       payload.pickup_location,
  //       payload.destination_location
  //     );
  //     const { pickupPostcode, destinationPostcode, distance } = locations;

  //     const checkZipCode = await commonServices.findziptype(
  //       pickupPostcode,
  //       destinationPostcode
  //     );
  //     const carFixedPrice = await carpricingService.getbyId(payload.car_id);
  //     if (!carFixedPrice) {
  //       return badRequest(res, statusCode.BAD_REQUEST, 'Price not defined');
  //     }
  //     const { pickupZipType, destinationZipType } = checkZipCode;
  //     let total_price = 0;

  //     if (pickupZipType !== null && destinationZipType !== null) {
  //       if (
  //         destinationZipType == ZipCode.CITYCENTER &&
  //         pickupZipType == ZipCode.CITYCENTER
  //       ) {
  //         total_price = carFixedPrice.total_price;
  //       } else if (
  //         (pickupZipType == ZipCode.CITYCENTER &&
  //           destinationZipType == ZipCode.AIRPORTBUSTRAIN) ||
  //         (pickupZipType == ZipCode.AIRPORTBUSTRAIN &&
  //           destinationZipType == ZipCode.CITYCENTER) ||
  //         (pickupZipType === ZipCode.AIRPORTBUSTRAIN &&
  //           destinationZipType === ZipCode.AIRPORTBUSTRAIN)
  //       ) {
  //         total_price = carFixedPrice.distance_km * distance + 10;
  //       }
  //     } else {
  //       total_price = carFixedPrice.distance_km * distance + 100;
  //     }
  //     return success(
  //       res,
  //       statusCode.SUCCESS,
  //       { total_price },
  //       'Car price for this ride'
  //     );
  //   } catch (error) {
  //     return internalServer(res, req.body, (error as Error).message);
  //   }
  // }

  // async calculateallcarPrice(req: Request, res: Response) {
  //   try {
  //     const payload = req.body;

  //     const locations = await mapService.getLocationDetails(
  //       payload.pickup_location,
  //       payload.destination_location
  //     );
  //     const { pickupPostcode, destinationPostcode, distance } = locations;

  //     const checkZipCode = await commonServices.findziptype(
  //       pickupPostcode,
  //       destinationPostcode
  //     );

  //     const carFixedPrice = await carpricingService.getall();
  //     if (!carFixedPrice) {
  //       return badRequest(res, statusCode.BAD_REQUEST, 'Price not defined');
  //     }

  //     const carPricingResponse = [];

  //     for (let car of carFixedPrice) {
  //       let total_price = 0;

  //       if (
  //         checkZipCode.pickupZipType !== null &&
  //         checkZipCode.destinationZipType !== null
  //       ) {
  //         if (
  //           checkZipCode.destinationZipType === ZipCode.CITYCENTER &&
  //           checkZipCode.pickupZipType === ZipCode.CITYCENTER
  //         ) {
  //           total_price = car.total_price;
  //         } else if (
  //           (checkZipCode.pickupZipType === ZipCode.CITYCENTER &&
  //             checkZipCode.destinationZipType === ZipCode.AIRPORTBUSTRAIN) ||
  //           (checkZipCode.pickupZipType === ZipCode.AIRPORTBUSTRAIN &&
  //             checkZipCode.destinationZipType === ZipCode.CITYCENTER) ||
  //           (checkZipCode.pickupZipType === ZipCode.AIRPORTBUSTRAIN &&
  //             checkZipCode.destinationZipType === ZipCode.AIRPORTBUSTRAIN)
  //         ) {
  //           total_price = car.distance_km * distance + 10;
  //         } else {
  //           total_price = car.distance_km * distance + 100;
  //         }
  //       } else {
  //         total_price = car.distance_km * distance + 100;
  //       }

  //       carPricingResponse.push({
  //         car_id: car.id,
  //         car_type: car.car_type,
  //         adulte: car.adulte,
  //         childe: car.childe,
  //         bags: car.bags,
  //         total_price: total_price,
  //       });
  //     }

  //     return success(
  //       res,
  //       statusCode.SUCCESS,
  //       carPricingResponse,
  //       'Car prices for this ride'
  //     );
  //   } catch (error) {
  //     return internalServer(res, req.body, (error as Error).message);
  //   }
  // }

  async calculateallcarPrice(req: Request, res: Response) {
    try {
      const payload = req.body;

      const [locations, carFixedPrice] = await Promise.all([
        mapService.getLocationDetails(
          payload.pickup_location,
          payload.destination_location
        ),
        carpricingService.getall(),
      ]);

      const { pickupPostcode, destinationPostcode, distance } = locations;

      const checkZipCode = await commonServices.findziptype(
        pickupPostcode,
        destinationPostcode
      );

      if (!carFixedPrice) {
        return badRequest(res, statusCode.BAD_REQUEST, 'Price not defined');
      }

      const pickupType = checkZipCode.pickupZipType;
      const destinationType = checkZipCode.destinationZipType;

      const carPricingResponse = await Promise.all(
        carFixedPrice.map(async (car) => {
          let total_price = 0;

          if (pickupType !== null && destinationType !== null) {
            if (
              pickupType === ZipCode.CITYCENTER &&
              destinationType === ZipCode.CITYCENTER
            ) {
              total_price = car.total_price;
            } else if (
              (pickupType === ZipCode.CITYCENTER &&
                destinationType === ZipCode.AIRPORTBUSTRAIN) ||
              (pickupType === ZipCode.AIRPORTBUSTRAIN &&
                destinationType === ZipCode.CITYCENTER) ||
              (pickupType === ZipCode.AIRPORTBUSTRAIN &&
                destinationType === ZipCode.AIRPORTBUSTRAIN)
            ) {
              total_price = car.distance_km * distance + 10;
            } else {
              total_price = car.distance_km * distance + 100;
            }
          } else {
            total_price = car.distance_km * distance + 100;
          }

          return {
            car_id: car.id,
            car_type: car.car_type,
            adulte: car.adulte,
            childe: car.childe,
            bags: car.bags,
            total_price: total_price,
          };
        })
      );

      return success(
        res,
        statusCode.SUCCESS,
        carPricingResponse,
        'Car prices for this ride'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        data,
        email,
        first_name,
        last_name,
        mobile_number,
        payment_method_id,
      } = req.body;

      let user = await userService.findOneByEmail(email);
      console.log('User:', user);

      if (!user) {
        const userDetails = {
          first_name,
          last_name,
          email,
          mobile_number,
          password: getPassword(),
          role: ROLES.USER,
          payment_method_id,
        };
        user = await userService.create(userDetails);
      }
      const stripeDeatils = await stripeService.createOrGetStripeCustomer(
        email,
        payment_method_id
      );
      console.log('stripeDetails', stripeDeatils);
      // Handle trip creation based on booking type
      if (data[0].is_round_trip && data[1].is_round_trip) {
        data[0].booking_type = BOOKING_TYPES.RETURN;
        data[1].booking_type = BOOKING_TYPES.RETURN;
        data[0].user_id = user.id;
        data[1].user_id = user.id;
        await tripService.bulkcreate(data);
      } else {
        data[0].user_id = user.id;
        await tripService.create(data[0]);
      }

      // Return success response
      return success(
        res,
        statusCode.SUCCESS,
        undefined,
        'Trip created successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async getallride(req: Request, res: Response) {
    try {
      const {
        Search,
        Pickup_Date,
        Pickup_Time,
        Payment_status,
        Status,
        Limit,
        Page,
      } = req.query;
      const pagination = {
        Search: Search ? String(Search) : undefined,
        Pickup_Date: Pickup_Date ? new Date(Pickup_Date as string) : undefined,
        // Pickup_Time: Pickup_Time ? new Date(Pickup_Time as string) : undefined,
        // Payment_Status: Payment_status ? Payment_status === 'true' : undefined,
        // Boking_Status: Status ? Status === 'true' : undefined,
        Page: typeof Page === 'undefined' ? 1 : Number(Page),
        Limit: typeof Limit === 'undefined' ? 10 : Number(Limit),
      };
      const data = await tripService.getall(pagination);
      if (!data) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found trip data');
      }
      success(res, statusCode.SUCCESS, data, 'Get data successfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }
}

const tripController = new TripController();
export default tripController;

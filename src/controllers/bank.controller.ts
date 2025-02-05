import { Request, Response } from 'express';
import { statusCode } from '../config/statuscode';
import bankService from '../services/bank.service';
import { badRequest, internalServer, success } from '../helpers/response';
import agencyService from '../services/agency.service';
import { stripe } from '../config/stripConfig';

class BankController {
  async create(req: Request, res: Response) {
    try {
      const { user_id } = req.body;
      const AgencyData = await agencyService.getbyuserid(user_id);
      const bankdata = {
        agency_id: AgencyData?.id,
        account_type: req.body.account_type,
        account_number: req.body.account_number,
        account_holder_name: req.body.account_holder_name,
        routing_number: req.body.routing_number,
        bank_list_id: req.body.bank_list_id,
      };
      const data = await bankService.create(bankdata);
      if (!data) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(res, statusCode.CREATED, data, 'create sucussfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async getall(req: Request, res: Response) {
    try {
      const data = await bankService.getall();
      if (!data) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(res, statusCode.CREATED, data, 'create sucussfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async getbyid(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await bankService.getbyid(id);
      if (!data) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(res, statusCode.CREATED, data, 'get data sucussfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async update(req: Request, res: Response) {
    try {
    } catch (error) {}
  }

  async delete(req: Request, res: Response) {
    try {
    } catch (error) {}
  }

  async createAccountin(req: Request, res: Response) {
    try {
      // const { user_id } = req.body;
      const {
        user_id,
        account_type,
        account_number,
        account_holder_name,
        routing_number,
      } = req.body;

      // Step 1: Fetch agency data based on the user_id
      const AgencyData = await agencyService.getbyuserid(user_id);
      if (!AgencyData) {
        return badRequest(res, 400, 'Agency not found');
      }
      console.log('----:', AgencyData);
      const stripeAccount = await stripe.accounts.create({
        type: 'custom',
        business_type: 'company',
        business_profile: {
          name: AgencyData.first_name,
          url: 'https://chat.deepseek.com/',
        },
        email: AgencyData.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });
      console.log('--:::', stripeAccount);

      // Step 3: Attach Bank Account to the Stripe Account
      const bankAccount = await stripe.accounts.createExternalAccount(
        stripeAccount.id,
        {
          external_account: {
            object: 'bank_account',
            country: 'US', // Adjust as needed
            currency: 'usd', // Adjust as needed
            account_holder_name,
            account_holder_type: account_type, // 'individual' or 'company'
            routing_number,
            account_number,
          },
        }
      );

      //    // Save Stripe account ID to the Agency table
      // AgencyData.strip_account_id = stripeAccount.id;
      // await AgencyData.save();
      // const bankData = {
      //   agency_id: AgencyData.id,
      //   stripe_account_id: stripeAccount.id,
      //   stripe_bank_account_id: bankAccount.id,
      //   bank_name, // Storing bank name
      // };

      // const data = await bankService.create(bankData);
      // if (!data) {
      //   return badRequest(res, statusCode.BAD_REQUEST, 'Failed to store bank data');
      // }

      return success(
        res,
        statusCode.CREATED,
        bankAccount,
        'Account created successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }
}

const bankcontroller = new BankController();

export default bankcontroller;

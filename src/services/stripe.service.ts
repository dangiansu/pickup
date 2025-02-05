import { stripe } from '../config/stripConfig';

class StripeService {
  async createOrGetStripeCustomer(email: string, payment_method_id: string) {
    try {
      const existingCustomers = await stripe.customers.list({
        email,
        limit: 1,
      });

      console.log('Stripe Customers:', existingCustomers);

      if (existingCustomers.data.length > 0) {
        // Customer exists
        console.log('Customer already exists:', existingCustomers.data[0].id);
        return existingCustomers.data[0];
      } else {
        // Customer does not exist, create a new one
        const newCustomer = await stripe.customers.create({
          email,
          payment_method: payment_method_id,
          invoice_settings: {
            default_payment_method: payment_method_id,
          },
        });
        console.log('New customer created:', newCustomer.id);
        return newCustomer;
      }
    } catch (error) {
      console.error('Error handling Stripe customer:', error);
      throw error;
    }
  }
}

const stripeService = new StripeService();
export default stripeService;

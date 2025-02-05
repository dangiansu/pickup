import Stripe from 'stripe';
import { CONFIG } from './dotenv';

export const stripe = new Stripe(CONFIG.STRIPE_KEY as string, {
  apiVersion: '2025-01-27.acacia',
});

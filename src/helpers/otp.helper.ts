export function generateOTP(): number {
  return Math.floor(100000 + Math.random() * 900000);
}

export function calculateOTPExpiry(minutes: number): Date {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + minutes);
  return expiry;
}

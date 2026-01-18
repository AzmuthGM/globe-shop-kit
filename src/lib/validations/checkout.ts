import { z } from 'zod';

// Phone number validation - allows international formats
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const checkoutSchema = z.object({
  // Contact Information
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  // Shipping Address
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'First name contains invalid characters'),
  
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Last name contains invalid characters'),
  
  address: z
    .string()
    .trim()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters'),
  
  apartment: z
    .string()
    .trim()
    .max(50, 'Apartment must be less than 50 characters')
    .optional()
    .or(z.literal('')),
  
  city: z
    .string()
    .trim()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters'),
  
  state: z
    .string()
    .min(1, 'Please select a state'),
  
  zip: z
    .string()
    .trim()
    .min(3, 'ZIP code must be at least 3 characters')
    .max(20, 'ZIP code must be less than 20 characters')
    .regex(/^[a-zA-Z0-9\s-]+$/, 'ZIP code contains invalid characters'),
  
  country: z
    .string()
    .min(1, 'Please select a country'),
  
  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .regex(phoneRegex, 'Please enter a valid phone number (e.g., +1234567890)')
    .or(
      z.string().trim().min(10, 'Phone number must be at least 10 digits').max(20, 'Phone number is too long')
    ),
  
  // Options
  createAccount: z.boolean().optional().default(false),
  shippingMethod: z.enum(['standard', 'express']).default('standard'),
  paymentMethod: z.enum(['stripe', 'paypal']).default('stripe'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Sanitize string input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();
};

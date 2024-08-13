import { z } from 'zod';


const IdSchema = z.object({
  id: z.number(),
})

export const PersonalContactPhoneSchema = z.object({
  number: z.string().min(1),
  type: z.string().min(1),
});
export const PersonalContactPhoneEditSchema = z.object({
  number: z.string().min(1),
  type: z.string().min(1),
  id: z.number(),
});
export const PersonalContactPhoneDeleteSchema = z.object({
  id: z.number()
});

export const PersonalContactAddressSchema = z.object({
  address: z.string(),
  type: z.string(),
  typeValue: z.string(),
  city: z.string(),
  state: z.string(),
  county: z.string(),
  zipCode: z.string(),
  province: z.string(),
  postalCode: z.string(),
  country: z.string(),
  inCareOf: z.string(),
  from: z.string(),
  to: z.string(),
  currentPhysicalAddress: z.boolean(),
  previousAddress: z.boolean(),
  mailingAddress: z.boolean(),
  safeMailingAddress: z.boolean(),
  foreignAddress: z.boolean(),
  intendedAddress: z.boolean(),
  investmentProperty: z.boolean(),
  shareWithSpouse: z.boolean(),
  recentlyFearedPersecution: z.boolean(),
  recentForeignAddress: z.boolean(),
  mostRecentForeignAddress: z.boolean(),
})

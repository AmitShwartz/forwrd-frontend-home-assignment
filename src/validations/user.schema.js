import { z } from 'zod';
import validCountries from '../data/countries.json';
import {
  COUNTRY_REQUIRED,
  EMAIL_INVALID,
  EMAIL_REQUIRED,
  NAME_INVALID,
  NAME_REQUIRED,
  PHONE_INVALID,
  PHONE_REQUIRED,
} from '../utils/strings.utils';

export const emailSchema = z.string().min(1, EMAIL_REQUIRED).email(EMAIL_INVALID);
export const nameSchema = z
  .string()
  .min(1, NAME_REQUIRED)
  .regex(/^[a-zA-Z\s]+$/, NAME_INVALID);
export const phoneSchema = z.string(PHONE_REQUIRED).regex(/^\+\d{0,12}$/, PHONE_INVALID);
export const phoneBlurSchema = z
  .string()
  .min(1, PHONE_REQUIRED)
  .regex(/^\+\d{12}$/, PHONE_INVALID);
export const countrySchema = z.enum(validCountries, {
  errorMap: () => ({ message: COUNTRY_REQUIRED }),
});

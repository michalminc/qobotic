import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const partnerRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().min(1, "Company name is required"),
  taxId: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
});

const robotTypeEnum = z.enum(["Humanoid", "Quadruped", "Reception", "Industrial"]);

export const createRobotSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  type: robotTypeEnum,
  brand: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  deliveryDays: z.number().int().optional(),
  dof: z.number().int().optional(),
  torque: z.number().int().optional(),
  speed: z.number().int().min(0).max(100).optional(),
  strength: z.number().int().min(0).max(100).optional(),
  aiLevel: z.number().int().min(0).max(100).optional(),
  weight: z.number().optional(),
  batteryLife: z.number().optional(),
  warranty: z.number().int().optional(),
  rentalPrice: z.number().int().min(0, "Rental price must be >= 0"),
  buyPrice: z.number().int().min(0, "Buy price must be >= 0"),
  subscriptionPrice: z.number().int().optional(),
  published: z.boolean().optional(),
  images: z.array(z.string()).optional(),
});

export const updateRobotSchema = createRobotSchema.partial();

const orderTypeEnum = z.enum(["BUY", "RENT", "SUBSCRIBE"]);
const subscriptionPlanEnum = z.enum(["MONTHLY", "QUARTERLY", "ANNUAL"]);

export const createOrderSchema = z.object({
  robotId: z.string().min(1, "Robot ID is required"),
  type: orderTypeEnum,
  plan: subscriptionPlanEnum.optional(),
  days: z.number().int().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  skills: z.array(z.string()).optional(),
  shippingFirstName: z.string().optional(),
  shippingLastName: z.string().optional(),
  shippingCompany: z.string().optional(),
  shippingEmail: z.string().email().optional(),
  shippingPhone: z.string().optional(),
  shippingAddress: z.string().optional(),
  shippingCity: z.string().optional(),
  shippingZip: z.string().optional(),
  shippingCountry: z.string().optional(),
});

export const updatePartnerProfileSchema = z.object({
  companyName: z.string().optional(),
  legalName: z.string().optional(),
  taxId: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  accountHolder: z.string().optional(),
  iban: z.string().optional(),
  bic: z.string().optional(),
  payoutSchedule: z.string().optional(),
  minPayout: z.number().int().optional(),
});

export const sendMessageSchema = z.object({
  text: z.string().min(1, "Message cannot be empty").max(5000, "Message too long"),
});

export const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  text: z.string().max(2000, "Review too long").optional(),
});

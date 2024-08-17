import { z } from 'zod';


export const IdSchema = z.object({
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

export const PersonalContactStaySchema = z.object({
  dateOfEntry: z.string(),
  number_1_94: z.string(),
  portOfEntry: z.string(),
  cityOfEntry: z.string(),
  stateOfEntry: z.string(),
  classOfAdmission: z.string(),
  mannerOfEntry: z.string(),
  statusAfterAdmission: z.string(),
  dateStatusWasGranted: z.string(),
  dateStatusExpires: z.string(),
  authorizedStayExpiry: z.string(),
  purposeOfStay: z.string(),
  modeOfTravel: z.string(),
  passportNumber: z.string(),
  travelDocumentNumber: z.string(),
  passport_travelDocCountry: z.string(),
  passport_travelDocIssued: z.string(),
  passport_travelDocExpires: z.string(),
  cityOfResidenceInUs: z.string(),
  firstNameUsed: z.string(),
  middleNameUsed: z.string(),
  lastNameUsed: z.string(),
  cityOfExit: z.string(),
  stateOfExit: z.string(),
  dateOfExit: z.string(),
  mostRecentEntry: z.boolean(),
  plannedStay: z.boolean(),
  onH_LStatus: z.boolean(),
  onRStatus: z.boolean(),
  grantedDurationOfStatus: z.boolean()
})

export const PersonalContactTripsAbroadSchema = z.object({
  departureDate: z.string(),
  departureCity: z.string(),
  departureState: z.string(),
  ReturnDate: z.string(),
  ReturnCity: z.string(),
  ReturnState: z.string(),
  countriesVisited: z.string(),
  meansOfTransport: z.string(),
  tripPurpose: z.string(),
  inspectedToReturnUS: z.boolean(),
})
export const PersonalContactProceedingSchema = z.object({
  locationCity: z.string(),
  locationState: z.string(),
  dateStarted: z.string(),
  dateEnded: z.string(),
  office: z.string(),
  status: z.string(),
  current: z.boolean(),
  hearing: z.boolean(),
  removal: z.boolean(),
  exclusion: z.boolean(),
  deportation: z.boolean(),
  rescission: z.boolean(),
  otherJudicial: z.boolean(),
})
export const PersonalContactPetitionSchema = z.object({
  cityFilled: z.string(),
  stateFilled: z.string(),
  provinceFilled: z.string(),
  countryFilled: z.string(),
  officeFilled: z.string(),
  dateFilled: z.string(),
  cityGranted: z.string(),
  stateGranted: z.string(),
  provinceGranted: z.string(),
  officeGranted: z.string(),
  dateGranted: z.string(),
  receiptNumber: z.string(),
  result: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  nonImigrantVisa: z.boolean(),
  imigrantVisa: z.boolean(),
  affidavitOfSupport: z.boolean(),
  advancePermissionToEnter: z.boolean(),
  asyleeStatus: z.boolean(),
  refugeeStatus: z.boolean(),
  employmentAuthorization: z.boolean(),
  reentryPermit: z.boolean(),
  refugeeTravelDocument: z.boolean(),
})


export const PersonalContactFamily_FatherSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  email: z.string(),
  relationType: z.string(),
  liveTogetherSince: z.string(),
  liveTogetherUntil: z.string(),
  DependentStatus: z.string(),
  householdMember: z.boolean(),
  headOfHousehold: z.boolean(),
  derivativeApplicant: z.boolean(),
  principalApplicant: z.boolean(),
})

export const PersonalContactFamily_MotherSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  email: z.string(),
  relationType: z.string(),
  liveTogetherSince: z.string(),
  liveTogetherUntil: z.string(),
  DependentStatus: z.string(),
  householdMember: z.boolean(),
  headOfHousehold: z.boolean(),
  derivativeApplicant: z.boolean(),
  principalApplicant: z.boolean(),
})
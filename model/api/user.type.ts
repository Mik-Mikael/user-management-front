export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  idCard: string;
  dateOfBirth: string;
  position: string;
  role: string;
  startDate: string;
  endDate: string;
  email: string;
  phoneNumber: string;
}

export enum ValidateDuplicateType {
  PHONE_NUMBER='PHONE_NUMBER',
  EMAIL='EMAIL',
  ID_CARD='ID_CARD'
}

export interface UserForm {  
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

export interface UserUpdateForm extends UserForm {
    id: string;
}
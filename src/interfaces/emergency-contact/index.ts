import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface EmergencyContactInterface {
  id?: string;
  name: string;
  phone_number: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface EmergencyContactGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  phone_number?: string;
  user_id?: string;
}

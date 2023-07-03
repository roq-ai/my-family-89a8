import axios from 'axios';
import queryString from 'query-string';
import { EmergencyContactInterface, EmergencyContactGetQueryInterface } from 'interfaces/emergency-contact';
import { GetQueryInterface } from '../../interfaces';

export const getEmergencyContacts = async (query?: EmergencyContactGetQueryInterface) => {
  const response = await axios.get(`/api/emergency-contacts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEmergencyContact = async (emergencyContact: EmergencyContactInterface) => {
  const response = await axios.post('/api/emergency-contacts', emergencyContact);
  return response.data;
};

export const updateEmergencyContactById = async (id: string, emergencyContact: EmergencyContactInterface) => {
  const response = await axios.put(`/api/emergency-contacts/${id}`, emergencyContact);
  return response.data;
};

export const getEmergencyContactById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/emergency-contacts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEmergencyContactById = async (id: string) => {
  const response = await axios.delete(`/api/emergency-contacts/${id}`);
  return response.data;
};

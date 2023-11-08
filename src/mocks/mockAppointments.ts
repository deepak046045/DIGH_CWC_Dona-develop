import { Appointment } from '@/models/Appointment';
import { AppointmentTypes } from '@/shared/enums/AppointmentTypes';

const mockAppointments: Appointment[] = [
  {
    id: '1',
    date: new Date('2023-11-15T23:30:00.000Z'),
    address: '11700 N. Meridian Street, Carmel, IN 46032',
    type: {
      name: AppointmentTypes.INFUSION,
      count: 2,
    },
    carePartners: [
      { id: '1', name: 'Henry' },
      { id: '2', name: 'Charlotte' },
    ],
  },
  {
    id: '3',
    date: new Date('2024-03-30T11:00:00.000Z'),
    address: '11700 N. Meridian Street,Carmel, IN 46032',
    type: {
      name: AppointmentTypes.NEUROLOGIST,
    },
    carePartners: [
      { id: '1', name: 'Henry' },
      { id: '2', name: 'Charlotte' },
    ],
  },
  {
    id: '2',
    date: new Date('2024-05-15T09:00:00.000Z'),
    address: '11700 N. Meridian Street,Carmel, IN 46032',
    type: {
      name: AppointmentTypes.SAFETY_MRI,
    },
    carePartners: [
      { id: '1', name: 'Henry' },
      { id: '2', name: 'Charlotte' },
      { id: '4', name: 'Brian' },
      { id: '5', name: 'Cousin Mary' },
    ],
  },
  {
    id: '4',
    date: new Date('2024-06-12T13:00:00.000Z'),
    address: '11700 N. Meridian Street,Carmel, IN 46032',
    type: {
      name: AppointmentTypes.INFUSION,
      count: 3,
    },
    carePartners: [
      { id: '1', name: 'Henry' },
      { id: '2', name: 'Charlotte' },
    ],
  },
  {
    id: '5',
    date: new Date('2023-09-10T15:30:00.000Z'),
    address: '11700 N. Meridian Street,Carmel, IN 46032',
    type: {
      name: AppointmentTypes.GENERAL_DOCTOR,
    },
    carePartners: [{ id: '3', name: 'Dr. Bretz' }],
  },
  {
    id: '6',
    date: new Date('2023-10-10T15:30:00.000Z'),
    address: 'Dr Joe on Main St',
    type: {
      name: AppointmentTypes.INFUSION,
      count: 1,
    },
    carePartners: [
      { id: '1', name: 'Henry' },
      { id: '2', name: 'Charlotte' },
    ],
  },
];

export default mockAppointments;

'use client';

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react';
import {
  NavigationOption,
  ungatedNavigationOptions,
} from '@/models/NavigationOptions';
import { Appointment } from '@/models/Appointment';
import { AlertType } from '@/models/AlertType';
import mockAppointments from '@/mocks/mockAppointments';
import { CarePartner } from '@/models/CarePartner';
import { mockCarePartners } from '@/mocks/mockCarePartners';

type UserContextDataType = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  activeView: NavigationOption;
  setActiveView: Dispatch<NavigationOption>;
  alert: AlertType;
  setAlert: Dispatch<SetStateAction<AlertType>>;
  appointments: Appointment[];
  setAppointments: Dispatch<SetStateAction<Appointment[]>>;
  carePartners: CarePartner[];
  setCarePartners: Dispatch<SetStateAction<CarePartner[]>>;
};

export const UserContext = createContext<UserContextDataType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  activeView: ungatedNavigationOptions[0],
  setActiveView: () => {},
  alert: { isOpen: false, message: '', level: '' },
  setAlert: () => {},
  appointments: mockAppointments,
  setAppointments: () => {},
  carePartners: mockCarePartners,
  setCarePartners: () => {},
});

type Props = {
  children: ReactNode;
};

export function UserContextProvider({ children }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<NavigationOption>(
    ungatedNavigationOptions[0]
  );
  const [alert, setAlert] = useState<AlertType>({
    isOpen: false,
    message: '',
    level: '',
  });
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [carePartners, setCarePartners] =
    useState<CarePartner[]>(mockCarePartners);

  const values = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      activeView,
      setActiveView,
      alert,
      setAlert,
      appointments,
      setAppointments,
      carePartners,
      setCarePartners,
    }),
    [isLoggedIn, activeView, alert, appointments, carePartners]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

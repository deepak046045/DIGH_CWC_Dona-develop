export type NavigationOption = {
  title: string;
  path: string;
};

export const NavigationOptions: Record<string, NavigationOption> = {
  TreatmentMap: {
    title: 'Treatment map',
    path: '/treatmentMap',
  },
  WhatToExpect: {
    title: 'What to expect',
    path: '/whatToExpect',
  },
  MyTreatmentPlan: {
    title: 'My treatment plan',
    path: '/myTreatmentPlan',
  },
  MyAppointments: {
    title: 'My appointments',
    path: '/myAppointments',
  },
  AddAppointment: {
    title: 'Add appointment',
    path: '/addAppointment',
  },
  MyCarePartners: {
    title: 'My care partners',
    path: '/myCarePartners',
  },
  MyProfile: {
    title: 'My profile',
    path: '/myProfile',
  },
};

export const gatedNavigationOptions: NavigationOption[] = [
  NavigationOptions.MyTreatmentPlan,
  NavigationOptions.MyAppointments,
  NavigationOptions.MyCarePartners,
  NavigationOptions.WhatToExpect,
];

export const ungatedNavigationOptions: NavigationOption[] = [
  NavigationOptions.TreatmentMap,
  NavigationOptions.WhatToExpect,
];

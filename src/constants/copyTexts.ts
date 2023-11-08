import mockUserData from '@/mocks/mockUserData.json';
import { AppointmentTypes } from '@/shared/enums/AppointmentTypes';

export const copyTexts = {
  WelcomeSection: {
    welcomeHeaderTextUngated: `Welcome to Kisunla support.`,
    welcomeHeaderTextGated: `Hi ${mockUserData.firstName}, welcome to Kisunla support`,
    welcomeSubHeaderTextUngated: `Support resources for your treatment journey. Register to set up a
      calendar of appointments, set up reminders, and assign care
      partners.`,
    welcomeSubHeaderTextGated: `Support resources for your treatment journey. Set up your calendar of appointments, reminders, and care partners.`,
  },
  MyAppointments: {
    header: 'My appointments',
    subHeader:
      'Appointment reminders will be sent to you and your care partners 5 days and 1 day before your scheduled appointment.',
    noAppointments: {
      firstPiece: 'No appointments saved.',
      link: 'Add New Appointments',
      secondPiece: 'to get started.',
    },
    noUpcomingAppointments: {
      firstPiece: 'You have no upcoming appointments.',
      addLink: 'Add new appointments',
      or: 'or',
      viewLink: 'view all Appointments',
    },
    tableColumnHeaders: {
      date: 'Date',
      time: 'Time',
      address: 'Address',
      appointmentType: 'Type of appointment',
      carePartners: 'Care partner(s)',
      actions: 'Actions',
    },
    buttons: {
      newAppointment: 'New appointment',
      edit: 'Edit',
      delete: 'Delete',
    },
    deleteModal: {
      header: 'Are you sure you want to delete this appointment?',
      subHeader: 'This cannot be undone.',
      primaryButtonLabel: 'Yes, delete',
      secondaryButtonLabel: 'Cancel',
    },
    deleteAlert: {
      message: 'The appointment has been successfully deleted.',
    },
    appointmentTypes: {
      [AppointmentTypes.INFUSION]: 'IV infusion Dose',
      [AppointmentTypes.GENERAL_DOCTOR]: 'General Practicioner Check-in',
      [AppointmentTypes.SAFETY_MRI]: 'Safety MRI',
      [AppointmentTypes.NEUROLOGIST]: 'Neurologist Check-in',
    },
  },
  TreatmentIntro: {
    titleGated: 'My treatment plan',
    titleUngated: 'Recommended treatment',
    subtitleUngated:
      'Setting you up for success in your treatment. Setting you up for success in your treatment.',
    textUngated:
      'This treatment map serves as a suggested guide. Always follow your doctor’s directions. Insurance approval may be needed or the start of your infusion therapy may be delayed.',
    addApointmentBtnGated: 'Add Appointment',
  },
  TreatmentDownload: {
    reminderUngated:
      'Always follow your doctor’s directions. Insurance approval may be needed or the start of your infusion therapy may be delayed.',
    downloadUngated:
      'For a printable version of the treatment map download the following.',
    downloadGated: 'Print or save your Treatment Plan as a PDF',
    downloadButtonUngated: 'Treatment Map PDF',
    downloadButtonGated: 'Print My Plan',
  },
  Header: {
    signIn: 'Sign in',
    signUp: 'Sign up',
    signOut: 'Sign out',
    viewAppointments: 'View your appointments',
    nextAppointmentToday: 'Your next appointment is today.',
    nextAppointmentIsIn: 'Your next appointment is in',
    day: 'day',
    days: 'days',
  },
  Footer: {
    primaryLinks: {
      prescribingInformation: 'Prescribing Information',
      medicationGuide: 'Medication Guide',
    },
    globalLinks: {
      privacyPolicy: 'Privacy policy',
      termsOfUse: 'Terms of use',
      accessibilityStatement: 'Accessibility Statement',
    },
    saveToDeviceHomeButton: 'Save to device home',
  },
  AddAppointment: {
    title: 'Add Appointment',
    subtitle:
      'Appointment reminders will be sent to you and your care partners 5 days and 1 day before your scheduled appointment.',
    selectOptionLabels: {
      [AppointmentTypes.INFUSION]: 'Infusion',
      [AppointmentTypes.NEUROLOGIST]: 'Neurologist',
      [AppointmentTypes.SAFETY_MRI]: 'Safety MRI',
      [AppointmentTypes.GENERAL_DOCTOR]: 'General Doctor',
    },
    labels: {
      appointmentType: 'TYPE OF APPOINTMENT',
      infusionNumber: 'INFUSION # (OPTIONAL)',
      address: 'ADDRESS',
      date: 'DATE',
      time: 'TIME',
      carePartners: 'CARE PARTNERS (OPTIONAL)',
    },
    hints: {
      date: 'Format: MM/DD/YYYY',
      time: 'Format: HH:MM',
    },
    formErrors: {
      appointmentType: 'Select an appointment type',
      fieldRequired: 'This field is required',
      addressExceedLimit: 'Address exceeds 150 characters', // TODO: define this copy
      invalidDate: 'Date is invalid',
      invalidTime: 'Time is invalid',
    },
    confirmationModal: {
      title: 'Your appointment has been saved.',
      primaryButtonLabel: 'View my appointments',
      secondaryButtonLabel: 'Add new appointment',
    },
    addCarePartnerBtn: 'Add new care partner',
    saveBtn: 'Save',
    cancelBtn: 'Cancel',
  },
  AddCarePartnerModal: {
    title: 'Add care partner',
    name: 'NAME',
    email: 'EMAIL ADDRESS',
    cancelButton: 'Cancel',
    saveButton: 'Save',
    notSavedWarning: 'You have not saved your care partner.',
    allDetailsLost: 'All details will be lost.',
    closeAnywayButton: 'Close anyway',
    formValidation: {
      requiredField: 'This field is required',
      invalidEmail: 'Invalid email address',
      nameLength: 'Name must not be longer than 50 characters',
      emailLength: 'Email address must not be longer than 80 characters',
    },
  },
};

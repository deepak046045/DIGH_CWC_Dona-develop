import React from 'react';
import WelcomeSection from '@/components/welcomeSection/WelcomeSection';
import TreatmentInfo from '@/components/treatmentInfo/TreatmentInfo';
import CustomerSupport from '@/components/customerSupport/CustomerSupport';
import TreatmentIntro from '@/components/treatmentIntro/TreatmentIntro';
import TreatmentMapList from '@/components/treatmentMapList/TreatmentMapList';
import TreatmentDownload from '@/components/treatmentDownload/TreatmentDownload';
import { UpcomingAppointmentAlert } from '@/components/upcomingAppointmentAlert/UpcomingAppointmentAlert';

export default function TreatmentMapPage() {
  return (
    <>
      <UpcomingAppointmentAlert />
      <WelcomeSection />
      <TreatmentIntro />
      <TreatmentMapList />
      <TreatmentDownload />
      <TreatmentInfo />
      <CustomerSupport />
    </>
  );
}

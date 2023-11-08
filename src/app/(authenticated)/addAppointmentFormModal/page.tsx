'use client';

import React from 'react';
import { useLdsModal } from '@elilillyco/ux-lds-react';
import { LdsModalType } from '@/models/LdsModal';
import { AddAppointmentConfirmationModal } from '@/components/addAppointmentConfirmationModal/AddAppointmentConfirmationModal';
import { useRouter } from 'next/navigation';
import { NavigationOptions } from '@/models/NavigationOptions';
import AddAppointment from '@/components/addAppointment/AddAppointment';

export default function AddAppointmentFormModalPage() {
  const router = useRouter();

  const {
    setIsModalOpen,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  } = useLdsModal() as LdsModalType;

  const handleModalAddNewAppointment = () => {
    setIsModalOpen(false);
    router.push(NavigationOptions.AddAppointment.path);
  };

  return (
    <>
      <AddAppointment />
      <AddAppointmentConfirmationModal
        isModalOpen
        setIsModalOpen={setIsModalOpen}
        handleAddNewAppointment={handleModalAddNewAppointment}
      />
    </>
  );
}

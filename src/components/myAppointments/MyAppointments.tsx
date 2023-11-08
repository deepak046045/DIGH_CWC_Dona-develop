'use client';

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import {
  LdsButton,
  LdsSwitch,
  LdsLink,
  LdsHorizontalRule,
  useLdsModal,
  LdsModal,
  LdsAlert,
} from '@elilillyco/ux-lds-react';
import { Appointment } from '@/models/Appointment';
import { compareAsc, format, isFuture } from 'date-fns';
import { APPOINTMENT_ICONS } from '@/models/AppointmentType';
import { copyTexts } from '@/constants/copyTexts';
import buttons from '@/scss/themes/buttons.module.scss';
import layout from '@/scss/themes/layout.module.scss';
import modal from '@/scss/themes/modal.module.scss';
import { LdsModalType } from '@/models/LdsModal';
import alertStyles from '@/scss/themes/alert.module.scss';
import { UserContext } from '@/context/UserContextProvider';
import { useRouter } from 'next/navigation';
import styles from './MyAppointments.module.scss';
import { NavigationOptions } from '@/models/NavigationOptions';

export function MyAppointments() {
  const router = useRouter();

  const [viewAllAppointments, setViewAllAppointments] =
    useState<boolean>(false);

  const viewAllSwitchId = 'viewAllAppointmentsSwitch';

  const { appointments, setAppointments } = useContext(UserContext);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(
    null
  );

  const {
    isModalOpen: isDeleteAppointmentModalOpen,
    setIsModalOpen: setIsDeleteAppointmentModalOpen,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  } = useLdsModal() as LdsModalType;

  const [alerts, setAlerts] = useState<Array<string | null>>([]);

  const handleDeleteAppointment = () => {
    const filteredAppointments = appointments.filter(
      (appointment) => appointment.id !== selectedAppointment
    );
    setAppointments(filteredAppointments);
    setIsDeleteAppointmentModalOpen(false);
    setAlerts([...alerts, selectedAppointment]);
  };

  function deleteMyAppointmentModal(): JSX.Element {
    return (
      <div className={`${modal.primary}`}>
        <LdsModal
          modalId="confirmationModal"
          open={isDeleteAppointmentModalOpen}
          setModalOpen={setIsDeleteAppointmentModalOpen}
        >
          <h2 className={modal.modalTitle}>
            {copyTexts.MyAppointments.deleteModal.header}
          </h2>
          <p className={modal.modalContent}>
            {copyTexts.MyAppointments.deleteModal.subHeader}
          </p>
          <div className={modal.modalActions}>
            <LdsButton
              classes={`${buttons.secondary}`}
              onClick={() => {
                setIsDeleteAppointmentModalOpen(false);
              }}
              data-testid="cancel-btn"
            >
              {copyTexts.MyAppointments.deleteModal.secondaryButtonLabel}
            </LdsButton>
            <LdsButton
              classes={`${buttons.primary}`}
              onClick={handleDeleteAppointment}
              data-testid="yes-btn"
            >
              {copyTexts.MyAppointments.deleteModal.primaryButtonLabel}
            </LdsButton>
          </div>
        </LdsModal>
      </div>
    );
  }

  function deleteMyAppointmentAlert(): JSX.Element[] {
    return alerts.map((alert) => (
      <LdsAlert id="alert_message" level="success" dismissible key={`${alert}`}>
        <div className={`${alertStyles.message}`}>
          {copyTexts.MyAppointments.deleteAlert.message}
        </div>
      </LdsAlert>
    ));
  }

  function buildHeader(): JSX.Element {
    return (
      <>
        <div className={styles.header}>
          <div className={styles.headerText}>
            {copyTexts.MyAppointments.header}
          </div>
          <div className={styles.subHeaderText}>
            {copyTexts.MyAppointments.subHeader}
          </div>
          <div className={styles.headerButtonAndSwitch}>
            <LdsButton
              icon="Plus"
              iconPosition="before"
              classes={`${buttons.primary} ${styles.addAppointmentButton}`}
              onClick={() => {
                router.push(NavigationOptions.AddAppointment.path);
              }}
            >
              {copyTexts.MyAppointments.buttons.newAppointment}
            </LdsButton>
            <LdsSwitch
              id={viewAllSwitchId}
              data-testid="view-all-switch"
              onClick={() => setViewAllAppointments(!viewAllAppointments)}
              label="View all"
              positiveText="On"
              negativeText="Off"
              onByDefault={false}
              classes={styles.viewAllAppointmentsSwitch}
            />
          </div>
        </div>
        <div className={styles.mobileHeader}>
          {copyTexts.MyAppointments.header}
        </div>
      </>
    );
  }

  function buildTableHeaderRow(): JSX.Element {
    return (
      <>
        <div className={`${styles.date} ${styles.gridHeaderCell}`}>
          <Image
            src="/icons/calendar-icon.svg"
            alt="CalendarIcon"
            width="24"
            height="24"
          />
          {copyTexts.MyAppointments.tableColumnHeaders.date}
        </div>
        <div className={`${styles.time} ${styles.gridHeaderCell}`}>
          <Image
            src="/icons/white-hours-icon.svg"
            alt="HoursIcon"
            width="24"
            height="24"
          />
          {copyTexts.MyAppointments.tableColumnHeaders.time}
        </div>
        <div className={`${styles.address} ${styles.gridHeaderCell}`}>
          <Image
            src="/icons/address-icon.svg"
            alt="AddressIcon"
            width="24"
            height="24"
          />
          {copyTexts.MyAppointments.tableColumnHeaders.address}
        </div>
        <div className={`${styles.type} ${styles.gridHeaderCell}`}>
          {copyTexts.MyAppointments.tableColumnHeaders.appointmentType}
        </div>
        <div className={`${styles.carePartner} ${styles.gridHeaderCell}`}>
          <Image
            src="/icons/heart-icon.svg"
            alt="HeartIcon"
            width="24"
            height="24"
          />
          {copyTexts.MyAppointments.tableColumnHeaders.carePartners}
        </div>
        <div className={`${styles.actions} ${styles.gridHeaderCell}`}>
          {copyTexts.MyAppointments.tableColumnHeaders.actions}
        </div>
      </>
    );
  }

  function buildTableRow(appointment: Appointment): JSX.Element {
    const { date } = appointment;

    const dateString = format(date, 'MMMM d, yyyy');
    const timeString = format(date, 'hh:mmaaa');

    return (
      <>
        <div
          className={`${styles.date} ${styles.gridCell}`}
          data-testid="appointment-row"
        >
          <Image
            className={styles.mobileRowIcon}
            src="/icons/gray-calendar-icon.svg"
            alt="CalendarIcon"
            width="24"
            height="24"
          />
          {dateString}
        </div>
        <div className={`${styles.time} ${styles.gridCell}`}>
          <Image
            className={styles.mobileRowIcon}
            src="/icons/gray-hours-icon.svg"
            alt="HoursIcon"
            width="24"
            height="24"
          />
          {timeString}
        </div>
        <div className={`${styles.address} ${styles.gridCell}`}>
          <Image
            className={styles.mobileRowIcon}
            src="/icons/gray-address-icon.svg"
            alt="AddressIcon"
            width="24"
            height="24"
          />
          <LdsLink
            target="_blank"
            href={`http://maps.google.com/?q=${appointment.address}`}
          >
            {appointment.address}
          </LdsLink>
        </div>
        <div className={`${styles.type} ${styles.gridCell}`}>
          <Image
            src={APPOINTMENT_ICONS[appointment.type.name]}
            alt="AppointmentTypeIcon"
            width="49"
            height="48"
          />
          {copyTexts.MyAppointments.appointmentTypes[appointment.type.name]}
          {appointment.type.count ? ` ${appointment.type.count}` : null}
        </div>
        <div className={`${styles.carePartner} ${styles.gridCell}`}>
          <Image
            className={styles.mobileRowIcon}
            src="/icons/gray-heart-icon.svg"
            alt="HeartIcon"
            width="24"
            height="24"
          />
          {appointment.carePartners
            .map((carePartner) => carePartner.name)
            .join(', ')}
        </div>
        {isFuture(appointment.date) ? (
          <div className={`${styles.actions} ${styles.gridCell}`}>
            <div className={styles.appointmentsHorizontalRule}>
              <LdsHorizontalRule />
            </div>
            <div className={styles.actionButtons}>
              <div className={styles.actionButtonEdit}>
                <Image
                  src="/icons/edit-pencil-icon.svg"
                  alt="EditAppointmentIcon"
                  width="24"
                  height="24"
                />
                {copyTexts.MyAppointments.buttons.edit}
              </div>
              <LdsButton
                clearDefaultClasses
                data-testid="delete-appointment-button"
                classes={styles.actionButtonDelete}
                onClick={() => {
                  setSelectedAppointment(appointment.id);
                  setIsDeleteAppointmentModalOpen(true);
                }}
              >
                <Image
                  src="/icons/delete-icon.svg"
                  alt="DeleteAppointmentIcon"
                  width="24"
                  height="24"
                />
                <div className={styles.buttonLabel}>
                  {copyTexts.MyAppointments.buttons.delete}
                </div>
              </LdsButton>
            </div>
          </div>
        ) : (
          <div />
        )}
      </>
    );
  }

  const buildTable = (): JSX.Element => {
    let areNoAppointments = false;
    let areNoUpcomingAppointments = false;

    if (!appointments.length) {
      areNoAppointments = true;
    }

    const compareAppointmentDates = (a: Appointment, b: Appointment) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return compareAsc(dateA, dateB);
    };

    const appointmentsToShow = appointments
      .sort(compareAppointmentDates)
      .filter(
        (appointment) => viewAllAppointments || isFuture(appointment.date)
      );

    if (!appointmentsToShow.length) {
      areNoUpcomingAppointments = true;
    }

    if (areNoAppointments) {
      return (
        <>
          <div className={styles.appointmentGrid}>{buildTableHeaderRow()}</div>
          <div className={styles.noAppointments}>
            {copyTexts.MyAppointments.noAppointments.firstPiece}&nbsp;
            <LdsLink>{copyTexts.MyAppointments.noAppointments.link}</LdsLink>
            &nbsp;{copyTexts.MyAppointments.noAppointments.secondPiece}
          </div>
        </>
      );
    }

    if (areNoUpcomingAppointments) {
      return (
        <>
          <div className={styles.appointmentGrid}>{buildTableHeaderRow()}</div>
          <div className={styles.noAppointments}>
            {copyTexts.MyAppointments.noUpcomingAppointments.firstPiece}&nbsp;
            <LdsLink>
              {copyTexts.MyAppointments.noUpcomingAppointments.addLink}
            </LdsLink>
            &nbsp;{copyTexts.MyAppointments.noUpcomingAppointments.or}&nbsp;
            <LdsLink
              data-testid="view-all-link"
              onClick={() => document?.getElementById(viewAllSwitchId)?.click()}
            >
              {copyTexts.MyAppointments.noUpcomingAppointments.viewLink}
            </LdsLink>
            .
          </div>
        </>
      );
    }

    return (
      <div className={styles.appointmentGrid}>
        {buildTableHeaderRow()}
        {appointmentsToShow.map((appointment: Appointment) =>
          buildTableRow(appointment)
        )}
      </div>
    );
  };

  return (
    <>
      <div className={alertStyles.primary}>{deleteMyAppointmentAlert()}</div>
      <div className={layout.gutter}>
        {buildHeader()}
        {buildTable()}
        {deleteMyAppointmentModal()}
      </div>
    </>
  );
}

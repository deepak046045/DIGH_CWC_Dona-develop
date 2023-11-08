import React, { useState } from 'react';
import { LdsSelect } from '@elilillyco/ux-lds-react';
import styles from './TimePicker.module.scss';

type TimePickerProps = {
  label: string;
  name: string;
  hint?: string;
  handleInputChange: (arg: number) => Promise<void>;
  value?: number;
  error?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
};

type OptionType = {
  value: number;
  label: string;
};

export function TimePicker({
  handleInputChange,
  name,
  value = -1,
  error = false,
  onBlur,
  label = '',
  hint = '',
}: TimePickerProps) {
  const generateOptions = () => {
    const options = [
      {
        value: -1,
        label: 'Select Time',
      },
    ];
    const startTime = new Date();
    startTime.setHours(5, 0, 0); // 5.00 AM
    const endTime = new Date();
    endTime.setHours(21, 0, 0); // 9.00 PM
    while (startTime <= endTime) {
      const time = startTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      options.push({
        value: Number(`${startTime.getHours()}.${startTime.getMinutes()}`),
        label: time,
      });
      startTime.setMinutes(startTime.getMinutes() + 15);
    }
    return options;
  };

  const [selectedTime, setSelectedTime] = useState<number>(value);

  const handleChange = async (option: OptionType) => {
    setSelectedTime(option.value);
    await handleInputChange(option.value);
  };
  const labelComponent = (
    <div>
      <label className={styles.label} htmlFor={`${name}-timepicker-id`}>
        {label}
      </label>
      <p className={styles.hint}>{hint}</p>
    </div>
  );
  return (
    <LdsSelect
      id={`${name}-timepicker-id`}
      label={labelComponent}
      name={name}
      value={selectedTime}
      options={generateOptions()}
      onChange={(option: OptionType) => handleChange(option)}
      onBlur={onBlur}
      error={error}
    />
  );
}

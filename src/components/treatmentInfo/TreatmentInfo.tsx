import React from 'react';
import layout from '@/scss/themes/layout.module.scss';
import styles from './TreatmentInfo.module.scss';

export default function TreatmentInfo() {
  return (
    <div className={`${styles.container} ${layout.gutter}`}>
      <div className={styles.item}>
        <h2 className={styles.heading}>Treatment Touch Points</h2>
        <p className={styles.details}>
          Throughout your treatment journey you’ll have regular touch points or
          visits with your health care provider. In the beginning of treatment
          these occur more frequently as you work to understand how effective
          the treatment is and set yourself up for success with ongoing
          treatment.
        </p>
      </div>
      <div className={styles.item}>
        <h2 className={styles.heading}>Recommended Dosing</h2>
        <p className={styles.details}>
          The recommended dosing shows a clear path for timing of doses, what
          kind of dose it is, and how much to take. For Kinsula your doses are
          in the form of infusions.
        </p>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import layout from '@/scss/themes/layout.module.scss';

export default function TreatmentMapList() {
  return (
    <div
      className={`TreatmentMapList ${layout.gutter}`}
      style={{
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        background: 'lightgrey',
        color: 'white',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        padding: '20px 0',
      }}
    >
      <p style={{ textAlign: 'center', margin: '0' }}>
        Treatment Map List Placeholder
      </p>
    </div>
  );
}

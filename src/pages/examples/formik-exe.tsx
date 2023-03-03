/*
http://localhost:3000/references/formik-exe

basic example of ASYNC
*/
import React, { useState } from 'react';
import { BasicForm } from './formik-basic';
import { AdvancedForm } from './formik-advanced';

const FormikExe = (): JSX.Element => {
  const [view, setView] = useState('basicForm');

  return (
    <div className='formik-container'>
      <nav>
        <h3 onClick={(): void => setView('basicForm')}>Basic Form</h3>
        <h3 onClick={(): void => setView('advancedForm')}>Advanced Form</h3>
      </nav>
      {view === 'basicForm' ? <BasicForm /> : <AdvancedForm />}
    </div>
  );
};

export default FormikExe;

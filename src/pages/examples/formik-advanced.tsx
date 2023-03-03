// import { useState } from 'react';
import { Formik } from 'formik';
import { advancedSchema } from './yup-schema';
import { FormikInput } from '@components/formik-input';
import { FormikSelect } from '@components/formik-select';
import { FormikCheckbox } from '@components/formik-checkbox';

const onSubmit = async (values, actions): Promise<void> => {
  try {
    const response = await fetch('/api/formik', {
      method: 'POST',
      body: JSON.stringify({
        requestType: 'addAdvancedUser',
        newUser: { values }
      })
    });
    actions.resetForm();
    const json = await response.json();

    console.log(json);
  } catch (error) {
    console.log(error);
  }
};

export const AdvancedForm = (): JSX.Element => {
  // const [todoChecked, setTodoChecked] = useState(true);

  // function handleChecked(): void {
  //   setTodoChecked(!todoChecked);
  // }

  return (
    <>
      <Formik
        initialValues={{ username: '', jobType: '', acceptedTos: false }}
        validationSchema={advancedSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, handleSubmit }): JSX.Element => (
          <form onSubmit={handleSubmit}>
            <FormikInput
              label='Username'
              name='username'
              // type='text'
              // placeholder='Enter your username'
            />
            <FormikSelect
              label='Job Type'
              name='jobType'
            >
              <option value=''>Please select a job type</option>
              <option value='developer'>Developer</option>
              <option value='designer'>Designer</option>
              <option value='manager'>Manager</option>
              <option value='other'>Other</option>
            </FormikSelect>
            <FormikCheckbox
              label='Please accept our terms of service'
              name='acceptedTos'
            />
            <FormikCheckbox
              // onChange={handleChecked}
              label='Include Todos (bound checkbox example)'
              name='includeTodos'
              // checked={todoChecked}
            />
            <button
              disabled={isSubmitting}
              type='submit'
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

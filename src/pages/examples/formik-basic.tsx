import { useFormik } from 'formik';
import { basicSchema } from './yup-schema';

// const onSubmit = async (_values, actions): Promise<void> => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   actions.resetForm();
// };

const onSubmit = async (values, actions): Promise<void> => {
  try {
    const response = await fetch('/api/formik', {
      method: 'POST',
      body: JSON.stringify({
        requestType: 'addBasicUser',
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

export const BasicForm = (): JSX.Element => {

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues: {
      name: '',
      age: 0,
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: basicSchema,
    onSubmit
  });

  ///console.log( 'errors', errors );
  ///console.log( 'values', values );

  return (
    <form autoComplete='off' onSubmit = { handleSubmit }>

      <label htmlFor='name'>Name</label>
      <input
        id = 'name'
        type = 'text'
        placeholder = 'Enter your name'
        value = { values.name }
        onChange = { handleChange }
        onBlur = { handleBlur }
        className = { touched.name && errors.name ? 'input-error' : '' }
      />
      { touched.name && errors.name ? <div className='error'>{ errors.name.toString() }</div> : '' }

      <label htmlFor='email'>Email</label>
      <input
        id = 'email'
        type = 'text'
        placeholder = 'Enter your email'
        value = { values.email }
        onChange = { handleChange }
        onBlur = { handleBlur }
      />
      { touched.email && errors.email ? <div className='error'> { errors.email.toString() } </div> : '' }
      
      <label htmlFor='age'>Age</label>
      <input
        id = 'age'
        type = 'text'
        placeholder = 'Enter your age'
        value = { values.age }
        onChange = { handleChange }
        onBlur = { handleBlur }
      />
      { touched.age && errors.age ? <div className='error'> { errors.age.toString() }</div> : '' }

      <label htmlFor='password'>Password</label>
      <input
        id = 'password'
        type = 'password'
        placeholder = 'Enter your password'
        value = { values.password }
        onChange = { handleChange }
        onBlur = { handleBlur }
      />
      { touched.password && errors.password ? <div className='error'>{ errors.password.toString() }</div> : '' }

      <label htmlFor='confirmPassword'>Confirm Password</label>
      <input
        id = 'confirmPassword'
        type = 'password'
        placeholder = 'Re-Enter your password'
        value = { values.confirmPassword }
        onChange = { handleChange }
        onBlur = { handleBlur }
      />
      { touched.confirmPassword && errors.confirmPassword ? <div className='error'>{ errors.confirmPassword.toString() }</div> : '' }

      <button disabled={ isSubmitting } type='submit'>
        Submit
      </button>

    </form>
  );
};

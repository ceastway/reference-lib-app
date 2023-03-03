/*
http://localhost:3000/references/form

basic example of a form
*/
import { useState, FormEvent } from 'react';
import { ToggleSwitch } from '@components/toggle-switch';
import { Checkbox } from '@components/input-checkbox';

interface FormDataProps {
  name: string;
  email: string;
  todoChecked: boolean;
  largeToggle: boolean;
  smallToggle: boolean;
}

const initialFormData: FormDataProps = {
  name: '',
  email: '',
  todoChecked: false,
  largeToggle: false,
  smallToggle: false
};

interface FormSubmitResponseProps {
  success: boolean | null;
  message: string | null;
}

const initialFormErrors = {
  name: '',
  email: ''
};

const FormExe = ():JSX.Element => {

  // const [todoChecked, setTodoChecked] = useState(true);
  const [ formData, setFormData ] = useState<FormDataProps>(initialFormData);
  const [ formFieldErrors, setFormFieldErrors ] = useState(initialFormErrors);
  const [ formSubmitResponse, setFormSubmitResponse ] = useState<FormSubmitResponseProps>({success: null, message:''});

  // function handleChecked(): void {
  //   setFormData(prev => {
  //     return { ...prev, todoChecked: !prev.todoChecked };
  //   });
  // }

  function handleToggle( toggleParam ): void {
    setFormData(prev => {
      return { ...prev, [toggleParam]: !prev[toggleParam] };
    });
  }

  function updateFields(fields: Partial<FormDataProps>): void {
    setFormData(prev => {
      return { ...prev, ...fields };
    });

    validateFormData();
  }

  function validateFormData(): boolean {

    let formHasErrors = false;
    //name validation
    if(formData.name.length < 3){
      setFormFieldErrors( prevErrors  => { 
        return { ...prevErrors, name: 'Your name must be at least 3 characters.' };
      });
      formHasErrors = true;
    }else{
      setFormFieldErrors( prevErrors  => { 
        return { ...prevErrors, name: '' };
      });
    }

    //email validation    
    const emailPattern = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"; /* eslint-disable-line */
    const regex = new RegExp(emailPattern, 'g');
    if(formData.email.length < 2){
      setFormFieldErrors( prevErrors  => { 
        return { ...prevErrors, email: 'Your email must be atleast 2 characters.' };
      });
      formHasErrors = true;
    }else if(!regex.test(formData.email)){
      setFormFieldErrors( prevErrors  => { 
        return { ...prevErrors, email: 'Please enter a valid email' };
      });
      formHasErrors = true;
    } else {
      setFormFieldErrors( prevErrors  => { 
        return { ...prevErrors, email: '' };
      });
    }

    return formHasErrors;
  }

  async function onSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    
    //form validataion
    const formHasErrors = validateFormData();

    if( formHasErrors ) { return; }
    
    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        body: JSON.stringify({
          requestType: 'addFormUser',
          newUser: { formData }
        })
      });
      // actions.resetForm();
      const json = await response.json();

      setFormSubmitResponse({ success: json.success, message: json?.message });

      if( json.success === true){
        //user added
        setFormData(initialFormData);
      }
  
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className = 'formik-exe' >
      <form
        onSubmit={ onSubmit }
      >
        { formSubmitResponse.success === null ?
          '' :
          formSubmitResponse.success === true ? (
            <div className='message'>
              User Added
            </div> 
          ) : (
            <div className='error'>
              { formSubmitResponse.message }
            </div> 
          )
        } 
        
        { formSubmitResponse.success === true ? (
          <div className='error'>
            { formSubmitResponse.message }
          </div> 
        )
          : null 
        }
        <label>Full Name</label>
        <input
          autoFocus
          required
          type="text"
          value={formData.name}
          onChange={(e): void => updateFields({ name: e.target.value })}
        />
        { formFieldErrors.name ? <div className='error'>{ formFieldErrors.name.toString() }</div> : ''}
        {/* { touched.name && errors.name ? <div className='error'>{ errors.name.toString() }</div> : '' } */}
        <label>Email</label>
        <input
          required
          type="text"
          value={formData.email}
          onChange={(e): void => updateFields({ email: e.target.value })}
        />
        { formFieldErrors.email ? <div className='error'>{ formFieldErrors.email.toString() }</div> : ''}
 
        <Checkbox
          checkboxChecked = { formData.todoChecked }
          checkboxLabel = "Add Todo's"
          checkboxName = 'addTodos'
          // checkboxOnChange={ handleChecked }
          checkboxValue = "1"
        />

        <ToggleSwitch
          toggleOnChange = {(): void => handleToggle('largeToggle')}
          toggleName = 'largeToggle'
          toggleChecked = { formData.largeToggle }
          toggleYesValue = 'Yes'
          toggleNoValue = 'No'
        />
        <ToggleSwitch
          toggleOnChange = {(): void => handleToggle('smallToggle')}
          toggleName = 'smallToggle'
          toggleChecked = { formData.smallToggle }
          toggleYesValue = 'Yes'
          toggleNoValue = 'No'
          toggleSize='smallToggle'
        />
        <button type ='submit'>Add User</button>
      </form>

      <div className = 'page-content'>
        <h2>Legend</h2>
        {Object.entries(formData).map((entry, i)=>{
          return (
            <div key={`data-${i}`}>
              {entry[0]} : {entry[1].toString()}
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default(FormExe);

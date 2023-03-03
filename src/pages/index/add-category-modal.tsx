import React from 'react';
import * as yup from 'yup';
// import { Modal } from 'components';
import { Modal } from '@components/modal';
import { useFormik } from 'formik';
// import { FormikBasicInput } from 'components/formik-basic-input';
import { FormikBasicInput } from '@components/formik-basic-input';
import { useCreateRefCategoryMutation } from 'generated/graphql';
import { toErrorMap } from 'utils/toErrorMap';

export const addCategorySchema = yup.object().shape({
  categoryName: yup.string().required('Required')
});

interface AddCategoryProps {
  handleShowModal: any;
  showAddCategoryFormModal: any;
  // onCloseRunThis: any;
}

export const AddCategoryModal: React.FC<AddCategoryProps> = (
  props
): JSX.Element => {
  const { handleShowModal, showAddCategoryFormModal } = props;
  const [, createRefCategory] = useCreateRefCategoryMutation();

  const onSubmit = async (values, actions): Promise<void> => {
    try {
      const response = await createRefCategory(values);

      console.log('response.data', response.data);
      console.log('errors', response.data?.createRefCategory.errors);

      if (response.error?.message.includes('Not Authenticated')) {
        console.log('Not Authenticated:', response.error);
      }
      if (response.data?.createRefCategory.errors) {
        actions.setErrors(toErrorMap(response.data.createRefCategory.errors));
      } else {
        //reference category created
        actions.resetForm();
        handleShowModal('AddCategoryForm');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      categoryName: ''
    },
    validationSchema: addCategorySchema,
    onSubmit
  });

  return (
    <div className='formik-container'>
      <Modal
        show={showAddCategoryFormModal}
        closeModal={(): void => handleShowModal('AddCategoryForm')}
        showModalHeader={false}
      >
        <form
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <FormikBasicInput
            inputErrors={errors.categoryName}
            handleBlur={handleBlur}
            handleChange={handleChange}
            fieldName='categoryName'
            fieldValue={values.categoryName}
            label='Category Name'
            placeholder='Category Name'
            inputTouched={touched.categoryName}
          />

          <button
            disabled={isSubmitting}
            type='submit'
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

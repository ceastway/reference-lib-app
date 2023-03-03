/*
TODO: Ask Dustin
  - Why is react use state causing this error:
  TypeError: Cannot read properties of null (reading 'useState')

  - do I have to either import components from their individual folders, or use treeshaking?
*/

import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components';
import { Checkbox } from '@components/components/input-checkbox';
// import { Icon, MaterialIcon, FontFamily } from '@br-components/icon';

const Index: React.FC = () => {
  // const [showAddCategoryFormModal, setShowAddCategoryFormModal] = useState(false);

  // function checkboxOnChange():void {
  //   console.log('here');
  // }

  return (
    <Layout variant='large'>
      {/* <Icon
        icon={MaterialIcon.lightMode}
        font={FontFamily.materialRegular}
        size={21}
      /> */}
      <Checkbox
        checkboxChecked={true}
        checkboxName='test123'
        checkboxLabel='Test123'
      ></Checkbox>
      <Checkbox
        checkboxChecked={false}
        checkboxName='test124'
        checkboxLabel='Test124'
      ></Checkbox>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);

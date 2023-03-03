import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import OutputExample from '../examples/outputExample';
import {
  useRefCategoryQuery,
  useRefItemQuery
} from '../../generated/graphql';
import { Layout } from '../../fragments';
import { Button } from '@components/button';
import { useRouter } from 'next/router';

interface ReferenceCategory {
  id: number;
  todo?: number;
  name: string;
  // itemDesc: string;
}

const Index: React.FC = () => {
  const router = useRouter();
  const actRefCategoryId =
    typeof router.query.id === 'undefined'
      ? null
      : parseInt(router.query.id as string); //2;

  const [actRefCategory, setActRefCategory] = useState<ReferenceCategory>(null);

  const [actRefCategoryData] = useRefCategoryQuery({
    variables: { refCategoryId: actRefCategoryId }
  });

  useEffect(() => {
    if (actRefCategoryId === null) {
      return;
    }

    if (actRefCategoryData.fetching) {
      return;
    }

    setActRefCategory(actRefCategoryData?.data?.refCategory);

  }, [actRefCategoryId, actRefCategoryData.fetching]);

  // const [actRefCategory, setActRefCategory] = useState<ReferenceCategory>(null);
  const [filterSearchString, setFilterSearchString] = useState('');
  const [refItemResults] = useRefItemQuery({
    variables: {
      cat: actRefCategory ? actRefCategoryId : 0,
      limit: 0
    }
  });

  function handleChangeCategoryFilter(e): void {
    setFilterSearchString(e.target.value);
  }

  function handleSubmit(): void {
    //do nothing
  }

  let pageContent: JSX.Element = <></>;

  if (!actRefCategoryData.fetching && !refItemResults.fetching && typeof refItemResults.data !== 'undefined') {
    pageContent = actRefCategory ? <>{actRefCategory.name}</> : <></>;

    //filterSearchString
    refItemResults.data.refItems.forEach((refItem) => {
      if (
        refItem.exampleString
          .toLowerCase()
          .indexOf(filterSearchString.toLowerCase()) !== -1 ||
        refItem.name.toLowerCase().indexOf(filterSearchString.toLowerCase()) !==
          -1
      ) {
        //update links in the reference file
        // const testURL = new URL("http://test.com");

        // TODO: add links
        // TODO: add checkbox for todos
        ///const exampleOutput = refItem.exampleString.replace(/<Link>(.*)<\/Link>/, <Link href = testURL></Link>);
        const exampleOutput = refItem.exampleString;

        pageContent = (
          <>
            {pageContent}
            <OutputExample
              label={refItem.name}
              exampleString={exampleOutput}
              result={refItem.result} //{JSON.stringify(array1)}
              result2={refItem.result2} //""
              result2Label={refItem.result2Label} //""
            />
          </>
        );
      }
    });
  }

  return (
    <Layout variant='large'>
      <div style={{ padding: '10px;' }}>
        <Button
          style={{ marginRight: '5px' }}
          className='whiteButton'
          onClick={(): any =>
            router.push('/')
          }
        >
          Return to Reference Category Home
        </Button>

        <h1>{actRefCategory ? actRefCategory.name : ''}</h1>

        {actRefCategory !== null ? (
          <Formik
            initialValues={{}}
            onSubmit={handleSubmit}
          >
            <Form>
              <input
                type='text'
                placeholder='Filter Category'
                className='myAutoComplete myInput'
                onChange={handleChangeCategoryFilter}
              />
            </Form>
          </Formik>
        ) : null}
        {pageContent}
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);

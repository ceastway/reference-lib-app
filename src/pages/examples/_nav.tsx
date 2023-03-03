import React, { useState, useEffect, ChangeEvent } from 'react';
import { Form, Formik } from 'formik';
import { InputSearchField, Layout, Loading} from '../../components';
import { useRefCategoryQuery } from '../../generated/graphql';

const ExampleNav: React.FC = () => {

  const [refCategoryResults] = useRefCategoryQuery({variables:{limit: 0}});
  const [searchString, setSearchString] = useState('');
  const [searchResultsStringProp, setSearchResultsStringProp] = useState<{
      id: number;
      itemName: string; //animal name
      itemDesc?: string; //not used
  }[]>([]);

  // const animalResults = useAnimalsQuery({variables:{orderBy: "AnimalName", limit: 5, animalNameWhere: (searchString+"%")}});

  const exampleOptionsData = {
    fetching: false, 
    data: {
      examples: [
        {
          ExampleName: 'Ajax - Todo',
          ExampleLink: '/references/ajax'
        },
        {
          ExampleName: 'Arrays',
          ExampleLink: '/references/array'
        },
        {
          ExampleName: 'Classes - Todo',
          ExampleLink: '/references/class'
        },
        {
          ExampleName: 'Dom - Todo',
          ExampleLink: '/references/dom'
        },
        {
          ExampleName: 'eNums - Todo',
          ExampleLink: '/references/enum'
        },
        {
          ExampleName: 'Fetch - Todo',
          ExampleLink: '/references/fetch'
        },
        {
          ExampleName: 'Functions - Todo',
          ExampleLink: '/references/function'
        },
        {
          ExampleName: 'JSON - Todo',
          ExampleLink: '/references/json'
        },
        {
          ExampleName: 'libs - Todo',
          ExampleLink: '/references/libs'
        },
        {
          ExampleName: 'Objects',
          ExampleLink: '/references/object'
        }
      ]
    }
  };

  // useEffect(() => {
  //   console.log('useEffectTriggered');
  //   if (refCategoryResults.fetching) return;
  //   console.log('refCategoryResults.fetching done fetching');
  
  //   ProcessResults(refCategoryResults.data);
  
  // }, [refCategoryResults.fetching]);

  useEffect(() => {
    if (exampleOptionsData.fetching) return;
    if (refCategoryResults.fetching) return;
  
    // const newSearchResults = (exampleOptionsData.data.examples).filter(example => example.ExampleName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1).map((example, index) => (
    //   { id: index, itemName: example.ExampleName, itemLink: example.ExampleLink }
    // ));

    console.log(refCategoryResults);

    const newSearchResults = (refCategoryResults.data.refCategorys).filter(refCategory => refCategory.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1).map((refCategory, index) => (
      { id: index, itemName: refCategory.name, itemLink: refCategory.name }
    ));

    setSearchResultsStringProp(newSearchResults);

  }, [searchString]); //animalResults.fetching, 

  const handleSubChange = ( e: ChangeEvent<HTMLInputElement> ):void => {
    setSearchString(e.currentTarget.value);
  };

  const handleSubmit = ():void => {
    //
  };

  let content: JSX.Element | null = null;

  if( !exampleOptionsData.data ){
    content = <Loading isLoading />;
  } else {
    
    content = <Layout variant='large'>

      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
      >
        {(): React.ReactNode => (
          <Form>
            <InputSearchField
              handleSubChange={handleSubChange}
              defaultValue='test123'
              name='title'
              placeholder='Search Reference Library'
              label='Title'
              searchResultsStringProp={searchResultsStringProp}
            />
          </Form>
        )}
      </Formik>
    </Layout>;
  }

  return (
    content
  );
};

export default ExampleNav;

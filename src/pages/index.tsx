import React, { useEffect, useState, ChangeEvent } from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useRefCategorysQuery } from '../generated/graphql';
import { Layout } from '../fragments';
import { Button } from '@components/button';
import { SelectCategory } from './index/select-category';
import { AddCategoryModal } from './index/add-category-modal';
import { useRouter } from 'next/router';

interface ReferenceCategory {
  id: number;
  todo: number;
  itemName: string;
  itemDesc: string;
}

const Index: React.FC = () => {
  const [showAddCategoryFormModal, setShowAddCategoryFormModal] =
    useState(false);
  const [todoChecked, setTodoChecked] = useState(true);
  const [categorySearchString, setCategorySearchString] = useState('');
  const [searchResultsStringProp, setSearchResultsStringProp] = useState<
    ReferenceCategory[]
  >([]);

  const router = useRouter();
  const [refCategoryResults] = useRefCategorysQuery({
    variables: { limit: 0 }
  });

  //TODO: you are here - document the below
  /*
  read this
  https://formidable.com/open-source/urql/docs/graphcache/normalized-caching/

  core contributor here 👋

  query not invalidated by the mutation.
As you've already discovered, there's an open issue for this that details the inherent problem our our simple, default cache. It's a document cache so kind of unsuitable for more complex tasks where normalisation can help.

When we have am empty array of data, there's no indication that a specific result needs to be refetched.

Instead of using the network-only policy you could try cache-and-network, but that doesn't solve the underlying issue that the operation (your query) is not invalidated by the mutation. So no refetch will be triggered.

https://codesandbox.io/examples/package/@graphql-codegen/typescript-urql
  */

  useEffect(() => {
    if (refCategoryResults.fetching) return;
    if (showAddCategoryFormModal === true) return;

    //SET CATEGORY OPTIONS
    const newSearchResults1 = refCategoryResults.data.refCategorys
      .filter(
        (refCategory) =>
          refCategory.name
            .toLowerCase()
            .indexOf(categorySearchString.toLowerCase()) !== -1
      )
      .map((refCategory) => ({
        id: refCategory.id,
        todo: refCategory.todo,
        itemName: !refCategory.todo
          ? refCategory.name
          : `${refCategory.name} TODO: (id: ${refCategory.id})`,
        itemDesc: ''
      }));
    //(!refCategory.todo) ? refCategory.itemName : `${refCategory.itemName} (id: ${refCategory.id}) (todo: ${refCategory.todo})`,

    const newSearchResults = todoChecked
      ? newSearchResults1
      : newSearchResults1
        .filter((refCategory) => refCategory.todo !== 1)
        .map((refCategory) => ({
          id: refCategory.id,
          todo: refCategory.todo,
          itemName: refCategory.itemName,
          itemDesc: ''
        }));

    setSearchResultsStringProp(newSearchResults);

  }, [
    refCategoryResults.fetching,
    categorySearchString,
    todoChecked
  ]);

  const handleSubChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCategorySearchString(e.target.value);
  };

  function handleToggle(): void {
    setTodoChecked(!todoChecked);
  }

  function handleShowModal(modal): void {
    switch (modal) {
      case 'AddCategoryForm':
        setShowAddCategoryFormModal(!showAddCategoryFormModal);
        break;
      default:
        break;
    }
  }

  // const handleSubmit = (): void => {
  //   //do nothing
  // };

  function handleSelected(selectedRefCategory): void {
    router.push(`/category/${selectedRefCategory.id}`);
  }

  // const pageContent: JSX.Element = <></>;

  /*
  if (actRefCategory === null) {
    refCategoryResults.data?.refCategorys.map((refCategory) => {
      const todoString = refCategory.todo ? '[TODO]' : '';
      const catName = refCategory.todo ? (
        `${refCategory.id}. ${refCategory.name} ${todoString}`
      ) : (
        <span
          onClick={(): any => router.push(`/references/category/${refCategory.id}`)}
        >
          {refCategory.id}. {refCategory.name}
        </span>
      );

      pageContent = (
        <>
          {pageContent}
          <div>{catName}</div>
        </>
      );
    });
  }
  */

  /*
  let refSelector: JSX.Element | null = null;

  if (!refCategoryResults.data) {
    refSelector = <Loading isLoading />;
  } else {
    refSelector = (
      <>
        <Formik
          initialValues={{ title: 'test', includeTodos: false }}
          onSubmit={handleSubmit}
        >
          {(): React.ReactNode => (
            <>

              <Button
                style={{ marginRight: '0px' }}
                className='whiteButton'
                onClick={(): void => handleShowModal('AddCategoryForm')}
              >
                Add Category
              </Button>

              <AddCategoryModal
                handleShowModal={handleShowModal}
                showAddCategoryFormModal={showAddCategoryFormModal}
              />
            </>
          )}
        </Formik>
      </>
    );
  }
    */

  return (
    <Layout variant='large'>
      {/* {refSelector} */}
      <div style={{ padding: '10px;' }}>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <Button
            style={{ marginRight: '0px' }}
            className='whiteButton'
            onClick={(): void => handleShowModal('AddCategoryForm')}
          >
            Add Category
          </Button>
          <AddCategoryModal
            handleShowModal={handleShowModal}
            showAddCategoryFormModal={showAddCategoryFormModal}
          />
        </div>

        <SelectCategory
          handleToggle={handleToggle}
          handleSelected={handleSelected}
          handleSubChange={handleSubChange}
          searchResultsStringProp={searchResultsStringProp}
          todoChecked={todoChecked}
        />

        {/* Show Category Autocomplete */}
        {/* <Formik
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
        </Formik> */}
        {/* {pageContent} */}
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);

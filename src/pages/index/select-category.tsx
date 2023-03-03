import React, { ChangeEvent } from 'react';
// import { Flex, InputSearchField } from 'components';
import { ToggleSwitch } from '@components/toggle-switch';
import { Flex } from '@components/flex';
import { InputSearchField } from '@components/input-field-search';

interface SelectCategoryProps {
  handleToggle: (toggleChecked: boolean) => void;
  handleSelected: (selectedRefCategory: string) => void;
  handleSubChange: (e: ChangeEvent) => void;
  searchResultsStringProp;
  todoChecked: boolean;
}

export const SelectCategory: React.FC<SelectCategoryProps> = (props): any => {
  const {
    handleToggle,
    handleSelected,
    handleSubChange,
    searchResultsStringProp,
    todoChecked
  } = props;

  return (
    <>
      <form>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ width: '400px' }}>
            <Flex>
              <div style={{ padding: '7px', display: 'inline-block' }}>
                Include Todo's
              </div>
              <div style={{ display: 'inline-block' }}>
                <ToggleSwitch
                  toggleChecked={todoChecked}
                  toggleOnChange={(): void => handleToggle(todoChecked)}
                  toggleName='todoChecked'
                  toggleYesValue='Yes'
                  toggleNoValue='No'
                />
              </div>
            </Flex>
          </div>
        </div>
        <InputSearchField
          defaultValue=''
          handleSubChange={handleSubChange}
          handleSelected={handleSelected}
          label=''
          name='title'
          placeholder='Search Reference Library'
          showAll={true}
          searchResultsStringProp={searchResultsStringProp}
        />
      </form>
    </>
  );
};

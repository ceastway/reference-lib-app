import React from 'react';
// import { Wrapper } from '../components/wrapper';
import { Wrapper } from '@components/wrapper';

interface LayoutInterface <>{
    variant?: 'small' | 'regular' | 'large';
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutInterface> = ({ children, variant='regular'}) => {
  return (
    <>
      <Wrapper variant={variant}>
        {children}
      </Wrapper>
    </>
  );
};

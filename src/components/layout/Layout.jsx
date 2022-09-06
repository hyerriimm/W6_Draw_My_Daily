import React from 'react';
import styled from 'styled-components';
import Header from '../header/Header';

function Layout({ children }) {
  return (
    <>
      <Header />
      <StLayout>{children}</StLayout>
    </>
  );
}

export default Layout;

const StLayout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  height: 100vh;
  margin: 0 auto;
  background-color: #fff8f0;
`;

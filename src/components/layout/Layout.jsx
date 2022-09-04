import React from 'react';
import styled from 'styled-components';
import Header from '../header/Header';

function Layout({ children }) {
    return (
        <div>
            <Header />
            <StLayout>
                {children}
            </StLayout>
        </div>
    );
}

export default Layout;

const StLayout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
`;
import React from 'react';
import tw from 'tailwind-styled-components';
import Nav from './Nav';
import Footer from './Footer';

const Layout = () => {
  return (
    <Wrapper>
      <Nav />
      <Footer />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = tw.div``;

import React from 'react';
import tw from 'tailwind-styled-components';
import Nav from './Nav';
import Footer from './Footer';

const Layout = (props) => {
  return (
    <Wrapper>
      <Nav />
      <main>{props.children}</main>
      <Footer />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = tw.div``;

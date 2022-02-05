import tw from 'tailwind-styled-components';
import Nav from './Nav';

const Layout = (props) => {
  return (
    <Wrapper>
      <Nav />
      <main>{props.children}</main>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = tw.div`mr-10 ml-10`;

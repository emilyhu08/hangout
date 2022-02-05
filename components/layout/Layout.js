import Nav from './Nav';

const Layout = (props) => {
  return (
    <div className='ml-10 mr-10'>
      <Nav />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;

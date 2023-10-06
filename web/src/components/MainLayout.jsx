// MainLayout.jsx
import React from 'react';
import Header from './layout/Header';
import DrawerMenu from './layout/Drawer';
import Footer from './layout/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="container-fluid ">
      <div className="row">
        <Header />
        <DrawerMenu className="m-0 p-0"/>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 p-md-0 ">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;





















// // MainLayout.jsx
// import React from 'react';
// import Header from './layout/Header';
// import DrawerMenu from './layout/Drawer';
// import Footer from './layout/Footer';

// const MainLayout = ({ children }) => {
//   return (
//     <div>
//       <Header />
//       <DrawerMenu />
//       <main>{children}</main>
//       <Footer />
//     </div>
//   );
// }

// export default MainLayout;


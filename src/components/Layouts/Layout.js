import React from 'react';
import './Layout.css';

/*
    Layout container which holds the 
    Auto complete search component
*/

const Layout = props => {
  return (
    <div>
      <header />
      <main>{props.children}</main>
      <footer />
    </div>
  );
};

export default Layout;

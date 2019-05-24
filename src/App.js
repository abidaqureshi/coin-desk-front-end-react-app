import React from 'react';
import './App.css';
import Layout from './components/Layouts/Layout'
import Autocomplete from './containers/autcomplete/autocomplete';

class App extends React.PureComponent {

    render() {
      return (
        <Layout>
          <Autocomplete />
        </Layout>
      );
    }
}

export default App;
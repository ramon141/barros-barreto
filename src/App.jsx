import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import "moment/locale/pt-br"
import moment from 'moment';
import { Providers } from './contexts';
moment.locale("pt-br")

function App() {
  return (

    <BrowserRouter>
      <Providers>
        <Routes />
      </Providers>
    </BrowserRouter>
  );
}

export default App;

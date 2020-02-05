import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { routes } from 'routes';
import store from 'store';
import { CatalogView, CheckoutView, OrderPlacedView } from 'views';
import MainTemplate from 'templates/MainTemplate';
import PageHeader from 'components/organisms/PageHeader/PageHeader';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <>
          <PageHeader />
          <Switch>
            <Route exact path={routes.home} component={CatalogView} />
            <Route exact path={routes.checkout} component={CheckoutView} />
            <Route exact path={routes.orderPlaced} component={OrderPlacedView} />
          </Switch>
        </>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default App;

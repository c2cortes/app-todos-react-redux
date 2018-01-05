import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginView from './containers/login_view';
import TodosContainer from './containers/todos_container';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    	<div>
    		<Switch>
		    	<Route path="/login" component={LoginView}/>
		    	<Route path="/todos" component={TodosContainer}/>
          <Route path="/" component={LoginView}/>
		    </Switch>
    	</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));

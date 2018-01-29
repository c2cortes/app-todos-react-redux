import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginView from './containers/auth/login_view';
import TodosList from './containers/todos/todos_list';
import ProjectsList from './containers/projects/projects_list.js';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    	<div>
    		<Switch>
          <Route path="/projects" component={ProjectsList}/>
          <Route path="/todos/:project_id" component={TodosList}/>
          <Route path="/" component={ProjectsList}/>
		    </Switch>
    	</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));

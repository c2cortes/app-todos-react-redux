import { combineReducers } from 'redux';
import AuthReducer from './reducer_auth';
import Todos from './reducer_todos';
import StoreTodo from './reducer_todo';

const rootReducer = combineReducers({
  authState: AuthReducer,
  todos: Todos,
  storeTodo: StoreTodo
});

export default rootReducer;

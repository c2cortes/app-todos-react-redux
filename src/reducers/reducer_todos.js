import { FETCH_TODOS, STORE_TODO } from '../actions/index';

export default function(state = null, action){
	switch (action.type) {
		case FETCH_TODOS:
			return action.payload.data;
		case STORE_TODO:
			return action.payload.data;
	}
	return state;
}
import { STORE_TODO } from '../actions/index';

export default function(state = null, action){
	switch (action.type) {
		case STORE_TODO:
			return action.payload;
	}

	return state;
}
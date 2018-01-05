import { FETCH_TODOS } from '../actions/index';

export default function(state = null, action){
	switch (action.type) {
		case FETCH_TODOS:
			return action.payload.data.data;
	}
	return state;
}
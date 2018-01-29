import { FETCH_PROJECTS, STORE_PROJECT } from '../actions/index';

export default function(state = null, action){
	switch (action.type) {
		case FETCH_PROJECTS:
			return action.payload.data;
		case STORE_PROJECT:
			return action.payload.data;
	}
	return state;
}
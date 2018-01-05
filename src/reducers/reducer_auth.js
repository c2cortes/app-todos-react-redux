import { AUTH } from '../actions/index';

export default function(state = null, action){

	switch (action.type) {
		case AUTH:
		 	state = action.payload;
			return action.payload;
	}

	return state;
}
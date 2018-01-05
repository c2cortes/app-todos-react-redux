import axios from 'axios';

export const AUTH = 'AUTH';
export const FETCH_TODOS = 'FETCH_TODOS';
export const STORE_TODO = 'STORE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const API_URL = 'http://localhost:3000/';

export function fetchTodos(sessionId){
	const url = `${API_URL}todos?sessionId=${sessionId}`;
	const request = axios.get(url);

	return{
		type: FETCH_TODOS,
		payload: request
	}
}

export function storeTodo(sessionId, params){
	const url = `${API_URL}todo?sessionId=${sessionId}`;
	const request = axios.put(url, params);

	return{
		type: STORE_TODO,
		payload: request
	}
}

export function updateTodo(sessionId){
	return{
		type: UPDATE_TODO,
		payload: 'nothing'
	}
}

export function deleteTodo(sessionId, params){
	const url = `${API_URL}todo?sessionId=${sessionId}`;
	const request = axios.delete(url, params);

	console.log(request)
	
	return{
		type: DELETE_TODO,
		payload: 'nothing'
	}
}

export function authAction(username, password){
	const url = `${API_URL}user/auth`;
	const request = axios.post(url, { username: username, password: password })

	return{
		type: AUTH,
		payload: request
	}
}
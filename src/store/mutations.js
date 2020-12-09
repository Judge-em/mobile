export function LOGGING_IN(state, status) {
	state.logging_in = status;
}

export function LOGIN_SUCCESFULL(state, token) {
	state.token = token;
	state.logging_in = false;
}

import {
	TOGGLE_GUESTFILTER,
	SEARCH_GUEST,
	CLEAR_SEARCH,
	REMOVE_GUEST,
	ADD_GUEST,
	EDIT_GUEST,
	CLEAR_EDIT,
	UPDATE_GUEST,
	GET_GUESTS,
	GUESTS_ERROR,
	CLEAR_GUESTS
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_GUESTS:
			return {
				...state,
				guests: action.payload,
				error: null
			};
		case ADD_GUEST:
			return {
				...state,
				guests: [ ...state.guests, action.payload ]
			};
		case REMOVE_GUEST:
			return {
				...state,
				guests: state.guests.filter((guest) => guest._id !== action.payload)
			};
		case EDIT_GUEST:
			return {
				...state,
				editGuest: action.payload
			};
		case CLEAR_EDIT:
			return {
				...state,
				editGuest: null
			};
		case UPDATE_GUEST:
			return {
				...state,
				guests: state.guests.map((guest) => (guest._id === action.payload._id ? action.payload : guest))
			};
		case TOGGLE_GUESTFILTER:
			return {
				...state,
				guestFilter: !state.guestFilter
			};
		case SEARCH_GUEST:
			const regex = new RegExp(`${action.payload}`, 'gi');
			return {
				...state,
				searchGuest: state.guests.filter((guest) => guest.name.match(regex))
			};
		case CLEAR_SEARCH:
			return {
				...state,
				searchGuest: null
			};
		case GUESTS_ERROR:
			return {
				...state,
				error: action.payload
			};
		case CLEAR_GUESTS:
			return {
				...state,
				guestFilter: false,
				searchGuest: null,
				editGuest: null,
				guests: [],
				error: null
			};
		default:
			return state;
	}
};

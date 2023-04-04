// This file sets the values for the various action types in the different authentication processes
import {
  SET_CURRENT_USER,
  USER_LOADING
} from "../actions/types.js";
import isEmpty from "is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
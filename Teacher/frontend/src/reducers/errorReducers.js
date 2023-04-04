//This one is to set the different errors if present in the authentication process
import { GET_ERRORS } from "../actions/types.js";
const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
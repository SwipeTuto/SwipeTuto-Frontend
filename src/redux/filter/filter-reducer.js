import { FilterActionTypes } from './filter-types'

const INITIAL_STATE = {
 cardFilter: '',
 errors: ''
};

const FilterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FilterActionTypes.SEARCH_SUCCESS:
      return { ...state, cardFilter:action.payload};
    case FilterActionTypes.SEARCH_SUCCESS:
      return { ...state, errors: action.payload};

    default:
      return state;
  }
};

export default FilterReducer;
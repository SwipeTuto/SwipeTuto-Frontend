import { FilterActionTypes } from './filter-types'

const INITIAL_STATE = {
  searchType: 'all',
  currentSearch: '',
  errors: '',
  categoryFilter: 'all'
};

const FilterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FilterActionTypes.SEARCH_SUCCESS:
      return { ...state, cardFilter: action.payload };
    case FilterActionTypes.SEARCH_FAILURE:
      return { ...state, errors: action.payload };
    case FilterActionTypes.GET_CART_LANGAGE_SUCESS:
      return { ...state, cardFilter: action.payload };
    case FilterActionTypes.GET_CART_LANGAGE_FAILURE:
      return { ...state, errors: action.payload };
    case FilterActionTypes.SET_CURRENT_SEARCH:
      return { ...state, currentSearch: action.payload };
    case FilterActionTypes.DELETE_CURRENT_SEARCH:
      return { ...state, currentSearch: "" };
    case FilterActionTypes.SET_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: action.payload,
      };
    case FilterActionTypes.SET_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.payload,
      };


    default:
      return state;
  }
};

export default FilterReducer;


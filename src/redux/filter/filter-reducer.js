import { FilterActionTypes } from './filter-types'

const INITIAL_STATE = {
  searchType: '',
  currentSearch: '',
  errors: '',
  categoryFilter: '',
  cardFilter: "",
  totalNumberOfCardsSearched: 0,
  cardsByUser: "",
  isLoaded: true
};

const FilterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //RECHERCHE
    case FilterActionTypes.SEARCH_SUCCESS:
      return { ...state, cardFilter: action.payload.results, totalNumberOfCardsSearched: action.payload.count };
    case FilterActionTypes.SEARCH_FAILURE:
      return { ...state, errors: action.payload };

    case FilterActionTypes.GET_CARDS_LANGAGE_CATEGORY_REQUEST:
      return {
        ...state,
        currentSearch: action.payload.langage,
        categoryFilter: action.payload.category
      };
    case FilterActionTypes.GET_CARDS_LANGAGE_CATEGORY_SUCCESS:
      return { ...state, cardFilter: action.payload, };
    case FilterActionTypes.GET_CARDS_LANGAGE_CATEGORY_FAILURE:
      return { ...state, errors: action.payload };

    case FilterActionTypes.SET_CURRENT_SEARCH:
      return { ...state, currentSearch: action.payload };
    case FilterActionTypes.DELETE_CURRENT_SEARCH:
      return { ...state, currentSearch: "", cardFilter: "" };

    case FilterActionTypes.SET_CATEGORY_FILTER:
      return { ...state, categoryFilter: action.payload, };
    case FilterActionTypes.SET_TYPE:
      return { ...state, searchType: action.payload, };


    case FilterActionTypes.GET_CARDS_BY_USER_SUCCESS:
      return {
        ...state,
        cardsByUser: action.payload,
        cardFilter: action.payload,
      };
    case FilterActionTypes.GET_CARDS_BY_USER_FAILURE:
      return { ...state, errors: action.payload, };

    case FilterActionTypes.SET_TOTAL_NUMBER_OF_CARDS_SEARCHED_TO_NULL:
      return { ...state, totalNumberOfCardsSearched: 0 };



    default:
      return state;
  }
};

export default FilterReducer;


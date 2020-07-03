import { FilterActionTypes } from './filter-types'

const INITIAL_STATE = {
  currentSearch: {
    searchWords: '',
    searchLangage: '',
    searchCategory: '',
    searchOrder: 'chronology'
  },
  errors: '',
  cardsFetched: "",
  otherCardsByAuthor: "",
  currentCardsGridPage: 1,
};

const FilterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //RECHERCHE
    case FilterActionTypes.SEARCH_SUCCESS:
      return { ...state, cardsFetched: action.payload, };
    case FilterActionTypes.SEARCH_FAILURE:
      return { ...state, errors: action.payload };

    case FilterActionTypes.GET_CARDS_LANGAGE_CATEGORY_REQUEST:

      return {
        ...state,
        currentSearch: { ...state.currentSearch, searchLangage: action.payload.langage, searchCategory: action.payload.category }
      };
    case FilterActionTypes.GET_CARDS_LANGAGE_CATEGORY_SUCCESS:
      return { ...state, cardsFetched: action.payload, };
    case FilterActionTypes.GET_CARDS_LANGAGE_CATEGORY_FAILURE:
      return { ...state, errors: action.payload };

    case FilterActionTypes.SET_CURRENT_SEARCH:
      return { ...state, currentSearch: action.payload };
    case FilterActionTypes.DELETE_CURRENT_SEARCH:
      return {
        ...state, currentSearch: {
          searchWords: '',
          searchLangage: '',
          searchCategory: '',
          searchOrder: 'chronology'
        }, cardsFetched: ""
      };

    case FilterActionTypes.SET_SEARCH_ORDER:
      return {
        ...state, currentSearch: {
          ...state.currentSearch,
          searchOrder: action.payload
        }
      };

    case FilterActionTypes.SET_CATEGORY_FILTER:
      return { ...state, currentSearch: { ...state.currentSearch, searchCategory: action.payload }, };


    case FilterActionTypes.GET_CARDS_BY_USER_SUCCESS:
      return {
        ...state,
        cardsFetched: action.payload,
      };
    case FilterActionTypes.GET_CARDS_BY_USER_FAILURE:
      return { ...state, errors: action.payload, };
    case FilterActionTypes.GET_OTHER_CARDS_BY_AUTHOR_SUCCESS:
      return {
        ...state,
        otherCardsByAuthor: action.payload,
      };
    case FilterActionTypes.GET_OTHER_CARDS_BY_USER_FAILURE:
      return { ...state, errors: action.payload, };

    case FilterActionTypes.SET_TOTAL_NUMBER_OF_CARDS_SEARCHED_TO_NULL:
      return { ...state, totalNumberOfCardsSearched: 0 };

    case FilterActionTypes.SET_CARDS_FETCHED_IN_STORE:
      return { ...state, cardsFetched: action.payload.data };

    case FilterActionTypes.GET_OTHER_PAGE_ACTION_SUCCESS:
      return { ...state, cardsFetched: action.payload };

    case FilterActionTypes.GET_OTHER_PAGE_ACTION_FAILURE:
      return { ...state, errors: action.payload };

    case FilterActionTypes.SET_CARDS_GRID_PAGE:
      return { ...state, currentCardsGridPage: action.payload };


    default:
      return state;
  }
};

export default FilterReducer;


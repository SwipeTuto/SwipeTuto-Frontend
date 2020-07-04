import { FilterActionTypes } from './filter-types'

const INITIAL_STATE = {
  currentSearch: {
    searchWords: null,
    searchTopic: null,
    searchCategory: null,
    searchOrder: '-created',
    searchPage: 1,
  },
  errors: '',
  cardsFetched: "",
  otherCardsByAuthor: "",
};

const FilterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //RECHERCHE
    case FilterActionTypes.SEARCH_SUCCESS:
      return { ...state, cardsFetched: action.payload, };
    case FilterActionTypes.SEARCH_FAILURE:
      return { ...state, errors: action.payload };

    case FilterActionTypes.GET_CARDS_TOPIC_CATEGORY_REQUEST:

      return {
        ...state,
        currentSearch: { ...state.currentSearch, searchTopic: action.payload.topic, searchCategory: action.payload.category }
      };
    case FilterActionTypes.GET_CARDS_TOPIC_CATEGORY_SUCCESS:
      return { ...state, cardsFetched: action.payload, };
    case FilterActionTypes.GET_CARDS_TOPIC_CATEGORY_FAILURE:
      return { ...state, errors: action.payload };

    case FilterActionTypes.SET_CURRENT_SEARCH:
      if (action.payload) {
        return {
          ...state, currentSearch: {
            ...state.currentSearch,
            [action.payload.item]: action.payload.value,
          }
        }
      } else {
        return {
          ...state
        }
      };
    case FilterActionTypes.DELETE_CURRENT_SEARCH:
      if (action.payload) {
        return {
          ...state, currentSearch: {
            ...state.currentSearch,
            [action.payload]: null,
          }
        }
      } else {
        return {
          ...state, currentSearch: {
            searchWords: null,
            searchTopic: null,
            searchCategory: null,
            searchOrder: '-created'
          }, cardsFetched: ""
        }
      }

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
      return { ...state, currentSearch: { ...state.currentSearch, searchPage: action.payload } };


    default:
      return state;
  }
};

export default FilterReducer;


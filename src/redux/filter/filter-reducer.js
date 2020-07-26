import { FilterActionTypes } from './filter-types'
import { initialSearchState } from '../../helper/index'

const INITIAL_STATE = {
  currentSearch: initialSearchState,
  cardsFetched: "",
  otherCardsByAuthor: "",
  clickedCard: null,
  errors: null,
};

const FilterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FilterActionTypes.DELETE_FILTER_ERROR:
      return { ...state, errors: null };
    case FilterActionTypes.GET_CARDS_FILTER_SUCCESS:
      return { ...state, cardsFetched: action.payload, };
    case FilterActionTypes.GET_CARDS_FILTER_FAILURE:
      return { ...state, errors: action.payload };

    case FilterActionTypes.SET_CURRENT_SEARCH:
      if ("action payload: dans le reducer" && action.payload) {
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
          ...state, currentSearch: initialSearchState, cardsFetched: ""
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
    case FilterActionTypes.GET_CARD_BY_ID_SUCCESS:
      return {
        ...state,
        clickedCard: action.payload,
      };
    case FilterActionTypes.GET_CARD_BY_ID_FAILURE:
      return { ...state, errors: action.payload, };

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

    case FilterActionTypes.SET_CLICKED_CARD:
      return {
        ...state,
        clickedCard: action.payload,
      };
    case FilterActionTypes.SET_NO_CLICKED_CARD:
      return {
        ...state,
        clickedCard: null,
      };

    case FilterActionTypes.GET_ALL_CARDS_FAILURE:
      return { ...state, errors: action.payload }
    case FilterActionTypes.TOGGLE_LIKE_CARD_SUCCESS:
      return { ...state, errors: null }
    case FilterActionTypes.TOGGLE_LIKE_CARD_ERROR:
      return { ...state, errors: action.payload }

    default:
      return state;
  }
};

export default FilterReducer;


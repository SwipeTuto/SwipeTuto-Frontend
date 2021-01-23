import { FilterActionTypes } from './filter-types'
import { initialSearchState } from '../../helper/index'

const INITIAL_STATE = {
  currentSearch: initialSearchState,
  cardsFetched: null,
  lastCardsFetched: null,
  otherCardsByAuthor: null,
  clickedCard: null,
  clickedCardComments: null,
  lastPublishedComment: null,
  errors: null,
};

const FilterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    // case FilterActionTypes.DELETE_CARDS_IN_STORE:
    //   return { ...state, cardsFetched: "" };
    case FilterActionTypes.DELETE_FILTER_ERROR:
      return { ...state, errors: null };
    case FilterActionTypes.GET_CARDS_FILTER_SUCCESS:
      return { ...state, cardsFetched: action.payload, };
    case FilterActionTypes.GET_CARDS_FILTER_FAILURE:
      return { ...state, errors: action.payload };

    case FilterActionTypes.RESET_CURRENT_SEARCH:
      return {
        ...state, currentSearch: action.payload

      }
    case FilterActionTypes.SET_CURRENT_SEARCH:
      return {
        // ...state, currentSearch: {
        //   ...state.currentSearch,
        //   [action.payload.item]: action.payload.value,
        // }
        ...state, currentSearch: action.payload
      }
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
    case FilterActionTypes.GET_FAVORIES_CARDS_SUCCESS:
      return {
        ...state,
        cardsFetched: action.payload,
      };
    case FilterActionTypes.GET_FAVORIES_CARDS_FAILURE:
      return { ...state, errors: action.payload, };

    case FilterActionTypes.GET_OTHER_CARDS_BY_USER_FAILURE:
      return { ...state, errors: action.payload, };

    case FilterActionTypes.SET_TOTAL_NUMBER_OF_CARDS_SEARCHED_TO_NULL:
      return { ...state, totalNumberOfCardsSearched: 0 };

    case FilterActionTypes.SET_CARDS_FETCHED_IN_STORE:
      return { ...state, cardsFetched: action.payload.data };

    case FilterActionTypes.GET_OTHER_PAGE_ACTION_SUCCESS:
      const flattenArray = state.cardsFetched.results.concat(action.payload.results)
      return {
        ...state,
        lastCardsFetched: action.payload.results,
        cardsFetched: {
          count: action.payload.count,
          next: action.payload.next ? action.payload.next : null,
          previous: action.payload.previous ? action.payload.previous : null,
          results: flattenArray
        }
      };

    case FilterActionTypes.GET_OTHER_PAGE_ACTION_FAILURE:
      return { ...state, errors: action.payload };

    // case FilterActionTypes.SET_CARDS_GRID_PAGE:
    //   return { ...state, currentSearch: { ...state.currentSearch, searchPage: action.payload } };

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
    case FilterActionTypes.TOGGLE_SAVE_CARD_SUCCESS:
      return { ...state, errors: null }
    case FilterActionTypes.TOGGLE_SAVE_CARD_ERROR:
      return { ...state, errors: action.payload }
    case FilterActionTypes.TOGGLE_LIKE_COMMENT_SUCCESS:
      return { ...state, errors: null }
    case FilterActionTypes.TOGGLE_LIKE_COMMENT_ERROR:
      return { ...state, errors: action.payload }

    case FilterActionTypes.ADD_COMMENT_ERROR:
      return { ...state, errors: action.payload }
    case FilterActionTypes.ADD_COMMENT_SUCCESS:
      return { ...state, lastPublishedComment: action.payload, errors: null }

    case FilterActionTypes.FETCH_NEW_COMMENTS_ERROR:
      return { ...state, errors: action.payload }
    case FilterActionTypes.FETCH_NEW_COMMENTS_SUCCESS:
      return { ...state, clickedCardComments: { ...state.clickedCardComments, count: action.payload.count, next: action.payload.next && action.payload.next, results: [...state.clickedCardComments.results, ...action.payload.results] }, errors: null }
    case FilterActionTypes.DELETE_COMMENT_ERROR:
      return { ...state, errors: action.payload }
    case FilterActionTypes.DELETE_COMMENT_SUCCESS:
      return { ...state, errors: null }
    case FilterActionTypes.MODIFY_COMMENT_ERROR:
      return { ...state, errors: action.payload }
    case FilterActionTypes.MODIFY_COMMENT_SUCCESS:
      return { ...state, errors: null }


    case FilterActionTypes.GET_CARD_COMMENTS_SUCCESS:
      return { ...state, clickedCardComments: action.payload, lastPublishedComment: null, errors: null }
    case FilterActionTypes.GET_CARD_COMMENTS_ERROR:
      return { ...state, errors: action.payload }
    // case FilterActionTypes.GET_COMMENT_REPLIES_SUCCESS:
    //   return { ...state, clickedCardComments: action.payload, lastPublishedComment: null, errors: null }
    // case FilterActionTypes.GET_COMMENT_REPLIES_ERROR:
    //   return { ...state, errors: action.payload }

    default:
      return state;
  }
};

export default FilterReducer;


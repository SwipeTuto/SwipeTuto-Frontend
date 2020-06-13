import { FilterActionTypes } from './filter-types'

const INITIAL_STATE = {
  searchType: '',
  currentSearch: '',
  errors: '',
  categoryFilter: '',
  cardFilter: "",
  activeClass: "all",
};

const FilterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //RECHERCHE
    case FilterActionTypes.SEARCH_SUCCESS:
      return { ...state, cardFilter: action.payload };
    case FilterActionTypes.SEARCH_FAILURE:
      return { ...state, errors: action.payload };

    case FilterActionTypes.GET_CARDS_LANGAGE_CATEGORY_REQUEST:
      var categoryOrLangage = action.payload.category || action.payload.langage;
      console.log(action.payload.langage)
      // if ()
  
      return {
        ...state, 
        currentSearch: action.payload.langage,
        activeClass: categoryOrLangage ,
        categoryFilter: action.payload.category 
      };

    
    case FilterActionTypes.GET_CARDS_LANGAGE_CATEGORY_SUCCESS:
      return { ...state, cardFilter: action.payload };
    case FilterActionTypes.GET_CARDS_LANGAGE_CATEGORY_FAILURE:
      return { ...state, errors: action.payload };

    case FilterActionTypes.SET_CURRENT_SEARCH:
      return { ...state, currentSearch: action.payload };
    case FilterActionTypes.DELETE_CURRENT_SEARCH:
      return { ...state, currentSearch: "" };

    case FilterActionTypes.SET_CATEGORY_FILTER:
      return { ...state,categoryFilter: action.payload,};
    case FilterActionTypes.SET_TYPE:
      return {...state, searchType: action.payload,};
      case FilterActionTypes.SET_ACTIVE:
        return {...state, cardFilter: action.payload,};



    default:
      return state;
  }
};

export default FilterReducer;


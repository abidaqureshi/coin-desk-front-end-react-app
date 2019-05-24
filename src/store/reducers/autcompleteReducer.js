import * as actionTypes from '../actions/autocompleteActionTypes';

const initalState = {

                        currency_codes:[], 
                        suggestions:[],
                        currency_details:{},
                        monthly_details:{}

}

const reducer = (state = initalState, action ) => {


        switch(action.type) {


            case actionTypes.UPDATE_SEARCH_RESULTS:
            return {
                        ...state,
                        suggestions:[
                                    ...action.payload
                        ]
            }  

            case actionTypes.GET_CURRENCY_CODE:
            return {
                        ...state,
                        currency_codes:[
                                    ...action.payload
                        ]
            }    
            case actionTypes.SHOW_CURRENCY_DETAILS:
            return {

                        ...state,
                        currency_details:{
                                ...action.payload
                        }
            }
            case actionTypes.SHOW_CURRENCY_MONTHLY_DETAILS:
            return {

                        ...state,
                        monthly_details:{
                                ...action.payload
                        }
            }
            default:
            return state;    
        }
}

export default reducer;
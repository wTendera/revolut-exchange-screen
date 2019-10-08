export default function exchangeRates(state = {}, action) {
    switch (action.type) {
      case 'CURRENCIES_FETCH_SUCCEEDED':
        console.log("fetch succeded", action);
        return {
            ...state,
            ...action.payload
        }
      case 'CURRENCIES_FETCH_FAILED':
        console.log("currencies fetch failed", action);
        return state
      default:
        return state
    }
  }
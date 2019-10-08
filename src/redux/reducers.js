export default function exchangeRates(state = {}, action) {
    switch (action.type) {
      case 'CURRENCIES_FETCH_SUCCEEDED':
        return {
            ...state,
            currencies: {...action.currencies}
        }
      case 'CURRENCIES_FETCH_FAILED':
        return state
      default:
        return state
    }
  }
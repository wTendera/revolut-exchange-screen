export default function exchangeRates(state = {
  balances: {
    'USD': 0,
    'EUR': 20.56,
    'GBP': 2.45,
  }
}, action) {
    switch (action.type) {
      case 'CURRENCIES_FETCH_SUCCEEDED':
        return {
            ...state,
            currencies: {...action.currencies}
        }
      case 'CURRENCIES_FETCH_FAILED':
        return state
      case 'CURRENCIES_BALANCES_UPDATED': 
        return {
          ...state,
          balances: {...action.balances}
        }
      default:
        return state
    }
  }

const { REACT_APP_EXCHANGE_ID } = process.env;
const ExchangeAPI = {
    fetchCurrencies: async () => {
        let fetchRes = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${REACT_APP_EXCHANGE_ID}&base=EUR`)
        if (fetchRes.ok) { 
            let json = await fetchRes.json();
            return json.rates;
        } 
        return null;
    }
}

export default ExchangeAPI;
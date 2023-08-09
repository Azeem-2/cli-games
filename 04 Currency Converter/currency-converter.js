export class CurrencyConverter {
    rates;
    constructor(rates) {
        this.rates = rates;
    }
    convert(amount, fromCurrency, toCurrency) {
        const fromRate = this.rates[fromCurrency];
        const toRate = this.rates[toCurrency];
        return amount * toRate / fromRate;
    }
}

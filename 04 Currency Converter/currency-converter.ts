export class CurrencyConverter {
    rates: {[key: string]: number};

    constructor(rates: {[key: string]: number}) {
        this.rates = rates;
    }

    convert(amount: number, fromCurrency: string, toCurrency: string): number {
        const fromRate = this.rates[fromCurrency];
        const toRate = this.rates[toCurrency];
        return amount * toRate / fromRate;
    }
}

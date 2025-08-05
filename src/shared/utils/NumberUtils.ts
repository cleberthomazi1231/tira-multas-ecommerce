export default class NumberUtils {
    static formatCurrency(value: number): string {
        return `R$ ${Intl.NumberFormat('pt-br', {
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)}`;
    }
}
export default class TextUtils {
    static removeCharacters(value: string) {
        const newValue = value.replace(/[^a-zA-Z0-9]/g, '');
        return newValue;
    }

    static convertEventStatus(value: string) {
        switch (value) {
            case 'APPROVED':
                return 'Aprovado';
            case 'DENIED':
                return 'Negado';
            case 'CANCELED':
                return 'Cancelado';
            default:
                return 'Pendente';
        }
    }

    static convertEventStatusColor(value: string) {
        switch (value) {
            case 'INITIALIZED':
                return 'green.500';
            case 'CANCELED':
                return 'red.500';
            case 'FINISHED':
                return 'purple.500';
            default:
                return 'yellow.500';
        }
    }

    static formatCurrency(value: number) {
        return Intl.NumberFormat('pt', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }
}

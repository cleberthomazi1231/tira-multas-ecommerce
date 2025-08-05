export default class StringUtils {
    static onlyNumber(value: string) {
        if(!value) return '';
        return String(value).replace(/[^0-9]/g, '');
    }

    static convertStatus(status: string) {
        const data: any= {
            'APPROVED': 'Aprovado',
            'PENDING': 'Ag. Pagamento',
            'DENIED': 'Negado',
        };

        return data[status];
    }

    static getResourceFlagValue(resource: any, flag: string) {
        if(!resource || !flag) return false;
        return resource.fields.find((field: any) => field.flag.includes(flag)).options[0].value;//;
    }
}
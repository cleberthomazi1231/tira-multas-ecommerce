export default class DateUtils {
    static convertDate(value: string): string {
        if (value) {
            return `${value.split('/')[2]}-${value.split('/')[1]}-${
                value.split('/')[0]
            }`;
        }

        return '';
    }
}

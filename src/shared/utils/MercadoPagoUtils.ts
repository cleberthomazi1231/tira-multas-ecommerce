interface CardDataToken {
    docType?: 'CPF';
    docNumber: string;
    cardholderName: string;
    cardNumber: string;
    securityCode: string;
    cardExpirationMonth: string;
    cardExpirationYear: string;
}

interface MercadoPagoTokenResponse {
    error: boolean;
    token?: string;
    message_error?: string;
}

interface MercadoPagoResponse {
    isError: boolean;
    token?: string;
    errorMessage?: string;
}

export default class MercadoPagoUtils {
    static createToken = async ({
        docType = 'CPF',
        docNumber,
        cardholderName,
        cardNumber,
        securityCode,
        cardExpirationMonth,
        cardExpirationYear
    }: CardDataToken): Promise<MercadoPagoTokenResponse> => {
        (window as any).Mercadopago.clearSession();

        const response = await new Promise((resolve: any) => {
            (window as any).Mercadopago.createToken(
                {
                    docType,
                    docNumber,
                    cardholderName,
                    cardNumber,
                    securityCode,
                    cardExpirationMonth,
                    cardExpirationYear
                },
                (
                    status: number,
                    responseMercadopago: any
                ): MercadoPagoTokenResponse => {
                    const result: MercadoPagoTokenResponse = {
                        error: true,
                        message_error: ''
                    };

                    if (status !== 200 && status !== 201) {
                        if (status === 400) {
                            responseMercadopago.cause.forEach((item: any) => {
                                if (item.code === '205' || item.code === 'E301') {
                                    result.message_error =
                    'Número de cartão incorreto e ou inválido';
                                }

                                if (item.code === '208' || item.code === '325') {
                                    result.message_error =
                    'Mês de validade do cartão incorreto e ou inválido';
                                }

                                if (item.code === '209' || item.code === '326') {
                                    result.message_error =
                    'Ano da validade do cartão incorreto e ou inválido';
                                }

                                if (item.code === '224' || item.code === 'E302') {
                                    result.message_error =
                    'Código de segurança do cartão incorreto e ou inválido';
                                }

                                if (item.code === '321' || item.code === '316') {
                                    result.message_error =
                    'Código de segurança do cartão incorreto e ou inválido';
                                }
                            });
                        }
                    } else {
                        result.error = false;
                        result.token = responseMercadopago.id;
                    }

                    return resolve(result);
                }
            );
        });

        return response as MercadoPagoTokenResponse;
    };

    static validateCreditcardData = async (
        data: any
    ): Promise<MercadoPagoResponse> => {
        const mercadopagoResponse = await MercadoPagoUtils.createToken({
            docNumber: data.card.document.replace(/\D/g, ''),
            cardholderName: data.card.cardholder_name,
            cardNumber: data.card.card_number.replace(/\D/g, ''),
            securityCode: data.card.security_code,
            cardExpirationMonth: data.card.expiration_month,
            cardExpirationYear: data.card.expiration_year
        });

        return {
            isError: mercadopagoResponse.error,
            token: mercadopagoResponse.token || '',
            errorMessage: mercadopagoResponse.message_error || ''
        };
    };
}

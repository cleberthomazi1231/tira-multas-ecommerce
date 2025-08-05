import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import { FiCopy, FiEdit, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { z, ZodError } from 'zod';

import {
    Box,
    Flex,
    Icon,
    Image,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import { FormHandles } from '@unform/core';

import apiBackend from '../../../../shared/apis';
import Button from '../../../../shared/components/Button';
import Form from '../../../../shared/components/Form';
import Input from '../../../../shared/components/Input';
import InputCurrency from '../../../../shared/components/InputCurrency';
import Select from '../../../../shared/components/Select';
import TextArea from '../../../../shared/components/TextArea';
import TextEditor from '../../../../shared/components/TextEditor';
import ModalEditFlag from '../../components/ModalEditFlag';

const ProductsRegisterPage: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const toast = useToast();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [fields, setFields] = useState<any[]>([
        {
            field: 'Orgão do Autuador',
            type: 'TEXT',
            default: false,
            options: [
                {
                    value: '',
                    anexo: '',
                    relation: 'PARAGRAPH'
                }
            ],
            flag: '{{ ORGAO_AUTUADOR }}',
            edit: true
        },
        {
            field: 'Código do Artigo',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ CODIGO_ARTIGO }}',
            edit: true
        },
        {
            field: 'Código da Ficha',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ CODIGO_FICHA }}',
            edit: true
        },
        {
            field: 'Instância',
            type: 'MULTISELECT',
            default: true,
            options: [
                {
                    value: 'Defesa Prévia',
                    anexo: ''
                },
                {
                    value: 'Recurso Jari',
                    anexo: ''
                },
                {
                    value: 'Cetran',
                    anexo: ''
                }
            ],
            flag: '{{ INSTANCIA }}',
            value: '',
            edit: true
        },
        {
            field: 'Série Infração',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ SERIE_INFRACAO }}'
        },
        {
            field: 'Nome do Recorrente',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ NOME_RECORRENTE }}'
        },
        {
            field: 'Habilitação do Recorrente',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ HABILITACAO_RECORRENTE }}'
        },
        {
            field: 'CPF do Recorrente',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ CPF_RECORRENTE }}'
        },
        {
            field: 'Nome do Procurador',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ NOME_PROCURADOR }}'
        },
        {
            field: 'CPF do Procurador',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ CPF_PROCURADOR }}'
        },
        {
            field: 'Motivo da Multa',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ MOTIVO_MULTA }}'
        },
        {
            field: 'DESEJA DESCREVER OS FATOS OCORRIDOS NO DIA DA AUTUAÇÃO? APONTAR ALGUMA IRREGULARIDADE?',
            type: 'SELECT',
            options: [
                {
                    value: 'SIM, QUERO DESCREVER.  ',
                    anexo: '',
                    relation: 'OPEN_FIELD'
                },
                {
                    value: 'NÃO, EU QUERO A DESCRIÇÃO PADRÃO. ',
                    anexo: '<p class="MsoQuote" style="text-align: left; line-height: 150%; mso-outline-level: 1; margin: 6.0pt 0cm 3.0pt 0cm;" align="left" data-mce-style="text-align: left; line-height: 150%; mso-outline-level: 1; margin: 6.0pt 0cm 3.0pt 0cm;"><strong><span style="font-size: 12.0pt; line-height: 150%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; line-height: 150%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;">DOS FATOS</span></strong><span style="font-size: 12.0pt; line-height: 150%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; line-height: 150%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;"> </span></p><p class="MsoBodyText" style="margin-top: 6.0pt; text-indent: 35.45pt; line-height: 150%;" data-mce-style="margin-top: 6.0pt; text-indent: 35.45pt; line-height: 150%;"><span style="font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">O condutor foi autuado por dirigir sem atenção indispensável à Segurança no Trânsito, artigo 169, ficha de autuação 520-71, e por não concordar com a autuação em questão vem respeitosamente perante este órgão de trânsito apresentar a presente impugnação administrativa.</span></p><p class="MsoBodyText" style="margin-top: 6.0pt; text-indent: 35.45pt; line-height: 150%;" data-mce-style="margin-top: 6.0pt; text-indent: 35.45pt; line-height: 150%;"><span style="font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">Dessa forma, pelos fundamentos apresentados nas preliminares, bem como do direito do recorrente, a autuação em questão deve ser anulada.</span></p>',
                    relation: 'PARAGRAPH'
                }
            ],
            flag: '{{ DESEJA_DESCREVER_OS_FATOS_OCORRIDOS_NO_DIA_DA_AUTUACO_APONTAR_ALGUMA_IRREGULARIDADE }}',
            default: true,
            edit: true
        },
        {
            field: 'RECEBEU A NOTIFICAÇÃO PADRÃO DO DETRAN, OU POR MEIO DO SISTEMA NACIONAL DE NOTIFICAÇÃO ELETRÔNICA?',
            type: 'SELECT',
            options: [
                {
                    value: 'SIM, RECEBI. ',
                    anexo: '',
                    relation: ''
                },
                {
                    value: 'NÃO RECEBI. ',
                    anexo: '<p class="MsoQuote" style="text-align: left; line-height: 150%; mso-outline-level: 2; margin: 0cm 0cm 6.0pt 0cm;" align="left" data-mce-style="text-align: left; line-height: 150%; mso-outline-level: 2; margin: 0cm 0cm 6.0pt 0cm;"><strong><span style="font-size: 12.0pt; line-height: 150%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; line-height: 150%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;">DA FALTA DE NOTIFICAÇÃO</span></strong></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">O RECORRENTE jamais fora notificado da autuação, em total descumprimento da legislação vigente. Além do Código de Trânsito Brasileiro prever em seu artigo 281 parágrafo único inciso II, a jurisprudência tem esse mesmo entendimento. O Superior Tribunal de Justiça visando deixar claro essa necessidade gerou a Súmula 312, onde restou claro a necessidade de notificar, vejamos:</span></p><p class="MsoNormal" style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;" data-mce-style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin; mso-bidi-font-weight: bold; mso-bidi-font-style: italic;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin; mso-bidi-font-weight: bold; mso-bidi-font-style: italic;">Súmula 312 - No processo administrativo para imposição de multa de trânsito, são necessárias as notificações da autuação e da aplicação da pena decorrente da infração.</span></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">O órgão fiscalizador não notificou em nenhum momento referente a infração emitida ora contestada. </span></p><p class="MsoNormal" style="text-align: justify; text-indent: 99.25pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 99.25pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">&nbsp;</span></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">A falta de notificação do condutor trata-se de total desrespeito ao art. 281, inciso II, do CTB, que disciplina a necessidade de emissão da notificação dentro do prazo de 30 dias.</span><strong style="mso-bidi-font-weight: normal;" data-mce-style="mso-bidi-font-weight: normal;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;"> </span></strong></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Como se pode ver na jurisprudência, no Recurso Cível Nº 71007492887, da Turma Recursal da Fazenda Pública, Julgado em 29/11/2018, o Relator Des. Volnei dos Santos Coelho citou que o “. O Código de Trânsito Brasileiro prevê duas notificações, a primeira da notificação (art. 280) e a segunda notificação, informando do prosseguimento do processo, a fim de que a parte ofereça defesa da sanção aplicada (art. 281).” No Recurso Cível Nº 71007962053 da Segunda Turma Recursal da Fazenda Pública, Julgado em 28/11/2018, o relator Des. Mauro Caum Gonçalves citou em seu julgado que “Nos termos da Súmula 312 do STJ, é obrigatória a existência de uma notificação em relação à autuação da infração de trânsito e de outra notificação acerca da imposição da respectiva penalidade, possibilitando a ampla defesa do notificado, tudo em atenção ao princípio do devido processo legal. As notificações enviadas apenas para o endereço do proprietário não dispensam a notificação do condutor”.<span style="mso-spacerun: yes;" data-mce-style="mso-spacerun: yes;">&nbsp; </span>Dessa forma esses julgados corroboram com a tese de que a infração que não notificou de forma satisfatória o condutor deve ser arquivada.</span></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">A falta de notificação descumpre não somente a legislação de trânsito, como a carta magna Brasileira que prevê o devido processo legal e o direito ao contraditório e ampla defesa.</span></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">A infração ora contestada está causando prejuízos ao recorrente, dessa maneira, impossível impor pena sem o devido processo legal, e com isso deve ser arquivada de fato, não gerando impeditivos tampouco cobranças ao recorrente.</span></p>',
                    relation: 'PARAGRAPH'
                },
                {
                    value: 'NÃO SEI SE RECEBI. ',
                    anexo: '',
                    relation: ''
                }
            ],
            flag: '{{ RECEBEU_A_NOTIFICACO_PADRO_DO_DETRAN_OU_POR_MEIO_DO_SISTEMA_NACIONAL_DE_NOTIFICACO_ELETRNICA }}',
            default: true,
            edit: true
        },
        {
            field: 'A PRIMEIRA NOTIFICAÇÃO FOI POSTADA DENTRO DOS 30 DIAS DO COMETIMENTO DA INFRAÇÃO?',
            type: 'SELECT',
            options: [
                {
                    value: 'FOI POSTADA DENTRO DOS 30 DIAS. ',
                    anexo: '',
                    relation: ''
                },
                {
                    value: 'NÃO SEI, MAS ACHO QUE FOI FEITO APÓS 30 DIAS. ',
                    anexo: '',
                    relation: ''
                },
                {
                    value: 'FOI POSTADA APÓS 30 DIAS.',
                    anexo: '<p class="MsoQuote" style="text-align: left; line-height: 150%; mso-outline-level: 2; margin: 0cm 0cm 6.0pt 0cm;" align="left" data-mce-style="text-align: left; line-height: 150%; mso-outline-level: 2; margin: 0cm 0cm 6.0pt 0cm;"><strong><span style="font-size: 12.0pt; line-height: 150%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; line-height: 150%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;">DA FALHA DE NOTIFICAÇÃO (NÃO ENVIADO DENTRO DO PRAZO LEGAL)</span></strong></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">A Notificação emitida e enviada ao proprietário fora do prazo previsto em lei, ato que inviabiliza sua imposição de penalidade. </span></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">A falta de notificação dentro do prazo previsto no art. 281, inciso II, do CTB, que disciplina a necessidade de emissão da notificação dentro do prazo de 30 dias e também, desrespeito ao entendimento já firmado sobre esse assunto, vejamos:</span></p><p class="MsoNormal" style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;" data-mce-style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Art. 281. A autoridade de trânsito, na esfera da competência estabelecida neste Código e dentro de sua circunscrição, julgará a consistência do auto de infração e aplicará a penalidade cabível.</span></p><p class="MsoNormal" style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;" data-mce-style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Parágrafo único<strong>. O auto de infração será arquivado e seu registro julgado insubsistente:</strong></span></p><p class="MsoNormal" style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;" data-mce-style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">I - se considerado inconsistente ou irregular;</span></p><p class="MsoNormal" style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;" data-mce-style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;"><strong style="mso-bidi-font-weight: normal;" data-mce-style="mso-bidi-font-weight: normal;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">II - se, no prazo máximo de trinta dias, não for expedida a notificação da autuação.<span style="mso-spacerun: yes;" data-mce-style="mso-spacerun: yes;">&nbsp; </span></span></strong></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Dessa forma a lei de trânsito, bem como toda a jurisprudência tem o mesmo entendimento com a tese de que a infração que não notificou de forma satisfatória o condutor deve ser arquivada.</span></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">A autuação em tela não teve sua emissão de notificação válida, conforme já mencionada acima, e com isso deve ser arquivada e não gerar mais punições ao proprietário e/ou condutor, nem valor a pagar, nem pontuação.</span></p>',
                    relation: 'PARAGRAPH'
                }
            ],
            flag: '{{ A_PRIMEIRA_NOTIFICACO_FOI_POSTADA_DENTRO_DOS_30_DIAS_DO_COMETIMENTO_DA_INFRACO }}',
            default: true,
            edit: true
        },
        {
            field: 'A AUTUAÇÃO FOI EMITIDA PELA PRF, EM VIAS ESTADUAL OU MUNICIPAL?',
            type: 'SELECT',
            options: [
                {
                    value: 'SIM.',
                    anexo: '<p class="MsoQuote" style="text-align: left; line-height: 150%; mso-outline-level: 2; margin: 0cm 0cm 6.0pt 0cm;" align="left" data-mce-style="text-align: left; line-height: 150%; mso-outline-level: 2; margin: 0cm 0cm 6.0pt 0cm;"><strong><span style="font-size: 12.0pt; line-height: 150%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; line-height: 150%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;">DA COMPETÂNCIA da PRF</span></strong></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Para descrever a respeito das competências da Polícia Rodoviária Federal trago um trecho da Resolução nº 289, de 29 de agosto de 2008.</span></p><p class="MsoNormal" style="text-align: justify;" data-mce-style="text-align: justify;"><br data-mce-bogus="1"></p><p class="MsoNormal" style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;" data-mce-style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Dispõe sobre normas de atuação a serem adotadas pelo Departamento Nacional de Infra-Estrutura de Transportes - DNIT e o Departamento de Polícia Rodoviária Federal - DPRF na fiscalização do trânsito nas rodovias federais.</span></p><p class="MsoNormal" style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;" data-mce-style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">O CONSELHO NACIONAL DE TRÂNSITO - CONTRAN, usando da competência que lhe confere o art. 12, inciso I, da Lei nº 9.503, de 23 de setembro de 1997, que instituiu o Código de Trânsito Brasileiro - CTB, e conforme Decreto n° 4.711, de 29 de maio de 2003, que trata da coordenação do Sistema Nacional de Trânsito,</span></p><p class="MsoNormal" style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;" data-mce-style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Considerando a necessidade de intensificar a fiscalização do trânsito nas rodovias federais, objetivando a redução dos altos índices de acidentes e a conservação do pavimento, coibindo o desrespeito aos limites de velocidades e o tráfego de veículos com excesso de peso.</span></p><p class="MsoNormal" style="text-align: justify;" data-mce-style="text-align: justify;"><span style="font-size: 12.0pt; line-height: 107%;" data-mce-style="font-size: 12.0pt; line-height: 107%;">Considerando o disposto no inciso XIV do artigo 12 do CTB, resolve:</span></p><p class="MsoNormal" style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;" data-mce-style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Art. 1° Compete ao Departamento Nacional de Infra-Estrutura de Transportes - DNIT, Órgão Executivo Rodoviário da União, no âmbito de sua circunscrição:</span></p><p class="MsoNormal" style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;" data-mce-style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">I - exercer a fiscalização do excesso de peso dos veículos nas rodovias federais, aplicando aos infratores as penalidades previstas no Código de Trânsito Brasileiro – CTB, respeitadas as competências outorgadas à Agência Nacional de Transportes Terrestres - ANTT pelos arts. 24, inciso XVII, e 82, § 1º, da Lei nº 10.233, de 5 de junho de 2001, com a redação dada pela Lei nº 10.561, de 13 de novembro de 2002; e</span></p><p class="MsoNormal" style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;" data-mce-style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">II - exercer a fiscalização eletrônica de velocidade nas rodovias federais, utilizando instrumento ou redutor eletrônico de velocidade tipo fixo, assim como a engenharia de tráfego para implantação de novos pontos de redução de velocidade.</span></p><p class="MsoNormal" style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;" data-mce-style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Art. 2º Compete ao Departamento de Polícia Rodoviária Federal - DPRF:</span></p><p class="MsoNormal" style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;" data-mce-style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">I - exercer a fiscalização por excesso de peso nas rodovias federais, isoladamente, ou a título de apoio operacional ao DNIT, aplicando aos infratores as penalidades previstas no CTB; e</span></p><p class="MsoNormal" style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;" data-mce-style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;"><span style="mso-spacerun: yes;" data-mce-style="mso-spacerun: yes;">&nbsp;</span>II - exercer a fiscalização eletrônica de velocidade nas rodovias federais com a utilização de instrumento ou medidor de velocidade do tipo portátil, móvel, estático e fixo, exceto redutor de velocidade, aplicando aos infratores as penalidades previstas no Código de Trânsito Brasileiro – CTB.</span></p><p class="MsoNormal" style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;" data-mce-style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Parágrafo único. Para a instalação de equipamento do tipo fixo de controle de velocidade, o DPRF solicitará ao DNIT a autorização para intervenção física na via. </span></p><p class="MsoNormal" style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;" data-mce-style="text-align: justify; line-height: 150%; margin: 6.0pt 0cm 6.0pt 127.6pt;"><span style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">&nbsp;</span></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Fica evidenciado que a COMPETÊNCIA da PRF está circunscrita as RODOVIAS FEDERAIS, local para o qual está apta a realizar atos fiscalizatórios, autuações e imposições de penalidade por ato de infração de trânsito. </span></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Ocorre que a autuação em questão ocorreu em via que não é de jurisdição federal, e portanto apresenta inconsistências visíveis descaracterizando-a como ato revestido de legalidade, o que não se espera de um ato administrativo.</span></p>',
                    relation: 'PARAGRAPH'
                },
                {
                    value: 'NÃO.',
                    anexo: '',
                    relation: ''
                }
            ],
            flag: '{{ A_AUTUACO_FOI_EMITIDA_PELA_PRF_EM_VIAS_ESTADUAL_OU_MUNICIPAL }}',
            default: true,
            edit: true
        },
        {
            field: 'A AUTUAÇÃO POSSUI FOTO DO VEÍCULO OU A DESCRIÇÃO DO VEÍCULO DIFERENTE DO SEU?',
            type: 'SELECT',
            options: [
                {
                    value: 'Não, as informações na multa estão iguais ao documento do meu veículo. ',
                    anexo: '',
                    relation: ''
                },
                {
                    value: 'Sim, tenho um CARRO e na multa consta um CAMINHÃO.',
                    anexo: '<p class="MsoQuote" style="margin-left: 0cm; text-align: left; mso-outline-level: 2;" align="left" data-mce-style="margin-left: 0cm; text-align: left; mso-outline-level: 2;"><strong><span style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;">DA PROVA DE INEXISTÊNCIA DO ATO INFRACIONAL</span></strong></p><p class="MsoNormal" style="text-align: justify; text-indent: 35.45pt; line-height: 150%; margin: 6.0pt 0cm 6.0pt 0cm;" data-mce-style="text-align: justify; text-indent: 35.45pt; line-height: 150%; margin: 6.0pt 0cm 6.0pt 0cm;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">A imagem colecionada pelo órgão autuador dá conta de que a infração em questão não foi cometida pelo ora recorrente. A imagem constante da NOTIFICAÇÃO DE AUTUAÇÃO demonstra a imagem de um caminhão, e o veículo em questão, autuado, é um carro. Assim, o veículo da imagem é diferente do veículo do REQUERENTE, demonstrando de forma clara a falha do agente autuador.</span></p><p class="MsoNormal" style="text-align: justify; text-indent: 35.45pt; line-height: 150%; margin: 6.0pt 0cm 6.0pt 0cm;" data-mce-style="text-align: justify; text-indent: 35.45pt; line-height: 150%; margin: 6.0pt 0cm 6.0pt 0cm;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Nesse sentido, nem há que se falar em autuação, visto que o auto de infração é totalmente nulo.</span></p>',
                    relation: 'PARAGRAPH'
                },
                {
                    value: 'Sim, tenho um CAMINHÃO e na multa consta um CARRO ',
                    anexo: '<p class="MsoQuote" style="margin-left: 0cm; text-align: left; mso-outline-level: 2;" align="left" data-mce-style="margin-left: 0cm; text-align: left; mso-outline-level: 2;"><strong><span style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;">DA PROVA DE INEXISTÊNCIA DO ATO INFRACIONAL</span></strong></p><p class="MsoNormal" style="text-align: justify; text-indent: 35.45pt; line-height: 150%; margin: 6.0pt 0cm 6.0pt 0cm;" data-mce-style="text-align: justify; text-indent: 35.45pt; line-height: 150%; margin: 6.0pt 0cm 6.0pt 0cm;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">A imagem colecionada pelo órgão autuador dá conta de que a infração em questão não foi cometida pelo ora recorrente. A imagem constante da NOTIFICAÇÃO DE AUTUAÇÃO demonstra a imagem de um carro, e o veículo em questão, autuado, é um caminhão. Assim, o veículo da imagem é diferente do veículo do REQUERENTE, demonstrando de forma clara a falha do agente autuador.</span></p><p class="MsoNormal" style="text-align: justify; text-indent: 35.45pt; line-height: 150%; margin: 6.0pt 0cm 6.0pt 0cm;" data-mce-style="text-align: justify; text-indent: 35.45pt; line-height: 150%; margin: 6.0pt 0cm 6.0pt 0cm;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Nesse sentido, nem há que se falar em autuação, visto que o auto de infração é totalmente nulo.</span></p>',
                    relation: 'PARAGRAPH'
                },
                {
                    value: 'Sim, tenho um CAMINHÃO e na multa consta uma MOTO ',
                    anexo: '<p class="MsoQuote" style="margin-left: 0cm; text-align: left; mso-outline-level: 2;" align="left" data-mce-style="margin-left: 0cm; text-align: left; mso-outline-level: 2;"><strong><span style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;">DA PROVA DE INEXISTÊNCIA DO ATO INFRACIONAL</span></strong></p><p class="MsoNormal" style="text-align: justify; text-indent: 35.45pt; line-height: 150%; margin: 6.0pt 0cm 6.0pt 0cm;" data-mce-style="text-align: justify; text-indent: 35.45pt; line-height: 150%; margin: 6.0pt 0cm 6.0pt 0cm;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">A imagem colecionada pelo órgão autuador dá conta de que a infração em questão não foi cometida pelo ora recorrente. A imagem constante da NOTIFICAÇÃO DE AUTUAÇÃO demonstra a imagem de uma motocicleta, e o veículo em questão, autuado, é um caminhão. Assim, o veículo da imagem é diferente do veículo do REQUERENTE, demonstrando de forma clara a falha do agente autuador.</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-ansi-language: PT-BR; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;" data-mce-style="font-size: 12.0pt; line-height: 107%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-ansi-language: PT-BR; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Nesse sentido, nem há que se falar em autuação, visto que o auto de infração é totalmente nulo.</span></p>',
                    relation: 'PARAGRAPH'
                },
                {
                    value: 'Sim, tenho uma MOTO e na multa consta um CAMINHÃO',
                    anexo: '<p class="MsoQuote" style="margin-left: 0cm; text-align: left; mso-outline-level: 2;" align="left" data-mce-style="margin-left: 0cm; text-align: left; mso-outline-level: 2;"><strong><span style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;">DA PROVA DE INEXISTÊNCIA DO ATO INFRACIONAL</span></strong></p><p class="MsoNormal" style="text-align: justify; text-indent: 35.45pt; line-height: 150%; margin: 6.0pt 0cm 6.0pt 0cm;" data-mce-style="text-align: justify; text-indent: 35.45pt; line-height: 150%; margin: 6.0pt 0cm 6.0pt 0cm;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">A imagem colecionada pelo órgão autuador dá conta de que a infração em questão não foi cometida pelo ora recorrente. A imagem constante da NOTIFICAÇÃO DE AUTUAÇÃO demonstra a imagem de um caminhão, e o veículo em questão, autuado, é uma motocicleta. Assim, o veículo da imagem é diferente do veículo do REQUERENTE, demonstrando de forma clara a falha do agente autuador.</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-ansi-language: PT-BR; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;" data-mce-style="font-size: 12.0pt; line-height: 107%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-ansi-language: PT-BR; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Nesse sentido, nem há que se falar em autuação, visto que o auto de infração é totalmente nulo.</span></p>',
                    relation: 'PARAGRAPH'
                },
                {
                    value: 'Sim, tenho uma MOTO e na multa consta um CARRO ',
                    anexo: '<p class="MsoQuote" style="margin-left: 0cm; text-align: left; mso-outline-level: 2;" align="left" data-mce-style="margin-left: 0cm; text-align: left; mso-outline-level: 2;"><strong><span style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;">DA PROVA DE INEXISTÊNCIA DO ATO INFRACIONAL</span></strong></p><p class="MsoNormal" style="text-align: justify; text-indent: 35.45pt; line-height: 150%; margin: 6.0pt 0cm 6.0pt 0cm;" data-mce-style="text-align: justify; text-indent: 35.45pt; line-height: 150%; margin: 6.0pt 0cm 6.0pt 0cm;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">A imagem colecionada pelo órgão autuador dá conta de que a infração em questão não foi cometida pelo ora recorrente. A imagem constante da NOTIFICAÇÃO DE AUTUAÇÃO demonstra a imagem de um carro, e o veículo em questão, autuado, é uma motocicleta. Assim, o veículo da imagem é diferente do veículo do REQUERENTE, demonstrando de forma clara a falha do agente autuador.</span></p><p><span style="font-size: 12.0pt; line-height: 107%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-ansi-language: PT-BR; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;" data-mce-style="font-size: 12.0pt; line-height: 107%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; mso-font-kerning: 0pt; mso-ligatures: none; mso-ansi-language: PT-BR; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Nesse sentido, nem há que se falar em autuação, visto que o auto de infração é totalmente nulo.</span></p>',
                    relation: 'PARAGRAPH'
                }
            ],
            flag: '{{ A_AUTUACO_POSSUI_FOTO_DO_VECULO_OU_A_DESCRICO_DO_VECULO_DIFERENTE_DO_SEU }}',
            default: true,
            edit: true
        },
        {
            field: 'O ENDEREÇO DA MULTA EXISTE, OU ESTÁ CORRETO? ',
            type: 'SELECT',
            options: [
                {
                    value: 'SIM, EXISTE E ESTÁ CORRETO',
                    anexo: '',
                    relation: ''
                },
                {
                    value: 'NÃO EXISTE. ',
                    anexo: '<p class="MsoQuote" style="margin-left: 18.0pt; text-align: left; mso-outline-level: 2;" align="left" data-mce-style="margin-left: 18.0pt; text-align: left; mso-outline-level: 2;"><strong><span style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;">DO PREENCHIMENTO DA AUTUAÇÃO (LOCAL DA INFRACÃO)</span></strong></p><p class="MsoNormal" style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;" data-mce-style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">A resolução 390/2011 do CONTRAN deixa claro o que é OBRIGATÓRIO constar na NOTIFICAÇÃO DE AUTUAÇÃO, indicando em seu art.4º. inciso I, Anexo I, BLOCO IV, campo 3.</span></p><p class="MsoNormal" style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;" data-mce-style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Assim, o campo do LOCAL DA INFRACÃO, deve representar o local exato onde se deu o ato infracional, e deve representar a realidade, e ser preenchidos de forma obrigatória.</span></p><p class="MsoNormal" style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;" data-mce-style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;"><span style="mso-spacerun: yes;" data-mce-style="mso-spacerun: yes;">&nbsp;</span>Tal exigência é de preenchimento na NOTIFICAÇÃO DE AUTUAÇÃO, não está disponível ao órgão de trânsito decidir quanto ao preenchimento, e no caso concreto não constou.</span></p><p class="MsoNormal" style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;" data-mce-style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Vejamos:<span style="mso-spacerun: yes;" data-mce-style="mso-spacerun: yes;">&nbsp; </span></span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><strong><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">Infração</span></strong></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><em><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">Contran padroniza procedimento de notificação de multas de trânsito</span></em></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">Resolução 390/11, do Contran, publicada no DOU de hoje, 15, dispõe sobre a padronização dos procedimentos de notificação de multas de trânsito, e dá outras providências.</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><strong><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">II - DA NOTIFICAÇÃO DA AUTUAÇÃO</span></strong></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">Art. 4º À exceção do disposto no artigo 5º desta Resolução,&nbsp;após a verificação da regularidade e da consistência do Auto de&nbsp;Infração, a autoridade de trânsito expedirá, no prazo máximo de 30&nbsp;(trinta) dias contados da data da constatação da infração, a Notificação&nbsp;da Autuação dirigida ao infrator, na qual deverão constar:</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">I - os dados do auto de infração, conforme anexo I desta&nbsp;Resolução;</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">(...)</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">&nbsp;</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><strong><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">ANEXO I</span></strong></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">Definição dos blocos e campos mínimos que deverão compor&nbsp;o Auto de Infração:</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">...</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">III-BLOCO 3 - IDENTIFICAÇÃO DO LOCAL, DATA E&nbsp;HORA DE COMETIMENTO DA INFRAÇÃO</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><strong style="mso-bidi-font-weight: normal;" data-mce-style="mso-bidi-font-weight: normal;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">CAMPO 1 - \'LOCAL DA INFRACÃO\' (preenchimento obrigatório)</span></strong></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">CAMPO 2 - \'DATA\' (preenchimento obrigatório)</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">CAMPO 3 - \'HORA\' (preenchimento obrigatório)</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">...</span></p><p class="MsoNormal" style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;" data-mce-style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Nesse sentido resta demonstrada a falha no preenchimento do auto de infração, invalidando tal ato, devendo ser arquivada tal autuação, pois não temos como demonstrar que ocorreu o ato infracional, visto que o local não está preenchido de forma correta, por não existir tal endereço.</span></p>',
                    relation: 'PARAGRAPH'
                },
                {
                    value: 'NÃO ESTÁ CORRETO, MEU CARRO NUNCA ESTEVE NESTE DIA E LOCAL. ',
                    anexo: '<p class="MsoQuote" style="margin-left: 18.0pt; text-align: left; mso-outline-level: 2;" align="left" data-mce-style="margin-left: 18.0pt; text-align: left; mso-outline-level: 2;"><strong><span style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;">DO PREENCHIMENTO DA AUTUAÇÃO (LOCAL DA INFRACÃO)</span></strong></p><p class="MsoNormal" style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;" data-mce-style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">A resolução 390/2011 do CONTRAN deixa claro o que é OBRIGATÓRIO constar na NOTIFICAÇÃO DE AUTUAÇÃO, indicando em seu art.4º. inciso I, Anexo I, BLOCO IV, campo 3.</span></p><p class="MsoNormal" style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;" data-mce-style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Assim, o campo do LOCAL DA INFRACÃO, deve representar o local exato onde se deu o ato infracional, e deve representar a realidade, e ser preenchidos de forma obrigatória.</span></p><p class="MsoNormal" style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;" data-mce-style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;"><span style="mso-spacerun: yes;" data-mce-style="mso-spacerun: yes;">&nbsp;</span>Tal exigência é de preenchimento na NOTIFICAÇÃO DE AUTUAÇÃO, não está disponível ao órgão de trânsito decidir quanto ao preenchimento, e no caso concreto não constou.</span></p><p class="MsoNormal" style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;" data-mce-style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Vejamos:<span style="mso-spacerun: yes;" data-mce-style="mso-spacerun: yes;">&nbsp; </span></span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><strong><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">Infração</span></strong></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><em><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">Contran padroniza procedimento de notificação de multas de trânsito</span></em></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">Resolução 390/11, do Contran, publicada no DOU de hoje, 15, dispõe sobre a padronização dos procedimentos de notificação de multas de trânsito, e dá outras providências.</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><strong><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">II - DA NOTIFICAÇÃO DA AUTUAÇÃO</span></strong></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">Art. 4º À exceção do disposto no artigo 5º desta Resolução,&nbsp;após a verificação da regularidade e da consistência do Auto de&nbsp;Infração, a autoridade de trânsito expedirá, no prazo máximo de 30&nbsp;(trinta) dias contados da data da constatação da infração, a Notificação&nbsp;da Autuação dirigida ao infrator, na qual deverão constar:</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">I - os dados do auto de infração, conforme anexo I desta&nbsp;Resolução;</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">(...)</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">&nbsp;</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><strong><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">ANEXO I</span></strong></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">Definição dos blocos e campos mínimos que deverão compor&nbsp;o Auto de Infração:</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">...</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">III-BLOCO 3 - IDENTIFICAÇÃO DO LOCAL, DATA E&nbsp;HORA DE COMETIMENTO DA INFRAÇÃO</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><strong style="mso-bidi-font-weight: normal;" data-mce-style="mso-bidi-font-weight: normal;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">CAMPO 1 - \'LOCAL DA INFRACÃO\' (preenchimento obrigatório)</span></strong></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">CAMPO 2 - \'DATA\' (preenchimento obrigatório)</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">CAMPO 3 - \'HORA\' (preenchimento obrigatório)</span></p><p class="MsoBodyText" style="margin-left: 5.0cm;" data-mce-style="margin-left: 5.0cm;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">...</span></p><p class="MsoNormal" style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;" data-mce-style="margin-left: 18.0pt; text-align: justify; text-indent: 24.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Nesse sentido resta demonstrada a falha no preenchimento do auto de infração, invalidando tal ato, devendo ser arquivada tal autuação, pois não temos como demonstrar que ocorreu o ato infracional, visto que o local não está preenchido de forma correta, pois o veículo em questão jamais esteve neste local.</span></p>',
                    relation: 'PARAGRAPH'
                },
                {
                    value: 'NÃO SEI ',
                    anexo: '',
                    relation: ''
                }
            ],
            flag: '{{ O_ENDERECO_DA_MULTA_EXISTE_OU_EST_CORRETO }}',
            default: true,
            edit: true
        },
        {
            field: 'O CAMPO DAS OBSERVAÇÕES DA NOTIFICAÇÃO FOI PREENCHIDO DESCREVENDO OS FATOS? ',
            type: 'SELECT',
            options: [
                {
                    value: 'SIM, E DESCREVE COM DETALHES OS FATOS.',
                    anexo: '',
                    relation: ''
                },
                {
                    value: 'NÃO FOI PREENCHIDO.',
                    anexo: '<p class="MsoQuote" style="margin-left: 0cm; text-align: left; mso-outline-level: 2;" align="left" data-mce-style="margin-left: 0cm; text-align: left; mso-outline-level: 2;"><strong><span style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;">DO PREENCHIMENTO DA AUTUAÇÃO – CAMPO DAS OBSERVAÇÕES</span></strong></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Na resolução 390/2011 do CONTRAN deixa claro o que é OBRIGATÓRIO constar na NOTIFICAÇÃO DE AUTUAÇÃO, indicando em seu art.4º. inciso I, Anexo I, BLOCO IV, campo 3.</span></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Assim, o campo de OBSERVAÇÕES, criados nas NOTIFICAÇÕES DE AUTUAÇÕES estão lá para serem preenchidos de forma obrigatória com o detalhamento das infrações, no caso concreto, com a indicação da sinalização encontrada no local, e a situação na qual se encontrava o veículo. Tal exigência é de preenchimento na NOTIFICAÇÃO DE AUTUAÇÃO, não está disponível ao órgão fiscalizador de trânsito para facilitação de digitação e comando de conferência arbitrar em outro local, em outro documento, de informação que deveria OBRIGATORIAMENTE constar na dita NOTIFICAÇÃO e no caso concreto não constou . </span></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Nesse sentido resta demonstrada a falha no preenchimento do auto de infração, invalidando tal ato, devendo ser arquivada tal autuação.</span></p>',
                    relation: 'PARAGRAPH'
                },
                {
                    value: 'FOI PREENCHIDO CITANDO PARA BUSCAR INFOMAÇÃO EM OUTRO LOCAL.',
                    anexo: '<p class="MsoQuote" style="margin-left: 0cm; text-align: left; mso-outline-level: 2;" align="left" data-mce-style="margin-left: 0cm; text-align: left; mso-outline-level: 2;"><strong><span style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;">DO PREENCHIMENTO DA AUTUAÇÃO – CAMPO DAS OBSERVAÇÕES</span></strong></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Na resolução 390/2011 do CONTRAN deixa claro o que é OBRIGATÓRIO constar na NOTIFICAÇÃO DE AUTUAÇÃO, indicando em seu art.4º. inciso I, Anexo I, BLOCO IV, campo 3.</span></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Assim, o campo de OBSERVAÇÕES, criados nas NOTIFICAÇÕES DE AUTUAÇÕES estão lá para serem preenchidos de forma obrigatória com o detalhamento das infrações, no caso concreto, com a indicação da sinalização encontrada no local, e a situação na qual se encontrava o veículo. Tal exigência é de preenchimento na NOTIFICAÇÃO DE AUTUAÇÃO, não está disponível ao órgão fiscalizador de trânsito para facilitação de digitação e comando de conferência arbitrar em outro local, em outro documento, de informação que deveria OBRIGATORIAMENTE constar na dita NOTIFICAÇÃO e no caso concreto não constou . </span></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Nesse sentido resta demonstrada a falha no preenchimento do auto de infração, invalidando tal ato, devendo ser arquivada tal autuação.</span></p>',
                    relation: 'PARAGRAPH'
                },
                {
                    value: 'NÃO SEI ',
                    anexo: '',
                    relation: ''
                }
            ],
            flag: '{{ O_CAMPO_DAS_OBSERVACES_DA_NOTIFICACO_FOI_PREENCHIDO_DESCREVENDO_OS_FATOS }}',
            default: true,
            edit: true
        },
        {
            field: 'O VEÍCULO MULTADO FOI VENDIDO ANTES DA INFRAÇÃO?',
            type: 'SELECT',
            options: [
                {
                    value: 'SIM, MAS NÃO COMUNIQUEI O DETRAN ',
                    anexo: '<p class="MsoQuote" style="text-align: left; line-height: 150%; mso-outline-level: 2; margin: 0cm 0cm 6.0pt 0cm;" align="left" data-mce-style="text-align: left; line-height: 150%; mso-outline-level: 2; margin: 0cm 0cm 6.0pt 0cm;"><strong><span style="font-size: 12.0pt; line-height: 150%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; line-height: 150%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;">DA VENDA DO VEÍCULO</span></strong></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">O recorrente já não era mais responsável pelo veículo no momento do cometimento da infração ora recorrida, visto que havia vendido o veículo anteriormente. A comprovação da venda do veículo traz junto ao presente recurso, onde demonstra que não era mais o proprietário, e informando os dados do adquirente.</span></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Dessa forma, o adquirente é quem deve ser responsabilizado pelo cometimento de tal infração, devendo se desconsiderada do prontuário do RECORRENTE.</span></p>',
                    relation: 'PARAGRAPH'
                },
                {
                    value: 'SIM, E COMUNIQUEI A VENDA. ',
                    anexo: '<p class="MsoQuote" style="text-align: left; line-height: 150%; mso-outline-level: 2; margin: 0cm 0cm 6.0pt 0cm;" align="left" data-mce-style="text-align: left; line-height: 150%; mso-outline-level: 2; margin: 0cm 0cm 6.0pt 0cm;"><strong><span style="font-size: 12.0pt; line-height: 150%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; line-height: 150%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;">DA VENDA DO VEÍCULO</span></strong></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">O recorrente já não era mais responsável pelo veículo no momento do cometimento da infração ora recorrida, visto que havia vendido o veículo anteriormente. A comprovação da venda do veículo consta no sistema do Detran, pois o proprietário vendedor realizou como prevê o Código de Trânsito a comunicação da venda, informando os dados do adquirente.</span></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Dessa forma, o adquirente, que já consta no sistema do Detran, é o responsável por tal infração, devendo se desconsiderada do prontuário do RECORRENTE.</span></p>',
                    relation: 'PARAGRAPH'
                },
                {
                    value: 'NÃO. ',
                    anexo: '',
                    relation: ''
                }
            ],
            flag: '{{ O_VECULO_MULTADO_FOI_VENDIDO_ANTES_DA_INFRACO }}',
            default: true,
            edit: true
        },
        {
            field: 'A MULTA FOI EMITIDA APÓS O VEÍCULO TER SIDO FURTADO OU ROUBADO?',
            type: 'SELECT',
            options: [
                {
                    value: 'NÃO.',
                    anexo: '',
                    relation: ''
                },
                {
                    value: 'SIM. (anexar cópia do Boletim de Ocorrência) ',
                    anexo: '<p class="MsoQuote" style="text-align: left; line-height: 150%; mso-outline-level: 2; margin: 0cm 0cm 6.0pt 0cm;" align="left" data-mce-style="text-align: left; line-height: 150%; mso-outline-level: 2; margin: 0cm 0cm 6.0pt 0cm;"><strong><span style="font-size: 12.0pt; line-height: 150%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;" data-mce-style="font-size: 12.0pt; line-height: 150%; font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin; font-style: normal; mso-bidi-font-style: italic;">VEÍCULO FURTADO/ROUBADO</span></strong></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">O recorrente não detinha mais a posse do veículo em questão, visto que havia sido furtado/roubado anteriormente conforme comprova com cópia do boletim de ocorrência policial.<span style="mso-spacerun: yes;" data-mce-style="mso-spacerun: yes;">&nbsp; </span>No momento da infração o veículo estava na posse de pessoa não conhecida, fato que se fosse abordado conforme previsto no Código de Trânsito Brasileiro teria sido recolhido o veículo para devolver ao proprietário, e o criminoso preso. Porém, o intuito do órgão de trânsito é de fiscalizar apenas a condução na via, e com isso deixa de prestar um serviço de segurança pública.</span></p><p class="MsoNormal" style="text-align: justify; text-indent: 42.55pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 42.55pt; line-height: 150%;"><span style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Dessa forma, o proprietário não é o responsável por tal infração, devendo se desconsiderada do prontuário do RECORRENTE.</span></p>',
                    relation: 'PARAGRAPH'
                },
                {
                    value: 'NÃO SEI .',
                    anexo: '',
                    relation: ''
                }
            ],
            flag: '{{ A_MULTA_FOI_EMITIDA_APS_O_VECULO_TER_SIDO_FURTADO_OU_ROUBADO }}',
            default: true,
            edit: true
        },
        {
            field: 'O CONDUTOR É REINSCIDENTE NA MESMA INFRAÇÃO NOS ÚLTIMOS 12 MESES (LEMBRE-SE DE VERIFICAR SE É O MESMO ARTIGO, E A MESMA FICHA DE AUTUAÇÃO)?',
            type: 'SELECT',
            options: [
                {
                    value: 'SIM. ',
                    anexo: '',
                    relation: ''
                },
                {
                    value: 'NÃO. ',
                    anexo: '<p class="MsoBodyText" style="mso-outline-level: 2;" data-mce-style="mso-outline-level: 2;"><a name="_Hlk145246818" class="mce-item-anchor"></a><strong><span style="font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;" data-mce-style="font-family: \'Calibri\',sans-serif; mso-ascii-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-theme-font: minor-latin;">CONVERSÃO DA MULTA EM ADVERTÊNCIA POR ESCRITO</span></strong></p><p class="MsoNormal" style="text-align: justify; text-indent: 70.9pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 70.9pt; line-height: 150%;"><span style="mso-bookmark: _Hlk145246818;" data-mce-style="mso-bookmark: _Hlk145246818;"><span style="font-size: 12.0pt; line-height: 150%; mso-ascii-font-family: Calibri; mso-hansi-font-family: Calibri; mso-bidi-font-family: Calibri;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-ascii-font-family: Calibri; mso-hansi-font-family: Calibri; mso-bidi-font-family: Calibri;">Em se tratando de multa de categoria leve e ou média, na qual se enquadra a tipificação da infração em litígio, não havendo reincidência no prazo de 12 meses, é justo ao CIDADÃO, na forma que preceitua o art. 267 CTB buscar na imposição da penalidade a conversão da penalidade vigente para a tipificação em imposição de advertência. </span></span></p><p class="MsoNormal" style="text-align: justify; text-indent: 70.9pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 70.9pt; line-height: 150%;"><span style="mso-bookmark: _Hlk145246818;" data-mce-style="mso-bookmark: _Hlk145246818;"><span style="font-size: 12.0pt; line-height: 150%; mso-ascii-font-family: Calibri; mso-hansi-font-family: Calibri; mso-bidi-font-family: Calibri;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-ascii-font-family: Calibri; mso-hansi-font-family: Calibri; mso-bidi-font-family: Calibri;">A redação dada pela Lei 14.071/2020 traz o benefício ao condutor, e a obrigatoriedade na conversão de multa quando o condutor fazer jus nas condições legalmente estabelecidas para ser imposta a este a penalidade de advertência prevista no CTB<span style="mso-spacerun: yes;" data-mce-style="mso-spacerun: yes;">&nbsp; </span>em decorrência da infração relacionada. Vejamos:</span></span></p><p style="margin-left: 5.0cm; text-align: justify;" data-mce-style="margin-left: 5.0cm; text-align: justify;"><span style="mso-bookmark: _Hlk145246818;" data-mce-style="mso-bookmark: _Hlk145246818;"><a name="art267" class="mce-item-anchor"></a><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; color: black; mso-color-alt: windowtext; background: white;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; color: black; mso-color-alt: windowtext; background: white;">Art. 267. &nbsp;Deverá ser imposta a penalidade de advertência por escrito à infração de natureza leve ou média, passível de ser punida com multa, caso o infrator não tenha cometido nenhuma outra infração nos últimos 12 (doze) meses.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span><a href="https://www.planalto.gov.br/ccivil_03/_Ato2019-2022/2020/Lei/L14071.htm#art1" data-mce-href="https://www.planalto.gov.br/ccivil_03/_Ato2019-2022/2020/Lei/L14071.htm#art1"><span style="mso-bookmark: _Hlk145246818;" data-mce-style="mso-bookmark: _Hlk145246818;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; color: black; mso-color-alt: windowtext; background: white;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif; color: black; mso-color-alt: windowtext; background: white;">&nbsp;(Redação dada pela Lei nº 14.071, de 2020)</span></span></a><span style="mso-bookmark: _Hlk145246818;" data-mce-style="mso-bookmark: _Hlk145246818;"><span style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif;" data-mce-style="font-size: 10.0pt; font-family: \'Calibri\',sans-serif;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="apple-converted-space">&nbsp;</span></span></span></p><p class="MsoNormal" style="text-align: justify; text-indent: 70.9pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 70.9pt; line-height: 150%;"><span style="mso-bookmark: _Hlk145246818;" data-mce-style="mso-bookmark: _Hlk145246818;"><span style="font-size: 12.0pt; line-height: 150%; mso-ascii-font-family: Calibri; mso-hansi-font-family: Calibri; mso-bidi-font-family: Calibri;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-ascii-font-family: Calibri; mso-hansi-font-family: Calibri; mso-bidi-font-family: Calibri;">Para que seja justa a viabilidade de acesso a esta situação de conversão da imposição de penalidade em advertência, não pode haver nesta concessão qualquer elemento de pessoalidade, de autonomia de vontade da autoridade, o acesso precisar se universalizado a todo aquele Cidadão que reunir as condicionantes legais que autorizem tal benefício. Assim, não havendo no prontuário do CONDUTOR qualquer elemento de reincidência da autuação específica em 12 meses, terá garantido o acesso a tal benefício.</span></span></p><p class="MsoNormal" style="text-align: justify; text-indent: 70.9pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 70.9pt; line-height: 150%;"><span style="mso-bookmark: _Hlk145246818;" data-mce-style="mso-bookmark: _Hlk145246818;"><span style="font-size: 12.0pt; line-height: 150%; mso-ascii-font-family: Calibri; mso-hansi-font-family: Calibri; mso-bidi-font-family: Calibri;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-ascii-font-family: Calibri; mso-hansi-font-family: Calibri; mso-bidi-font-family: Calibri;">Tratar-se de igualdade de tratamento ao Cidadão,<span style="mso-spacerun: yes;" data-mce-style="mso-spacerun: yes;">&nbsp; </span>garantia constitucional e que não esta a benefício de questões de pessoalidade por parte do Agente Público. Dessa forma, o princípio constitucional da isonomia, consagrado no caput do artigo 5º da nossa Constituição Federal de 1988, segundo o qual "todos são iguais perante a lei, sem distinção de qualquer natureza...", não seria observado se o acesso a tal conversão de imposição de penalidade em advertência dependesse do interesse pessoal de quem a concede.</span></span></p><p class="MsoNormal" style="text-align: justify; text-indent: 70.9pt; line-height: 150%;" data-mce-style="text-align: justify; text-indent: 70.9pt; line-height: 150%;"><span style="mso-bookmark: _Hlk145246818;" data-mce-style="mso-bookmark: _Hlk145246818;"><span style="font-size: 12.0pt; line-height: 150%; mso-ascii-font-family: Calibri; mso-hansi-font-family: Calibri; mso-bidi-font-family: Calibri;" data-mce-style="font-size: 12.0pt; line-height: 150%; mso-ascii-font-family: Calibri; mso-hansi-font-family: Calibri; mso-bidi-font-family: Calibri;"><span style="mso-spacerun: yes;" data-mce-style="mso-spacerun: yes;">&nbsp;</span><a name="art267§2" class="mce-item-anchor"></a><span style="color: black;" data-mce-style="color: black;">No caso <em style="mso-bidi-font-style: normal;" data-mce-style="mso-bidi-font-style: normal;">in tela </em>o condutor não obteve infração do mesmo artigo e ficha de enquadramento nos 12 meses anteriores ao da autuação aqui contestada, devendo a mesma ser transformada em advertência por escrito.</span></span></span></p>',
                    relation: 'PARAGRAPH'
                }
            ],
            flag: '{{ O_CONDUTOR__REINSCIDENTE_NA_MESMA_INFRACO_NOS_LTIMOS_12_MESES_LEMBRESE_DE_VERIFICAR_SE__O_MESMO_ARTIGO_E_A_MESMA_FICHA_DE_AUTUACO }}',
            default: true,
            edit: true
        },
        {
            field: 'QUAL CIDADE SERÁ PROTOCOLADO O RECURSO?',
            type: 'TEXT',
            options: [
                {
                    value: 'QUAL CIDADE SERÁ PROTOCOLADO O RECURSO?',
                    anexo: '',
                    relation: 'OPEN_FIELD'
                }
            ],
            flag: '{{ QUAL_CIDADE_SER_PROTOCOLADO_O_RECURSO }}',
            default: true,
            edit: true
        },
        {
            field: 'QUAL DATA SERÁ PROTOCOLADO O RECURSO? (DD DE MÊS DE AAAA)',
            type: 'TEXT',
            options: [
                {
                    value: 'QUAL DATA SERÁ PROTOCOLADO O RECURSO? (DD DE MÊS DE AAAA)',
                    anexo: '',
                    relation: 'OPEN_FIELD'
                }
            ],
            flag: '{{ QUAL_DATA_SER_PROTOCOLADO_O_RECURSO_DD_DE_MS_DE_AAAA }}',
            default: true,
            edit: true
        }
    ]);

    const [document, setDocument] = useState('');
    const [currentFieldType, setCurrentFieldType] = useState('TEXT');
    const [relationField, setRelationField] = useState('');
    const [options, setOptions] = useState<any[]>([]);
    const [currentEditFlag, setCurrentEditFlag] = useState(null);
    const [photo, setPhoto] = useState('');

    const handleAddOptions = useCallback(() => {
        const value = formRef?.current?.getFieldValue('field_option');
        const anexo = formRef?.current?.getFieldValue('anexo');

        setOptions(oldState => {
            const newState = [...oldState];
            newState.push({
                value,
                anexo: anexo || '',
                relation: relationField
            });
            return newState;
        });

        let inputRef = formRef?.current?.getFieldRef('field_option');
        inputRef.value = '';
        inputRef = formRef?.current?.getFieldRef('anexo');
        inputRef.value = '';
    }, [relationField]);

    const handleDeleteOption = useCallback((category: string) => {
        setOptions(oldState => {
            let newState = [...oldState];
            newState = newState.filter(item => item !== category);
            return newState;
        });
    }, []);

    const handleResetOptions = useCallback(() => {
        setOptions([]);
    }, []);

    const handleResetType = useCallback(() => {
        setCurrentFieldType('TEXT');
    }, []);

    const handleAddField = useCallback(() => {
        const value = formRef?.current?.getFieldValue('field_name');
        const anexo = formRef?.current?.getFieldValue('anexo');

        if (value) {
            setFields(oldState => {
                const newState = [...oldState];
                const flag = `{{ ${value
                    .trim()
                    .toUpperCase()
                    .replace(/Ç/g, 'C')
                    .replace(/ /g, '_')
                    .replace(/\W+/g, '')} }}`;

                newState.push({
                    field: value.toUpperCase(),
                    type: currentFieldType,
                    options:
                        currentFieldType === 'TEXT'
                            ? [
                                  {
                                      value,
                                      anexo: anexo || '',
                                      relation: relationField
                                  }
                              ]
                            : options,
                    flag,
                    default: false,
                    edit: true
                });

                return newState;
            });

            let inputRef = formRef?.current?.getFieldRef('field_name');
            inputRef.value = '';
            inputRef = formRef?.current?.getFieldRef('anexo');
            inputRef = '';

            handleResetType();
            handleResetOptions();
        }
    }, [formRef, currentFieldType, options, relationField]);

    const handleCopyFlag = useCallback(
        (flag: string) => {
            navigator.clipboard.writeText(flag);

            toast({
                title: 'Flag Copiada',
                description: '',
                status: 'success',
                duration: 2000,
                isClosable: true
            });
        },
        [formRef, document]
    );

    const handleDeleteFlag = useCallback((flag: string) => {
        setFields(oldState => {
            let newState = [...oldState];
            newState = newState.filter(item => item.flag !== flag);
            return newState;
        });
    }, []);

    const handleSubmit = useCallback(() => {
        try {
            const data = formRef.current?.getData();

            const schema = z.object({
                name: z.string().min(1, { message: 'Nome obrigatório' }),
                value: z.string().min(1, { message: 'Preço Obrigatório' }),
                document: z
                    .string()
                    .min(1, { message: 'Documento é obrigatório' })
            });

            schema.parse(data);

            apiBackend
                .post('/resources', {
                    ...data,
                    photo,
                    value: String(data?.value)
                        .replace(/\./g, '')
                        .replace(/,/, '.'),
                    categories: [data?.category],
                    fields
                })
                .then(response => {
                    const { status } = response;
                    if (status === 201) {
                        toast({
                            title: 'Cadastro Realizado',
                            description: '',
                            status: 'success',
                            duration: 4000,
                            isClosable: true
                        });

                        navigate('/produtos');
                    } else {
                        toast({
                            title: 'Ocorreu um erro',
                            description: '',
                            status: 'error',
                            duration: 4000,
                            isClosable: true
                        });
                    }
                });
        } catch (err) {
            if (err instanceof ZodError) {
                toast({
                    title: 'Preencha corretamente',
                    description: err.errors[0].message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                });
            }
        }
    }, [formRef, fields, photo]);

    const handleChangeField = useCallback((field: string, value: string) => {
        if (field && value) {
            setFields(oldState => {
                let newState = [...oldState];
                newState = newState.map(item => {
                    const newItem = item;
                    if (newItem.flag.includes(field)) {
                        if (newItem.options.length > 0) {
                            newItem.options[0].value = value;
                        } else {
                            newItem.options.push({
                                value,
                                anexo: ''
                            });
                        }
                    }

                    return newItem;
                });
                return newState;
            });
        }
    }, []);

    const handleEditFlag = useCallback(
        (flag: string) => {
            const flagItem = fields.find(item => item.flag === flag);
            if (!flagItem) return;
            if (flagItem.type === 'TEXT') {
                if (flagItem.default) {
                    const inputName = String(flag)
                        .replace('{{', '')
                        .replace('}}', '')
                        .toLowerCase()
                        .trim();
                    formRef.current?.getFieldRef(inputName).focus();
                    return;
                }
            }
            setCurrentEditFlag(flagItem);
            onOpen();
        },
        [fields]
    );

    const handleChangeOptionsFlag = useCallback((flag: string, data: []) => {
        setFields(oldState => {
            let newState = [...oldState];
            newState = newState.map(item => {
                const newItem = item;
                if (newItem.flag === flag) {
                    newItem.options = data;
                }

                return newItem;
            });
            return newState;
        });
        onClose();
        setCurrentEditFlag(null);
    }, []);

    const handleUploadFile = useCallback((event: any) => {
        const formData = new FormData();
        const file = event.target.files[0];
        formData.append('file', file, file.name);
        axios
            .post(
                'https://sandbox.env.eflorista.com.br/api/v1/pages/upload',
                formData
            )
            .then(response => {
                const { status, data } = response;
                if (status === 200) {
                    setPhoto(data.location);
                }
            });
    }, []);

    return (
        <Form ref={formRef}>
            <Flex width="100%" flexDirection="column">
                <Flex
                    width="100%"
                    flexDirection="column"
                    color="gray.900"
                    backgroundColor="white"
                    p="32px"
                >
                    <Text fontWeight="600" fontSize="14px" mb="13px">
                        Novo Recurso
                    </Text>

                    <Flex width="100%" justifyContent={'space-between'}>
                        <Flex
                            width={['100%', '100%', '48%']}
                            flexDirection="column"
                        >
                            <Flex width={'100%'}>
                                <Input name="name" label="Nome do Recurso" />
                            </Flex>

                            <Flex width={'100%'} flexDirection="column">
                                {photo && (
                                    <Image
                                        src={photo}
                                        width="200px"
                                        height="200px"
                                    />
                                )}
                                <Input
                                    name="photo"
                                    label="Foto do Recurso"
                                    type="file"
                                    onChange={e => handleUploadFile(e)}
                                />
                            </Flex>

                            <Flex
                                width={['100%']}
                                justifyContent="space-between"
                            >
                                <Flex width="48%">
                                    <Input
                                        name="codigo_artigo"
                                        label="Artigo"
                                        onKeyUp={e =>
                                            handleChangeField(
                                                'CODIGO_ARTIGO',
                                                e.currentTarget.value
                                            )
                                        }
                                    />
                                </Flex>
                                <Flex width="48%">
                                    <Input
                                        name="codigo_ficha"
                                        label="Cód. Ficha"
                                        onKeyUp={e =>
                                            handleChangeField(
                                                'CODIGO_FICHA',
                                                e.currentTarget.value
                                            )
                                        }
                                    />
                                </Flex>
                            </Flex>
                            <Select name="type" label="Tipo de Multa">
                                <option>Multa Leve</option>
                                <option>Multa Média</option>
                                <option>Multa Grave</option>
                                <option>Multa Gravíssima</option>
                            </Select>
                            <Flex width={'100%'}>
                                <TextArea
                                    name="description"
                                    label="Descrição (Motivo)"
                                />
                            </Flex>
                            <Flex width={'48%'}>
                                <InputCurrency
                                    name="value"
                                    size="sm"
                                    label="Preço"
                                />
                            </Flex>
                        </Flex>
                    </Flex>

                    <Box width="100%" flexDirection="column">
                        <Flex
                            width="100%"
                            flexDirection="column"
                            color="gray.900"
                            mt="8px"
                            mb="16px"
                            backgroundColor="blue.100"
                            p="16px"
                        >
                            <Text
                                fontWeight="600"
                                fontSize="14px"
                                color="green.500"
                            >
                                Flag Personalizada
                            </Text>

                            <Text
                                fontSize="12px"
                                fontWeight="500"
                                color="gray.500"
                            >
                                Se o recurso precisar de uma informação
                                específica, crie uma flag customizada para usar
                                no documento.
                            </Text>

                            <Flex
                                width="100%"
                                justifyContent="space-between"
                                mt="8px"
                            >
                                <Flex width="48%" flexDirection="column">
                                    <Flex width="100%">
                                        <TextArea
                                            name="field_name"
                                            label="Criar Campo (Nome do Campo)"
                                            rows={3}
                                        />
                                    </Flex>
                                    <Flex width="100%" flexDirection="column">
                                        <Select
                                            width="100%"
                                            name="field_type"
                                            label="Tipo de campo"
                                            onChange={e => {
                                                setCurrentFieldType(
                                                    e.currentTarget.value
                                                );
                                                handleResetOptions();
                                            }}
                                            value={currentFieldType}
                                        >
                                            <option value="TEXT">Texto</option>
                                            <option value="SELECT">
                                                Multipla Escolha
                                            </option>
                                        </Select>

                                        {currentFieldType === 'SELECT' && (
                                            <Flex
                                                width="100%"
                                                flexDirection="column"
                                            >
                                                <TextArea
                                                    name="field_option"
                                                    label="Opções de Resposta"
                                                    rows={4}
                                                />

                                                <Button
                                                    ml="8px"
                                                    mt="8px"
                                                    title="+"
                                                    backgroundColor="green.500"
                                                    color="white"
                                                    width="40px"
                                                    height="32px"
                                                    borderRadius="4px"
                                                    py="8px"
                                                    fontSize="14px"
                                                    onClick={() => {
                                                        handleAddOptions();
                                                        setRelationField('');
                                                    }}
                                                />
                                            </Flex>
                                        )}
                                        {options.length > 0 && (
                                            <Flex
                                                mt="16px"
                                                width="100%"
                                                flexDirection="column"
                                                mb="8px"
                                            >
                                                <Text
                                                    fontSize="14px"
                                                    color="green.500"
                                                    fontWeight="600"
                                                    mb="8px"
                                                >
                                                    Opções
                                                </Text>

                                                <Flex flexWrap="wrap" gap="8px">
                                                    {options.map(option => (
                                                        <Flex
                                                            key={option.value}
                                                            color="white"
                                                            backgroundColor="green.500"
                                                            pl="16px"
                                                            pr="8px"
                                                            width="auto"
                                                            minWidth="80px"
                                                            height="32px"
                                                            borderRadius="4px"
                                                            fontSize="14px"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            position="relative"
                                                        >
                                                            <Flex
                                                                position="absolute"
                                                                left="-4px"
                                                                top="-4px"
                                                                borderRadius="50%"
                                                                backgroundColor="red.500"
                                                                color="white"
                                                                cursor="pointer"
                                                                onClick={() =>
                                                                    handleDeleteOption(
                                                                        option
                                                                    )
                                                                }
                                                            >
                                                                <Icon
                                                                    as={FiX}
                                                                    color="white"
                                                                    fontSize="14px"
                                                                />
                                                            </Flex>

                                                            <Text>
                                                                {option.value}
                                                            </Text>
                                                        </Flex>
                                                    ))}
                                                </Flex>
                                            </Flex>
                                        )}
                                    </Flex>

                                    <Flex width="100%">
                                        <Button
                                            mt="6px"
                                            width="48%"
                                            title="Criar Flag"
                                            backgroundColor="green.500"
                                            color="white"
                                            height="32px"
                                            borderRadius="4px"
                                            py="8px"
                                            fontSize="14px"
                                            onClick={() => {
                                                handleAddField();
                                                setRelationField('');
                                            }}
                                        />
                                    </Flex>
                                </Flex>

                                <Flex
                                    width="48%"
                                    justifyContent="space-between"
                                    flexWrap="wrap"
                                >
                                    <Flex width="100%" flexDirection="column">
                                        <Box fontWeight="500">
                                            Relacionamento
                                        </Box>
                                        <Flex width="100%" gap="8px">
                                            <Flex
                                                alignItems="center"
                                                fontSize="12px"
                                                gap="4px"
                                            >
                                                <input
                                                    type="radio"
                                                    value="PARAGRAPH"
                                                    name="relation"
                                                    checked={
                                                        relationField ===
                                                        'PARAGRAPH'
                                                    }
                                                    onChange={e =>
                                                        setRelationField(
                                                            e.currentTarget
                                                                .value
                                                        )
                                                    }
                                                />
                                                <Text>Paragráfo</Text>
                                            </Flex>
                                            <Flex
                                                alignItems="center"
                                                fontSize="12px"
                                                gap="4px"
                                            >
                                                <input
                                                    type="radio"
                                                    value="OPEN_FIELD"
                                                    name="relation"
                                                    checked={
                                                        relationField ===
                                                        'OPEN_FIELD'
                                                    }
                                                    onChange={e =>
                                                        setRelationField(
                                                            e.currentTarget
                                                                .value
                                                        )
                                                    }
                                                />
                                                <Text>Campo Aberto</Text>
                                            </Flex>
                                            <Flex
                                                alignItems="center"
                                                fontSize="12px"
                                                gap="4px"
                                            >
                                                <input
                                                    type="radio"
                                                    value="PHOTO"
                                                    name="relation"
                                                    checked={
                                                        relationField ===
                                                        'PHOTO'
                                                    }
                                                    onChange={e =>
                                                        setRelationField(
                                                            e.currentTarget
                                                                .value
                                                        )
                                                    }
                                                />
                                                <Text>Foto</Text>
                                            </Flex>
                                        </Flex>

                                        {relationField === 'PARAGRAPH' && (
                                            <Flex width="100%" mt="16px">
                                                <TextEditor
                                                    name="anexo"
                                                    label="Texto Relacionado"
                                                    rows={3}
                                                    height={200}
                                                />
                                            </Flex>
                                        )}
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex
                            width="100%"
                            flexDirection="column"
                            fontSize="14px"
                            mb="16px"
                        >
                            <Text fontWeight="600" color="green.500">
                                Modo de usar
                            </Text>
                            <Text>
                                1 - Clique no campo desejado abaixo para copiar
                                sua flag e colocar no documento
                            </Text>

                            <Text>
                                {`2 - As flags no documento serão identificadas pelo
                                padrão {{ NOME_FLAG }}`}
                            </Text>

                            <Text>
                                3 - As flags serão substituidas posteriormente
                                pelos valores informado pelo comprador do
                                recurso
                            </Text>
                        </Flex>
                        <Flex flexDirection="column" fontSize="14px" mb="8px">
                            <Text fontWeight="600" color="green.500">
                                Flags
                            </Text>

                            <Flex
                                width="100%"
                                gap="8px"
                                mt="8px"
                                flexWrap="wrap"
                                mb="8px"
                            >
                                {fields.map(item => (
                                    <Flex
                                        key={item.flag}
                                        color="white"
                                        backgroundColor="green.500"
                                        pl="16px"
                                        pr="8px"
                                        width="auto"
                                        minWidth="80px"
                                        height="32px"
                                        borderRadius="4px"
                                        fontSize="14px"
                                        alignItems="center"
                                        justifyContent="center"
                                        position="relative"
                                    >
                                        <Flex
                                            cursor="pointer"
                                            onClick={() =>
                                                handleCopyFlag(item.flag)
                                            }
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Text lineHeight="14px">
                                                {String(item.field).substring(
                                                    0,
                                                    32
                                                )}
                                            </Text>

                                            <Icon
                                                mb="8px"
                                                ml="8px"
                                                as={FiCopy}
                                                color="white"
                                                fontSize="16px"
                                            />
                                        </Flex>

                                        <Flex
                                            position="absolute"
                                            left="-4px"
                                            top="-10px"
                                            gap="4px"
                                        >
                                            {!item?.default &&
                                                item.flag !==
                                                    '{{ ORGAO_AUTUADOR }}' && (
                                                    <Flex
                                                        p="2px"
                                                        borderRadius="4px"
                                                        backgroundColor="red.500"
                                                        color="white"
                                                        cursor="pointer"
                                                        onClick={() =>
                                                            handleDeleteFlag(
                                                                item.flag
                                                            )
                                                        }
                                                    >
                                                        <Icon
                                                            as={FiX}
                                                            color="white"
                                                            fontSize="14px"
                                                        />
                                                    </Flex>
                                                )}

                                            {item?.edit && (
                                                <Flex
                                                    p="2px"
                                                    borderRadius="4px"
                                                    backgroundColor="purple.500"
                                                    color="white"
                                                    cursor="pointer"
                                                    onClick={() =>
                                                        handleEditFlag(
                                                            item.flag
                                                        )
                                                    }
                                                >
                                                    <Icon
                                                        as={FiEdit}
                                                        color="white"
                                                        fontSize="12px"
                                                    />
                                                </Flex>
                                            )}
                                        </Flex>
                                    </Flex>
                                ))}
                            </Flex>

                            {fields.length <= 0 && (
                                <Text>
                                    Você não criou nenhum campo personalizado
                                    ainda
                                </Text>
                            )}
                        </Flex>

                        <TextEditor
                            name="document"
                            isRequired
                            size="sm"
                            mb="4px"
                            height={400}
                            onChange={e => setDocument(e.value)}
                        />
                    </Box>

                    <Flex width="100%" justifyContent="center" mt="24px">
                        <Button
                            title="Salvar"
                            backgroundColor="green.500"
                            color="white"
                            width="160px"
                            borderRadius="4px"
                            py="8px"
                            onClick={() => handleSubmit()}
                        />
                    </Flex>
                </Flex>
            </Flex>

            {currentEditFlag && (
                <ModalEditFlag
                    flag={currentEditFlag}
                    isOpen={isOpen}
                    onClose={() => {
                        onClose();
                        setCurrentEditFlag(null);
                    }}
                    onChange={(flag, data) =>
                        handleChangeOptionsFlag(flag, data)
                    }
                />
            )}
        </Form>
    );
};

export default ProductsRegisterPage;

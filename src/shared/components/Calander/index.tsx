import React from 'react';
import DayPicker, { DayPickerProps } from 'react-day-picker';

import { Container } from './styles';

interface IProps extends DayPickerProps {
    selectedDate: Date;
    handleDateChange: any;
    handleMonthChange: any;
    isErrored: boolean;
}

const Calender: React.FC<IProps> = ({
    selectedDate,
    handleDateChange,
    handleMonthChange,
    isErrored = false
}) => (
    <Container isErrored={isErrored}>
        <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[]}
            fixedWeeks
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro'
            ]}
        />
    </Container>
);

export default Calender;

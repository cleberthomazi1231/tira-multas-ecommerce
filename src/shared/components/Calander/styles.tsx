import styled from 'styled-components';

interface IProps {
    isErrored: boolean;
}

export const Container = styled.div<IProps>`
    .DayPicker * {
        outline: none;
        font-size: 14px;
    }

    .DayPicker-Day {
        background-color: #1dd1a1;
        color: #fff;
        border-radius: 0px;
        margin-bottom: 8px;
    }

    .DayPicker-Day--disabled {
        color: #a0aec0;
        background-color: #edf2f7 !important;
    }

    .DayPicker-Weekday {
        font-weight: 500;
        background-color: #4a5568 !important;
        color: #e2e8f0 !important;
        margin: 8px;
    }

    .DayPicker-Month {
        width: 100% !important;
        margin: 0px 0px !important;
    }

    .DayPicker {
        width: 100%;
        max-width: 450px;
        background: #fff;
    }

    .DayPicker-wrapper {
        padding-bottom: 0px !important;
    }

    .DayPicker-NavButton {
        margin-top: 0px !important;
        top: 0px;
    }

    .DayPicker-Day--selected {
        background-color: #54a0ff !important;
        color: #fff !important;
    }

    .DayPicker-Day--today {
        font-weight: 500;
    }

    .DayPicker:not(.DayPicker--interactionDisabled)
        .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):hover {
        background-color: #10ac84;
        color: #e2e8f0 !important;
        cursor: pointer;
    }
`;

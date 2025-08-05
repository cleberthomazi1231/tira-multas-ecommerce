import React from 'react';

import { Form as FormUnform } from '@unform/web';

const Form: React.FC<any> = React.forwardRef(({ children, ...rest }, ref) => {
    return (
        // @CHECK
        <FormUnform
            ref={ref as any}
            placeholder="teste"
            onPointerEnterCapture={() => console.log('')}
            onSubmit={() => console.log('')}
            onPointerLeaveCapture={() => console.log('')}
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
            onKeyPress={e => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                }
            }}
            {...rest}
        >
            {children}
        </FormUnform>
    );
});

export default Form;

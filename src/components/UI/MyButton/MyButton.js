import React from 'react';
import cl from './MyButton.module.css'

const MyButton = ({children, color, ...props}) => {
    return (
        <button
            {...props}
            className={cl.MyButton}
            style={{color, borderColor:color}}
        >
            {children}
        </button>
    );
};

export default MyButton;
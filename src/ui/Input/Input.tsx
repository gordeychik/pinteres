import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

interface IProps {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    value?: string;
    id?: string;
    type?: string;
    required?: boolean;
}

export const Input: React.FC<IProps> = ({ className, onChange, placeholder, value, id, type, required }) => {
    return (
        <input
            className={clsx(styles.input, className)}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            id={id}
            type={type}
            required={required}
        />
    );
};
import React from 'react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  label?: string;
  link?: string;
  buttonWidth: 'full' | 'auto';
  buttonStyle: 'primary' | 'secondary' | 'tertiary';
  buttonSize: 'sm' | 'base' | 'lg';
}

export const Button = (props: IButtonProps) => {
  const {
    leadingIcon,
    trailingIcon,
    label,
    onClick,
    link,
    disabled,
    // buttonWidth,
    type,
    form,
    // buttonStyle,
  } = props;

  const renderButton = () => {
    return (
      <div>
        <span>{leadingIcon}</span>
        {label && <span>{label}</span>}
        <span>{trailingIcon}</span>
      </div>
    );
  };

  return link ? (
    <a href={link}>{renderButton()}</a>
  ) : (
    <button onClick={onClick} disabled={disabled} type={type} form={form}>
      {renderButton()}
    </button>
  );
};

Button.defaultProps = {
  buttonStyle: 'primary',
  buttonSize: 'md',
  buttonWidth: 'auto',
};

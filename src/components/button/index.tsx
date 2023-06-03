import React from 'react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  label?: string;
  link?: string;
  buttonWidth?: 'full' | 'auto';
  buttonStyle?: 'primary' | 'secondary' | 'tertiary';
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Button = (props: IButtonProps) => {
  const { leadingIcon, trailingIcon, label, onClick, link, disabled, buttonWidth, type, form } =
    props;

  const renderButton = () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {leadingIcon}
        {label && (
          <span
            style={{
              flexGrow: 1,
            }}
          >
            {label}
          </span>
        )}
        {trailingIcon}
      </div>
    );
  };

  return link ? (
    <a href={link}>{renderButton()}</a>
  ) : (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      form={form}
      style={{
        width: buttonWidth,
      }}
    >
      {renderButton()}
    </button>
  );
};

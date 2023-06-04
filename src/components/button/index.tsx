import React from 'react';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  label?: string;
  link?: string;
  buttonWidth: 'full' | 'auto';
  buttonStyle: 'primary' | 'secondary' | 'tertiary';
  buttonSize: 'sm' | 'base' | 'lg';
}

const ButtonStyled = styled.div`
  display: flex;
  align-items: center;
  background-color: #e5e7eb;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;

  &:hover {
    background-color: #d1d5db;
  }

  &:active {
    background-color: #9ca3af;
  }

  :not(:first-child) {
    margin-left: 0.5rem;
  }

  > span {
    display: grid;
    place-items: center;
  }
`;

const Button = (props: IButtonProps) => {
  const { leadingIcon, trailingIcon, label, link, buttonWidth, form, disabled, onClick } = props;

  const renderButton = () => {
    return (
      <ButtonStyled>
        <span>{leadingIcon}</span>
        <span>{label}</span>
        <span>{trailingIcon}</span>
      </ButtonStyled>
    );
  };

  if (link) {
    return (
      <a
        href={link}
        style={{
          display: 'inline-block',
          width: buttonWidth === 'full' ? '100%' : buttonWidth,
        }}
      >
        {renderButton()}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      form={form}
      style={{
        width: buttonWidth === 'full' ? '100%' : buttonWidth,
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      {renderButton()}
    </button>
  );
};

Button.defaultProps = {
  buttonWidth: 'auto',
  buttonStyle: 'primary',
  buttonSize: 'base',
};

export default Button;

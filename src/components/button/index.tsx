'use client';

import React from 'react';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { IStyledComponent, css } from 'styled-components';
import { IStyledComponentProps } from '../../interfaces/styled-component';

type ButtonAttr = 'form' | 'disabled' | 'onClick';

interface IButtonProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, ButtonAttr> {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  label?: string;
  link?: string;
  buttonWidth?: 'full' | 'auto';
  buttonStyle?: 'primary' | 'secondary' | 'tertiary';
  buttonSize?: 'sm' | 'base' | 'lg';
}

const ButtonStyled: IStyledComponent<'web', any> = styled.div`
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

  > div {
    display: grid;
    place-items: center;

    &:not(:first-child) {
      margin-left: 0.5rem;
    }
  }

  ${({ userstyles }: IStyledComponentProps) =>
    (userstyles &&
      css`
        ${userstyles}
      `) ||
    ''};
`;

const Button = ({
  leadingIcon,
  trailingIcon,
  label,
  link,
  form,
  disabled,
  onClick,
  buttonWidth = 'auto',
}: IButtonProps) => {
  const renderButton = () => {
    return (
      <ButtonStyled userstyles={undefined}>
        {leadingIcon && <div>{leadingIcon}</div>}
        {label && <div>{label}</div>}
        {trailingIcon && <div>{trailingIcon}</div>}
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

export default Button;

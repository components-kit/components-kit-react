import React from 'react';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { StyledComponent, css } from 'styled-components';
import useSWR from 'swr';
import { IStyledComponent } from '../../interfaces/styled-component';
import { IApiComponent } from '../../interfaces/api-component';
import { fetcher } from '../../utils/fetcher';
import { CONSTANT } from '../../constant';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  label?: string;
  link?: string;
  buttonWidth: 'full' | 'auto';
  buttonStyle: 'primary' | 'secondary' | 'tertiary';
  buttonSize: 'sm' | 'base' | 'lg';
}

const ButtonStyled: StyledComponent<'div', any, IStyledComponent, never> = styled.div`
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

  > span {
    display: grid;
    place-items: center;
  }

  > span:not(:first-child) {
    margin-left: 0.5rem;
  }

  ${({ userStyles }: IStyledComponent) =>
    (userStyles &&
      css`
        ${userStyles}
      `) ||
    ''};
`;

const Button = (props: IButtonProps) => {
  const { leadingIcon, trailingIcon, label, link, buttonWidth, form, disabled, onClick } = props;
  const { data: buttonData } = useSWR<IApiComponent>(
    `${CONSTANT.API_URL}/components/button`,
    fetcher,
  );

  const renderButton = () => {
    return (
      <ButtonStyled userStyles={buttonData?.ui?.container}>
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

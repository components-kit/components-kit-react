'use client';

import React, { useEffect, useState } from 'react';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { IStyledComponent, css } from 'styled-components';
import useSWR from 'swr';
import { CONSTANT } from '../../constant';
import { fetcher } from '../../utils/fetcher';
import { useComponenstKitContext } from '../../context';
import classNames from 'classnames';

type CombinedType = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'disabled' | 'type' | 'form'
>;

export interface IButtonProps extends CombinedType {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  label?: string;
  buttonWidth?: 'full' | 'auto';
  appearance?: 'primary' | 'secondary';
  buttonSize?: 'sm' | 'md' | 'lg';
}

const ButtonStyled: IStyledComponent<'web', any> = styled.button`
  ${({ customstyles }) =>
    (customstyles &&
      css`
        ${customstyles}
      `) ||
    ''};
`;

const Button = ({
  leadingIcon,
  trailingIcon,
  label,
  form,
  disabled,
  onClick,
  buttonWidth = 'auto',
  appearance = 'primary',
  buttonSize = 'md',
}: IButtonProps) => {
  const [css, setCSS] = useState('');
  const { publicToken } = useComponenstKitContext();
  const { api } = CONSTANT;
  const { data, isLoading, error } = useSWR(`${api.components}/button`, (url: string) =>
    fetcher(url, publicToken),
  );

  const fallbackKey = 'button_fallback';

  useEffect(() => {
    const getCurrentFallback = localStorage.getItem(`${fallbackKey}`);
    const getCurrentFallbackVersion = localStorage.getItem(`${fallbackKey}_version`);

    if (isLoading || error) {
      if (getCurrentFallback) {
        setCSS(getCurrentFallback);
      }

      return;
    }

    if (!data) return;

    if (getCurrentFallbackVersion !== data.fallbackVersion && data.fallback) {
      localStorage.setItem(fallbackKey, data.fallback);
      localStorage.setItem(`${fallbackKey}_version`, data.fallbackVersion);
    }

    setCSS(data.css);
  }, [isLoading, error]);

  return (
    <ButtonStyled
      onClick={onClick}
      disabled={disabled}
      form={form}
      style={{
        width: buttonWidth === 'full' ? '100%' : buttonWidth,
      }}
      customstyles={css}
      className={classNames(appearance, buttonSize)}
    >
      {leadingIcon && <div>{leadingIcon}</div>}
      {label && <div>{label}</div>}
      {trailingIcon && <div>{trailingIcon}</div>}
    </ButtonStyled>
  );
};

export default Button;

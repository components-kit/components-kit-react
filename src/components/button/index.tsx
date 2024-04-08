'use client';

import React from 'react';
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
  width?: 'full' | 'auto';
  appearance?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
  width = 'auto',
  appearance = 'primary',
  size = 'md',
}: IButtonProps) => {
  const { publicToken } = useComponenstKitContext();
  const { api } = CONSTANT;
  const { data, isLoading } = useSWR(
    publicToken ? `${api.componentButton}/css` : undefined,
    (url: string) => fetcher(url, publicToken),
  );

  if (isLoading) {
    return null;
  }

  return (
    <ButtonStyled
      onClick={onClick}
      disabled={disabled}
      form={form}
      style={{
        width: width === 'full' ? '100%' : width,
      }}
      customstyles={data}
      className={classNames(appearance, size)}
    >
      {leadingIcon && <div>{leadingIcon}</div>}
      {label && <div>{label}</div>}
      {trailingIcon && <div>{trailingIcon}</div>}
    </ButtonStyled>
  );
};

export default Button;

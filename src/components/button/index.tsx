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
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  label?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

const ButtonStyled: IStyledComponent<'web', any> = styled.button`
  ${({ customstyles }) =>
    (customstyles &&
      css`
        ${customstyles}
      `) ||
    ''};
`;

export const Button = ({
  fullWidth,
  variant = 'primary',
  size = 'md',
  form,
  disabled,
  onClick,
  type,
  label,
  leadingIcon,
  trailingIcon,
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
      type={type}
      customstyles={data}
      className={classNames(variant, size, fullWidth && 'full-width')}
    >
      {leadingIcon}
      {label && <p>{label}</p>}
      {trailingIcon}
    </ButtonStyled>
  );
};

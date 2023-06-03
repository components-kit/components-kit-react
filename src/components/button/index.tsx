import React, { Component } from 'react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  label?: string;
  link?: string;
  buttonWidth: 'full' | 'auto';
  buttonStyle: 'primary' | 'secondary' | 'tertiary';
  buttonSize: 'sm' | 'base' | 'lg';
}

export class Button extends Component<IButtonProps> {
  static defaultProps: Partial<IButtonProps> = {
    buttonStyle: 'primary',
    buttonSize: 'base',
    buttonWidth: 'auto',
  };

  state = {
    isHovered: false,
    isActive: false,
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  handleMouseDown = () => {
    this.setState({ isActive: true });
  };

  handleMouseUp = () => {
    this.setState({ isActive: false });
  };

  renderButton = () => {
    const { leadingIcon, trailingIcon, label } = this.props;

    const { isHovered, isActive } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: isActive ? '#f3f4f6' : isHovered ? '#d1d5db' : '#e5e7eb',
          borderRadius: '0.25rem',
          padding: '0.25rem 0.5rem',
          fontSize: '0.875rem',
        }}
      >
        <span
          style={{
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {leadingIcon}
        </span>
        {label && (
          <span
            style={{
              marginLeft: '0.5rem',
            }}
          >
            {label}
          </span>
        )}
        <span
          style={{
            display: 'grid',
            placeItems: 'center',
            marginLeft: '0.5rem',
          }}
        >
          {trailingIcon}
        </span>
      </div>
    );
  };

  render() {
    const { onClick, link, disabled, buttonWidth, type, form } = this.props;

    if (link) {
      return (
        <a
          href={link}
          style={{
            display: 'inline-block',
            width: buttonWidth === 'full' ? '100%' : buttonWidth,
          }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        >
          {this.renderButton()}
        </a>
      );
    }

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        type={type}
        form={form}
        style={{
          width: buttonWidth === 'full' ? '100%' : buttonWidth,
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        {this.renderButton()}
      </button>
    );
  }
}

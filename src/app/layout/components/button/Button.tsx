import * as React from 'react';
import * as classnames from 'classnames';
import './Button.scss';

export type ButtonType = 'primary' | 'link' | 'inverse' | 'default';

interface ButtonProps {
  htmlType: string;
  children: string;
  loading?: boolean;
  type?: ButtonType;
  className?: string;
}

export function Button({children, className, htmlType, loading, type}: ButtonProps) {
  return (
    <button className={classnames(
      'btn', getButtonClass(type), {loading}, className
    )} type={htmlType}>{children}</button>
  );
}

function getButtonClass(type?: ButtonType) {
  const map = {primary: 'btn-primary', link: 'btn-link', inverse: 'btn-inverse', default: ''};
  return type ? map[type] : map.primary;
}

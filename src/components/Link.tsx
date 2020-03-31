import React from 'react'
import { Link as InternalLink } from 'gatsby'

interface Props {
  children?: React.ReactChild;
  to: string;
  activeClassName?: string;
  disabled?: boolean;
  title?: string;
  tabIndex?: number;
  target?: '_blank' | '_self' | '_parent' | '_top' | 'framename';
  onClick?: () => void;
}

export const Base = ({
  children,
  to,
  activeClassName,
  disabled,
  title,
  tabIndex,
  target,
  onClick,
  ...props
}: Props) => {
  const internal = to && !/^(?:(?:https?):\/\/)?(?:(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(to)

  if (disabled) {
    return (
      <span
        className={activeClassName}
        onClick={onClick}
        {...props}
      >
        {children}
      </span>
    )
  }

  if (internal) {
    return (
      <InternalLink
        to={to}
        activeClassName={activeClassName}
        title={title}
        tabIndex={tabIndex}
        onClick={onClick}
        {...props}
      >
        {children}
      </InternalLink>
    )
  }

  const href = to ? { href: to } : {}
  return (
    <a
      {...href}
      title={title}
      target={target}
      tabIndex={tabIndex}
      onClick={onClick}
      {...props}
    >
      {children}
    </a>
  )
}

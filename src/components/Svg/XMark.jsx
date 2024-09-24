import * as React from 'react'

const XMark = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.53 4.47a.75.75 0 0 1 0 1.06l-14 14a.75.75 0 0 1-1.06-1.06l14-14a.75.75 0 0 1 1.06 0Z"
      fill={props.fill || 'var(--content-primary)'}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.47 4.47a.75.75 0 0 1 1.06 0l14 14a.75.75 0 1 1-1.06 1.06l-14-14a.75.75 0 0 1 0-1.06Z"
      fill={props.fill || 'var(--content-primary)'}
    />
  </svg>
)

export default XMark

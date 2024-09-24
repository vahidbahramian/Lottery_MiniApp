import * as React from 'react'

function IconX(props) {
  return (
    <svg width="45" height="37" viewBox="0 0 45 37" fill="none" {...props}>
      <path
        d="M0 .324h13.31L25.61 14.456 40.924 0l3.638.054-17.137 16.435L45 36.676H31.696l-11.611-13.17L5.901 37H2.32l16.003-15.419L0 .324zM12.054 2.41H5.025l28.121 32.124h6.903L12.054 2.411z"
        fill="#fff"
      />
    </svg>
  )
}

const MemoIconX = React.memo(IconX)
export default MemoIconX

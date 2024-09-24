import * as React from 'react'

function IconRight(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.125 10a.625.625 0 01.625-.625h10.992l-4.559-4.558a.625.625 0 01.884-.884l5.625 5.625a.625.625 0 010 .884l-5.625 5.625a.626.626 0 11-.884-.884l4.559-4.558H3.75A.625.625 0 013.125 10z"
        fill="#666"
      />
    </svg>
  )
}

const MemoIconRight = React.memo(IconRight)
export default MemoIconRight

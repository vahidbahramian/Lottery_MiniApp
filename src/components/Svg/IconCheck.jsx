import * as React from 'react'

function IconCheck(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.697 6.283a1 1 0 01.02 1.414l-9.714 10a1 1 0 01-1.454-.02L4.263 13.01a1 1 0 111.474-1.353l3.57 3.887 8.976-9.24a1 1 0 011.414-.021z"
        fill="#19CC74"
      />
    </svg>
  )
}

const MemoIconCheck = React.memo(IconCheck)
export default MemoIconCheck

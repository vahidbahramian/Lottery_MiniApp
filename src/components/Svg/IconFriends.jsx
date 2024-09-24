import * as React from 'react'

const IconFriends = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
  >
    <g filter="url(#filter0_d_4_4563)">
      <path
        d="M7.00799 3.91785C5.65183 4.69764 4.83814 6.1216 4.83814 7.64727C4.83814 9.20685 5.65183 10.6308 7.00799 11.4106C8.33024 12.1904 9.99152 12.1904 11.3477 11.4106C12.6699 10.6308 13.5175 9.20685 13.5175 7.64727C13.5175 6.1216 12.6699 4.69764 11.3477 3.91785C9.99152 3.13806 8.33024 3.13806 7.00799 3.91785Z"
        fill={props?.fill || '#888888'}
      />
      <path
        d="M7.61826 13.6143C4.26178 13.6143 1.58337 16.3266 1.58337 19.6831C1.58337 20.2256 2.02412 20.6663 2.56659 20.6663H15.7552C16.2976 20.6663 16.7723 20.2256 16.7723 19.6831C16.7723 16.3266 14.06 13.6143 10.7035 13.6143H7.61826Z"
        fill={props?.fill || '#888888'}
      />
      <path
        d="M14.1845 7.64727C14.1845 9.2011 13.4575 10.6324 12.2852 11.5716C12.5238 12.3945 13.0804 13.1048 13.8693 13.5465C14.914 14.1464 16.2265 14.1464 17.2979 13.5465C18.3426 12.9467 19.0122 11.8513 19.0122 10.6517C19.0122 9.47808 18.3426 8.38272 17.2979 7.78289C16.3317 7.24196 15.1695 7.18883 14.1844 7.62352L14.1845 7.64727Z"
        fill={props?.fill || '#888888'}
      />
      <path
        d="M17.4392 19.6831C17.4392 20.0574 17.3119 20.3952 17.1029 20.6663H20.7801C21.2086 20.6663 21.5836 20.3273 21.5836 19.91C21.5836 17.3281 19.4408 15.2417 16.789 15.2417H15.7708C16.8099 16.4267 17.4392 17.9803 17.4392 19.6831Z"
        fill={props?.fill || '#888888'}
      />
    </g>
    <defs>
      <filter
        id="filter0_d_4_4563"
        x="-0.75"
        y="-0.5"
        width="26"
        height="26"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="0.5" />
        <feGaussianBlur stdDeviation="0.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_4_4563"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_4_4563"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export default IconFriends

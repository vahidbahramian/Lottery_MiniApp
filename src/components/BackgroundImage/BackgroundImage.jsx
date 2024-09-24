import React from 'react'

import clsx from 'clsx'

const BackgroundImage = ({ children, className, image, ...props }) => {
  return (
    <div
      className={clsx('flex items-center justify-center relative', className)}
      {...props}
    >
      <div className="absolute inset-0 z-[1] h-full w-full">{image}</div>
      <div className="z-10 flex w-full h-full justify-center">{children}</div>
    </div>
  )
}

export default BackgroundImage

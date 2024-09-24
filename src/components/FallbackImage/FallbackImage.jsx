import React, { useState } from 'react'
import Avatar from 'react-avatar'

export const FallbackImage = ({ src, fallbackSrc, alt, ...props }) => {
  const [imageError, setImageError] = useState(false)

  return imageError ? (
    <Avatar className="w-10 h-10" src={fallbackSrc} name={alt} {...props} />
  ) : (
    <img
      src={src}
      alt={alt}
      className="w-10 h-10"
      onError={() => setImageError(true)}
      onAbort={() => setImageError(true)}
      {...props}
    />
  )
}

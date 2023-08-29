import React from 'react'

type DropboxArrowIconProps = {
    className?: string;
    color?: string;
  };
  const DropboxArrowIcon: React.FC<DropboxArrowIconProps> = ({className, color}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill={color} width="20" height="20"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M12 14l-4-4h8z"/> </g> </svg>
  )
}

export default DropboxArrowIcon
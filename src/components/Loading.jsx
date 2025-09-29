import React from 'react'

const Loading = ({ height = 4 }) => {
  return (
    <div className="w-fit">
      <div
        className="animate-spin rounded-full border-t-2 border-r-1 border-b-4 border-l-11 border-blue-500 "
        style={{ width: `${height}rem`, height: `${height}rem` }}
      ></div>
    </div>
  )
}

export default Loading

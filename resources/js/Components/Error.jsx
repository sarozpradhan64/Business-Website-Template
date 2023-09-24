import React from 'react'

export default function Error({message}) {
  return (
    <div className='w-full bg-red-500 p-3 rounded-lg min-h-14'>
       <h3 className='text-lg text-white'>{message}</h3>
    </div>
  )
}

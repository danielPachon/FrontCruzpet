import React from 'react'

export default function BtnCancel({text}) {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex items-center justify-center bg-gradient-to-br from-red-400 to-red-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-red-600 hover:to-red-400 rounded-lg w-auto'>
        <button className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-red-600 hover:to-red-400 hover:text-white">
          {text}
        </button>
      </div>
    </div>
  )
}

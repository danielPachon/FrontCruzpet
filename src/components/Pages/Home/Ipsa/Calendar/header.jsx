import React from 'react'

export default function CalendarHeader({value, setValue}) {
    
  function currMonthName() {
    return value.format('MMMM')
  }

  function currYear() {
    return value.format('YYYY')
  }

  function prevMonth() {
    return value.clone().subtract(1, "month")
  }

  function nextMonth() {
    return value.clone().add(1, "month")
  }

  return (
    <div className="header">
        <button type="button" className='previous' onClick={() => setValue(prevMonth())}>
          {String.fromCharCode(171)}
        </button>
        <div className='current'>
          {currMonthName()} {currYear()}
        </div>
        <button type="button" className='next' onClick={() => setValue(nextMonth())}>
          {String.fromCharCode(187)}
        </button>
    </div>
  )
}

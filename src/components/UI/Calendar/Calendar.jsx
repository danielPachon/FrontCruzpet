import React, { useState, useEffect } from 'react'
import moment from "moment"
import './style.css'
import Header from './header'
import 'moment/locale/es';
import 'moment/min/moment-with-locales'
import axios from 'axios'

export default function Calendar({ value, onChange }) {
    
    const [calendar, setCalendar] = useState([])
    
    useEffect(() => {
        setCalendar(buildCalendar(value))

        
    }, [value])

    return (
        <div className="calendar">
            <Header value={value} setValue={onChange} />
            <div className="body">
                <div className="day-names">
                    {
                        ["D", "L", "M", "M", "J", "V", "S"].map((d) => (
                            <div className="week">{d}</div>
                        ))
                    }
                </div>
                {calendar.map(week => (
                <div>
                    {week.map(day => (
                    <div className="day" onClick={() => !beforeToday(day) && onChange(day)}>
                        <button type="button" className={dayStyles(day, value)}>
                            {day.format("D").toString()}
                        </button>
                    </div>
                    ))}
                </div>))
                }
            </div>
        </div>
    )
}  


export function buildCalendar(value) {
    const startDay = value.clone().startOf("month").startOf("week")
    const endDay = value.clone().endOf("month").endOf("week")
    const day = startDay.clone().subtract(1,"day")
    const calendar = []
    while(day.isBefore(endDay,"day")) {
        calendar.push(
            Array(7)
            .fill(0)
            .map(() => day.add(1, "day").clone())
        )
    }
    return calendar
}

function isSelected(day, value) {
    return value.isSame(day, "day")
}

export function beforeToday(day) {
    return day.isBefore(new Date(), "day")
}

function isToday(day) {
    return day.isSame(new Date(), "day")
    
}

export function dayStyles(day, value) {
    if (beforeToday(day)) return "before"
    if (isSelected(day, value)) return "selected"
    if (isToday(day)) return "today"
    return ""
}
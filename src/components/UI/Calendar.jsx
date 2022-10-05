import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es'

export class Calendar extends React.Component {
  render() {
    return (
      <div style={{ postion: 'relative', zIndex: 0, width: '100%', height: '100%'}}>
        <FullCalendar
          locale={esLocale}
          plugins={[ dayGridPlugin ]}
          initialView="dayGridWeek"
          selectable= 'true'
          // height={300}
        />
      </div>
    )
  }
}
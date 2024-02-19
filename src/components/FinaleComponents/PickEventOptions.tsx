import { Events } from '@/data/data'
import React from 'react'

const PickEventOptions = ({ handleChooseEventClick, eventIds, muted, playerName }: { handleChooseEventClick: (eventId: number) => void, eventIds: number[], muted: boolean, playerName: string }) => {

  if (muted) {
    return (
      eventIds.map((eventId, index) => {
        return (
          <div className='border bg-accent text-[#cfcfcf61] p-4 rounded-md w-full' key={`event${index}`}>
            <h2>{Events[eventId].title === 'Игрок заболел' ? `${Events[eventId].title} (${playerName})` : Events[eventId].title}</h2>
            <p className='text-muted-foreground'>{Events[eventId].description}</p>
          </div>
        )
      })
    )
  }

  return (
    eventIds.map((eventId, index) => {
      return (
        <div onClick={() => handleChooseEventClick(eventId)} className={'border p-4 rounded-md w-full hover:scale-105 hover:bg-primary transition-all cursor-pointer'} key={`event${index}`}>
          <h2>{Events[eventId].title === 'Игрок заболел' ? `${Events[eventId].title} (${playerName})` : Events[eventId].title}</h2>
          <p className='text-muted-foreground'>{Events[eventId].description}</p>
        </div>
      )
    }))
}

export default PickEventOptions
import { Events } from '@/data/data'
import React from 'react'
import { Card, CardDescription, CardTitle } from '../ui/card'

const PickEventOptions = ({ handleChooseEventClick, eventIds, muted, playerName }: { handleChooseEventClick: (eventId: number) => void, eventIds: number[], muted: boolean, playerName: string }) => {

  if (muted) {
    return (
      eventIds.map((eventId, index) => {
        return (
          <Card className={'w-full muted text-muted-foreground p-4'} key={`event${index}`}>
            <CardTitle className='text-lg'>{Events[eventId].title === 'Игрок заболел' ? `${Events[eventId].title} (${playerName})` : Events[eventId].title}</CardTitle>
            <CardDescription>{Events[eventId].description}</CardDescription>
          </Card>
          // <div className='border bg-muted text-muted-foreground p-4 rounded-md w-full' key={`event${index}`}>
          //   <h2>{Events[eventId].title === 'Игрок заболел' ? `${Events[eventId].title} (${playerName})` : Events[eventId].title}</h2>
          //   <p className='text-muted-foreground'>{Events[eventId].description}</p>
          // </div>
        )
      })
    )
  }

  return (
    eventIds.map((eventId, index) => {
      return (
        <Card onClick={() => handleChooseEventClick(eventId)} className={'w-full p-4 hover:scale-105 hover:bg-primary transition-all cursor-pointer'} key={`event${index}`}>
          <CardTitle className='text-lg'>{Events[eventId].title === 'Игрок заболел' ? `${Events[eventId].title} (${playerName})` : Events[eventId].title}</CardTitle>
          <CardDescription>{Events[eventId].description}</CardDescription>
        </Card>
        // <div onClick={() => handleChooseEventClick(eventId)} className={'border bg-card shadow-md shadow-accent p-4 rounded-md w-full hover:scale-105 hover:bg-primary transition-all cursor-pointer'} key={`event${index}`}>
        //   <h2>{Events[eventId].title === 'Игрок заболел' ? `${Events[eventId].title} (${playerName})` : Events[eventId].title}</h2>
        //   <p className='text-muted-foreground'>{Events[eventId].description}</p>
        // </div>
      )
    }))
}

export default PickEventOptions
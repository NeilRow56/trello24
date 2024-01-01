'use client'

import { ElementRef, useRef, useState } from 'react'
import { ListWithCards } from '../../../../../../../types'
import ListHeader from './ListHeader'
import { CardForm } from './CardForm'
import { cn } from '@/lib/utils'
import { CardItem } from './CardItem'

type ListItemProps = {
  index: number
  data: ListWithCards
}

const ListItem = ({ index, data }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<'textarea'>>(null)
  const [isEditing, setIsEditing] = useState(false)

  const disableEditing = () => {
    setIsEditing(false)
  }

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }
  return (
    <li className="delect-none h-full w-[272px] shrink-0">
      <div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
        <ListHeader onAddCard={enableEditing} data={data} />
        <ol
          className={cn(
            'mx-1 flex flex-col gap-y-2 px-1 py-0.5',
            data.cards.length > 0 ? 'mt-2' : 'mt-0'
          )}
        >
          {data.cards.map((card, index) => (
            <CardItem index={index} key={card.id} data={card} />
          ))}
        </ol>
        <CardForm
          listId={data.id}
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  )
}

export default ListItem

'use client'

import { useEffect, useState } from 'react'
import { ListWithCards } from '../../../../../../../types'
import ListForm from './ListForm'
import ListItem from './ListItem'

type ListContainerProps = {
  data: ListWithCards[]
  boardId: string
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
  //ordered data to use with drag and drop
  const [orderedData, setOrderedData] = useState(data)

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  return (
    <ol className="flex h-full gap-x-3">
      {orderedData.map((list, index) => {
        return <ListItem key={list.id} index={index} data={list} />
      })}
      <ListForm />
      <div className="w-1 flex-shrink-0" />
    </ol>
  )
}

export default ListContainer

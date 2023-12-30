'use client'

import { ListWithCards } from '../../../../../../../types'
import ListForm from './ListForm'

type ListContainerProps = {
  data: ListWithCards[]
  boardId: string
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
  return (
    <ol>
      <ListForm />
      <div className="w-1 flex-shrink-0" />
    </ol>
  )
}

export default ListContainer

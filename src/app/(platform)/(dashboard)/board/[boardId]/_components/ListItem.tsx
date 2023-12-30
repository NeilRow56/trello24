'use client'

import { ListWithCards } from '../../../../../../../types'
import ListHeader from './ListHeader'

type ListItemProps = {
  index: number
  data: ListWithCards
}

const ListItem = ({ index, data }: ListItemProps) => {
  return (
    <li className="delect-none h-full w-[272px] shrink-0">
      <div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
        <ListHeader data={data} />
      </div>
    </li>
  )
}

export default ListItem

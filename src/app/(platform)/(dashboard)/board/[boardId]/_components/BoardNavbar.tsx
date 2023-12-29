import { Board } from '@prisma/client'
import BoardTitleForm from './BoardTitleForm'
import { BoardOptions } from './BoardOptions'

interface BoardNavbarProps {
  data: Board
}

export const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  return (
    <div className="fixed top-14 z-[40] flex h-14 w-full items-center gap-x-4 bg-black/50 px-6 text-white">
      <BoardTitleForm data={data} />

      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  )
}

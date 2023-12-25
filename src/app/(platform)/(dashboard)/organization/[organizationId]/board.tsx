import { deleteBoard } from '@/actions/delete-board'
import { Button } from '@/components/ui/button'
import FormDelete from './form-delete'

type BoardProps = {
  title: string
  id: string
}

export const Board = ({ title, id }: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id)
  return (
    <form action={deleteBoardWithId} className="flex items-center gap-x-2">
      <p className="flex w-full">Board name: &nbsp;{title}</p>
      <FormDelete />
    </form>
  )
}

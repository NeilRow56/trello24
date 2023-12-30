'use server'

import { auth } from '@clerk/nextjs'

import { InputType, ReturnType } from './types'
import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'
import { CreateList } from './schema'
import { revalidatePath } from 'next/cache'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { title, boardId } = data

  let list
  //Ensure there is a board created that can be added to list
  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    })

    if (!board) {
      return {
        error: 'Board not found',
      }
    }

    //Find last list created so that we can assign the correct order
    const lastList = await db.list.findFirst({
      where: { boardId: boardId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = lastList ? lastList.order + 1 : 1

    //Create new list
    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    })
  } catch (error) {
    return {
      error: 'Failed to create.',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: list }
}

export const createList = createSafeAction(CreateList, handler)

'use server'

import { auth } from '@clerk/nextjs'

import { InputType, ReturnType } from './types'
import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'
import { CreateCard } from './schema'
import { revalidatePath } from 'next/cache'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { title, boardId, listId } = data

  let card
  //First try and fetch the list where we are trying to insert this card. The board must also be related to the orgId

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    })

    if (!list) {
      return {
        error: 'List not Found',
      }
    }

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = lastCard ? lastCard.order + 1 : 1

    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    })
  } catch (error) {
    return {
      error: 'Failed to create.',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: card }
}

export const createCard = createSafeAction(CreateCard, handler)

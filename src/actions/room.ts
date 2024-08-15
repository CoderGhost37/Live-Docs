'use server';

import { nanoid } from 'nanoid'
import { liveblocks } from '@/lib//liveblocks';
import { revalidatePath } from 'next/cache';
import { getAccessType, parseStringify } from '@/lib/utils';
import { redirect } from 'next/navigation';

export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: 'Untitled'
    }

    const usersAccesses: RoomAccesses = {
      [email]: ['room:write']
    }

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: []
    });
    
    revalidatePath('/');

    return {
      success: true,
      data: parseStringify(room),
      message: 'Room created successfully',
    }
  } catch (error: any) {
    return {
      success: false,
      message: 'Error happened while creating a room',
      data: error.message
    }
  }
}
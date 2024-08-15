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
      defaultAccesses: ['room:write']
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

export const getDocument = async ({ roomId, userId }: { roomId: string; userId: string }) => {
  try {
      const room = await liveblocks.getRoom(roomId);
    
      const hasAccess = Object.keys(room.usersAccesses).includes(userId);
    
      if(!hasAccess) {
        throw new Error('You do not have access to this document');
      }
    
      return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while getting a room: ${error}`);
  }
}
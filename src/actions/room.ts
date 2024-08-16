'use server';

import { liveblocks } from '@/lib//liveblocks';
import { parseStringify } from '@/lib/utils';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: 'Untitled',
    };

    const usersAccesses: RoomAccesses = {
      [email]: ['room:write'],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ['room:write'],
    });

    revalidatePath('/');

    return {
      success: true,
      data: parseStringify(room),
      message: 'Room created successfully',
    };
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    return {
      success: false,
      message: 'Error happened while creating a room',
      data: error.message,
    };
  }
};

export const getDocument = async ({
  roomId,
  userId,
}: { roomId: string; userId: string }) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) {
      throw new Error('You do not have access to this document');
    }

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while getting a room: ${error}`);
  }
};

export const updateDocument = async (roomId: string, title: string) => {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });

    revalidatePath(`/documents/${roomId}`);

    return parseStringify(updatedRoom);
  } catch (error) {
    console.log(`Error happened while updating a room: ${error}`);
  }
};

export const getDocuments = async (email: string) => {
  try {
    const rooms = await liveblocks.getRooms({ userId: email });

    return parseStringify(rooms);
  } catch (error) {
    console.log(`Error happened while getting rooms: ${error}`);
  }
};

export const deleteDocument = async (roomId: string) => {
  try {
    await liveblocks.deleteRoom(roomId);
    revalidatePath('/');
    redirect('/');
  } catch (error) {
    console.log(`Error happened while deleting a room: ${error}`);
  }
};

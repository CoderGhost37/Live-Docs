'use client'

import { Editor } from '@/components/editor/Editor';
import { Header } from '@/components/header';
import { SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/nextjs';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react'
import React from 'react'
import { Loader } from '@/components/loader'
import { ActiveCollaborators } from './active-collaborators';

export const CollaborativeRoom = ({ roomId, roomMetadata }: CollaborativeRoomProps) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div className="flex w-fit items-center justify-center">
              <p className="document-title">Share</p>
            </div>
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  )
}

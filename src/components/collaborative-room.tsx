'use client'

import { Editor } from '@/components/editor/Editor';
import { Header } from '@/components/header';
import { SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/nextjs';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react'
import React from 'react'
import { Loader } from '@/components/loader'

export const CollaborativeRoom = () => {
  return (
    <RoomProvider id="my-room">
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div className="flex w-fit items-center justify-center">
              <p className="document-title">Share</p>
            </div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  )
}

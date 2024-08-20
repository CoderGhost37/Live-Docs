'use client';

import { updateDocument } from '@/actions/room';
import { Editor } from '@/components/editor/Editor';
import { Header } from '@/components/header';
import { Loader } from '@/components/loader';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react';
import Image from 'next/image';
import React from 'react';
import { ActiveCollaborators } from './active-collaborators';
import { ShareModel } from './share-model';
import { Input } from './ui/input';

export const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) => {
  const [documentTitle, setDocumentTitle] = React.useState(roomMetadata.title);
  const [editing, setEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLDivElement>(null);

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      setLoading(true);

      try {
        if (documentTitle !== roomMetadata.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle);

          if (updatedDocument) {
            setEditing(false);
          }
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        updateDocument(roomId, documentTitle);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [roomId, documentTitle]);

  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className='collaborative-room'>
          <Header>
            <div
              ref={containerRef}
              className='flex w-fit items-center justify-center'
            >
              {editing && !loading ? (
                <Input
                  type='text'
                  value={documentTitle}
                  ref={inputRef}
                  placeholder='Enter title'
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  disable={!editing}
                  className='document-title-input'
                />
              ) : (
                <>
                  <p className='document-title'>{documentTitle}</p>
                </>
              )}

              {currentUserType === 'editor' && !editing && (
                <Image
                  src='/assets/icons/edit.svg'
                  alt='edit'
                  width={24}
                  height={24}
                  onClick={() => setEditing(true)}
                  className='cursor-pointer ml-1'
                />
              )}

              {currentUserType !== 'editor' && !editing && (
                <p className='view-only-tag ml-1'>View only</p>
              )}

              {loading && (
                <p className='text-sm text-gray-400 ml-1'>saving...</p>
              )}
            </div>
            <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
              <ActiveCollaborators />

              <ShareModel
                roomId={roomId}
                collaborators={users}
                creatorId={roomMetadata.creatorId}
                currentUserType={currentUserType}
              />

              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

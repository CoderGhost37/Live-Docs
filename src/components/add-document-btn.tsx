'use client';

import { createDocument } from '@/actions/room';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

export const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const addDocumentHandler = () => {
    startTransition(() => {
      createDocument({ userId, email }).then((res) => {
        if (res.success) {
          toast.success(res.message);
          router.push(`/documents/${res.data.id}`);
        } else {
          toast.error(res.message, res.data);
        }
      });
    });
  };

  return (
    <Button
      type='submit'
      loading={isPending}
      onClick={addDocumentHandler}
      className='gradient-blue flex gap-1 shadow-md'
    >
      <Image src='/assets/icons/add.svg' alt='add' width={24} height={24} />
      <p className='hidden sm:block'>Start a blank document</p>
    </Button>
  );
};

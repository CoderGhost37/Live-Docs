'use client';

import { getClerkUsers } from '@/actions/user';
import { Loader } from '@/components/loader';
import {
  ClientSideSuspense,
  LiveblocksProvider,
} from '@liveblocks/react/suspense';
import { ReactNode } from 'react';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <LiveblocksProvider
      authEndpoint='/api/liveblocks-auth'
      resolveUsers={async ({ userIds }) => {
        const res = await getClerkUsers({ userIds });
        return res.data;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;

"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { Loader } from "@/components/loader";
import { getClerkUsers } from '@/actions/user';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <LiveblocksProvider
      authEndpoint='/api/liveblocks-auth'
      resolveUsers={async ({ userIds }) => {
        const res = await getClerkUsers({ userIds });
        return res.data;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
}

export default Provider
"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { Loader } from "@/components/loader";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <LiveblocksProvider authEndpoint='/api/liveblocks-auth'>
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
}

export default Provider
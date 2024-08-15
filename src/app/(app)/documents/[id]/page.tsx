import { Editor } from '@/components/editor/Editor';
import { Header } from '@/components/header';
import { SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/nextjs';

const DocumentPage = () => {
  return (
    <div className="">
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
  )
}

export default DocumentPage
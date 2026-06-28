import { api, HydrateClient } from "@/trpc/server";
import { ConversationList } from "@/app/_components/conversation-list";

export default async function Home() {
  const conversations = await api.conversation.list();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-stone-50">
        <header className="border-b border-stone-200 bg-white px-6 py-4">
          <h1 className="text-xl font-semibold text-stone-800">Inbox</h1>
        </header>
        <div className="mx-auto max-w-4xl px-6 py-6">
          <ConversationList conversations={conversations as never[]} />
        </div>
      </main>
    </HydrateClient>
  );
}

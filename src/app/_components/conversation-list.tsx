import type { Conversation } from "@/types";
import { ConversationCard } from "@/app/_components/conversation-card";

export function ConversationList({
  conversations,
}: {
  conversations: Conversation[];
}) {
  if (!conversations || conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-stone-400">
        <p className="text-sm">Nenhuma conversa encontrada</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
      {conversations.map((conv) => (
        <ConversationCard key={conv.id} conversation={conv} />
      ))}
    </div>
  );
}

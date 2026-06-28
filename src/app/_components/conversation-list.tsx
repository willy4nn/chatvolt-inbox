import { ConversationCard } from "@/app/_components/conversation-card";
import type { Conversation } from "@/types";

interface ConversationListProps {
	conversations: Conversation[];
}

export function ConversationList({ conversations }: ConversationListProps) {
	if (!conversations || conversations.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center px-margin-mobile py-20 text-on-surface-variant">
				<span className="material-symbols-outlined mb-3 text-[48px]">
					inbox
				</span>
				<p className="font-body-md text-body-md">Nenhuma conversa encontrada</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col">
			{conversations.map((conv) => (
				<ConversationCard conversation={conv} key={conv.id} />
			))}
		</div>
	);
}

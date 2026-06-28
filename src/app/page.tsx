import { InboxView } from "@/app/_components/inbox-view";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
	const conversations = await api.conversation.list({ status: "all" });

	return (
		<HydrateClient>
			<InboxView initialConversations={conversations} />
		</HydrateClient>
	);
}

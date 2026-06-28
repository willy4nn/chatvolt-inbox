import { ConversationList } from "@/app/_components/conversation-list";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
	const conversations = await api.conversation.list();

	return (
		<HydrateClient>
			<main className="min-h-screen bg-stone-50">
				<header className="border-stone-200 border-b bg-white px-6 py-4">
					<h1 className="font-semibold text-stone-800 text-xl">Inbox</h1>
				</header>
				<div className="mx-auto max-w-4xl px-6 py-6">
					<ConversationList conversations={conversations as never[]} />
				</div>
			</main>
		</HydrateClient>
	);
}

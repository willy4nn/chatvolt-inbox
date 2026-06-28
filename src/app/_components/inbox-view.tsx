"use client";

import { useState } from "react";

import { BottomNavBar } from "@/app/_components/bottom-nav-bar";
import { ConversationList } from "@/app/_components/conversation-list";
import { FloatingActionButton } from "@/app/_components/fab";
import { FilterBar } from "@/app/_components/filter-bar";
import { TopAppBar } from "@/app/_components/top-app-bar";
import { api } from "@/trpc/react";
import type { Conversation, ConversationFilter } from "@/types";

type FilterStatus = ConversationFilter;

interface InboxViewProps {
	initialConversations: Conversation[];
}

export function InboxView({ initialConversations }: InboxViewProps) {
	const [status, setStatus] = useState<FilterStatus>("all");

	const { data: conversations } = api.conversation.list.useQuery(
		{ status },
		{ initialData: status === "all" ? initialConversations : undefined },
	);

	return (
		<div className="min-h-screen bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container">
			<TopAppBar />

			<main className="mx-auto max-w-3xl pt-16 pb-20">
				<FilterBar active={status} onChange={setStatus} />
				<ConversationList conversations={conversations ?? []} />
			</main>

			<FloatingActionButton />
			<BottomNavBar />
		</div>
	);
}

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getConversations, getMessages } from "@/server/chatvolt";
import type { Conversation } from "@/types";

const statusFilterSchema = z.enum([
	"all",
	"UNRESOLVED",
	"UNREAD",
	"RESOLVED",
	"HUMAN_REQUESTED",
]);

export const conversationRouter = createTRPCRouter({
	list: publicProcedure
		.input(z.object({ status: statusFilterSchema.default("all") }))
		.query(async ({ input }) => {
			const conversations = (await getConversations()) as Conversation[];

			switch (input.status) {
				case "all":
					return conversations;
				case "UNREAD":
					return conversations.filter((conv) => conv.unreadMessagesCount > 0);
				case "UNRESOLVED":
				case "RESOLVED":
				case "HUMAN_REQUESTED":
					return conversations.filter((conv) => conv.status === input.status);
				default:
					return conversations;
			}
		}),

	messages: publicProcedure
		.input(
			z.object({
				conversationId: z.string(),
				count: z.number().min(1).max(100).default(10),
			}),
		)
		.query(async ({ input }) => {
			return getMessages(input.conversationId, input.count);
		}),
});

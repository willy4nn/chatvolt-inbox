import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getConversations, getMessages } from "@/server/chatvolt";
import type { Conversation } from "@/types";

const statusFilterSchema = z.enum(["all", "UNRESOLVED", "RESOLVED"]);

export const conversationRouter = createTRPCRouter({
	list: publicProcedure
		.input(z.object({ status: statusFilterSchema.default("all") }))
		.query(async ({ input }) => {
			const conversations = (await getConversations()) as Conversation[];

			if (input.status === "all") {
				return conversations;
			}

			return conversations.filter((conv) => conv.status === input.status);
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

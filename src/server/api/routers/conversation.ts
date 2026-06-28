import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { getConversations, getMessages } from "@/server/chatvolt";

export const conversationRouter = createTRPCRouter({
	list: publicProcedure.query(async () => {
		return getConversations();
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

import "server-only";

import { env } from "@/env";

const API_URL = "https://api.chatvolt.ai";

export async function getConversations() {
  const res = await fetch(`${API_URL}/conversation`, {
    headers: {
      Authorization: `Bearer ${env.CHATVOLT_API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Chatvolt API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<unknown>;
}

export async function getMessages(
  conversationId: string,
  count: number = 10
) {
  const res = await fetch(
    `${API_URL}/conversation/${conversationId}/messages/${count}`,
    {
      headers: {
        Authorization: `Bearer ${env.CHATVOLT_API_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Chatvolt API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<unknown>;
}

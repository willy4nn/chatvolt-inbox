export type ConversationStatus = "UNRESOLVED" | "RESOLVED" | "HUMAN_REQUESTED";
export type ConversationFilter =
	| "all"
	| "UNRESOLVED"
	| "UNREAD"
	| "RESOLVED"
	| "HUMAN_REQUESTED";
export type ConversationPriority = "LOW" | "MEDIUM" | "HIGH";
export type ConversationChannel =
	| "DASHBOARD"
	| "WEBSITE"
	| "CRISP"
	| "ZAPIER"
	| "API"
	| "FORM"
	| "MAIL"
	| "WHATSAPP"
	| "TELEGRAM"
	| "ZAPI"
	| "INSTAGRAM"
	| "INSTAGRAM_DM"
	| "MERCADOLIVRE"
	| "MERCADOLIVRE_DM"
	| "ZAPPERAPI"
	| "TWILIO"
	| "SLACK"
	| "SLACK_DM"
	| "SLACK_GROUP"
	| "YOUTUBE";

export interface ParticipantContact {
	id: string;
	email: string | null;
	phoneNumber: string | null;
	firstName: string | null;
	lastName: string | null;
	picture: string | null;
}

export interface Assignee {
	user: {
		id: string;
		name: string;
		email: string;
	};
}

export interface Conversation {
	id: string;
	title: string | null;
	status: ConversationStatus;
	priority: ConversationPriority;
	channel: ConversationChannel;
	isAiEnabled: boolean;
	isGroup: boolean;
	blocked: boolean;
	unreadMessagesCount: number;
	createdAt: string;
	updatedAt: string;
	lastHumanInteractionAt: string | null;
	participantsContacts: ParticipantContact[];
	assignees: Assignee[];
	channelExternalId: string | null;
}

function formatParticipantName(contact: ParticipantContact): string | null {
	if (contact.firstName || contact.lastName) {
		return [contact.firstName, contact.lastName].filter(Boolean).join(" ");
	}
	return null;
}

export function getConversationTitle(conv: Conversation): string {
	if (conv.title) return conv.title;

	const participant = conv.participantsContacts?.[0];
	if (participant) {
		const name = formatParticipantName(participant);
		if (name) return name;
		if (participant.email) return participant.email;
		if (participant.phoneNumber) return participant.phoneNumber;
	}

	return `Conversa via ${conv.channel}`;
}

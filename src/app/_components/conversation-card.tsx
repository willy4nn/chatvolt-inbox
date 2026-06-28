import type { Conversation } from "@/types";
import { getConversationTitle } from "@/types";

const channelLabel: Record<string, string> = {
	DASHBOARD: "Dashboard",
	WEBSITE: "Website",
	CRISP: "Crisp",
	ZAPIER: "Zapier",
	API: "API",
	FORM: "Formulário",
	MAIL: "E-mail",
	WHATSAPP: "WhatsApp",
	TELEGRAM: "Telegram",
	ZAPI: "Zapi",
	INSTAGRAM: "Instagram",
	INSTAGRAM_DM: "Instagram DM",
	MERCADOLIVRE: "Mercado Livre",
	MERCADOLIVRE_DM: "Mercado Livre DM",
	ZAPPERAPI: "ZapperAPI",
	TWILIO: "Twilio",
	SLACK: "Slack",
	SLACK_DM: "Slack DM",
	SLACK_GROUP: "Slack Grupo",
	YOUTUBE: "YouTube",
};

const statusLabel: Record<string, string> = {
	UNRESOLVED: "PENDENTE",
	RESOLVED: "RESOLVIDO",
	HUMAN_REQUESTED: "REQUISIÇÃO HUMANA",
};

const channelSymbol: Record<string, string> = {
	WHATSAPP: "chat",
	TELEGRAM: "send",
	MAIL: "mail",
	INSTAGRAM: "photo_camera",
	INSTAGRAM_DM: "photo_camera",
	SLACK: "tag",
	SLACK_DM: "tag",
	SLACK_GROUP: "tag",
	WEBSITE: "language",
	DASHBOARD: "dashboard",
	FORM: "description",
	API: "api",
	CRISP: "forum",
	ZAPIER: "bolt",
	ZAPI: "chat_bubble",
	ZAPPERAPI: "chat_bubble",
	MERCADOLIVRE: "shopping_cart",
	MERCADOLIVRE_DM: "shopping_cart",
	TWILIO: "call",
	YOUTUBE: "smart_display",
};

function getChannelSymbol(channel: string): string {
	return channelSymbol[channel] ?? "forum";
}

function getChannelColorClass(channel: string): string {
	switch (channel) {
		case "WHATSAPP":
			return "text-whatsapp";
		case "API":
			return "text-tertiary";
		case "DASHBOARD":
			return "text-on-surface-variant";
		case "WEBSITE":
			return "text-primary";
		default:
			return "text-primary";
	}
}

function formatDate(dateString: string): string {
	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) return "";

	const now = new Date();
	const isSameDay =
		date.getDate() === now.getDate() &&
		date.getMonth() === now.getMonth() &&
		date.getFullYear() === now.getFullYear();

	if (isSameDay) {
		return date.toLocaleTimeString("pt-BR", {
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	const yesterday = new Date(now);
	yesterday.setDate(yesterday.getDate() - 1);
	const isYesterday =
		date.getDate() === yesterday.getDate() &&
		date.getMonth() === yesterday.getMonth() &&
		date.getFullYear() === yesterday.getFullYear();

	if (isYesterday) {
		return "Ontem";
	}

	return date.toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
	});
}

interface ConversationCardProps {
	conversation: Conversation;
}

export function ConversationCard({ conversation }: ConversationCardProps) {
	const isUnread = conversation.unreadMessagesCount > 0;
	const participant = conversation.participantsContacts?.[0];
	const title = getConversationTitle(conversation);
	const timestamp = formatDate(
		conversation.updatedAt ?? conversation.createdAt,
	);
	const preview = conversation.title
		? `Conversa iniciada via ${channelLabel[conversation.channel] ?? conversation.channel}`
		: `Conversa iniciada via ${channelLabel[conversation.channel] ?? conversation.channel}`;

	return (
		<div
			className={`group relative flex cursor-pointer bg-surface px-4 py-4 transition-colors duration-200 hover:bg-surface-container-low active:scale-[0.995] active:transition-transform active:duration-100 ${
				isUnread
					? "border-outline-variant/50 border-b"
					: "border-outline-variant/50 border-b"
			}`}
		>
			{isUnread && (
				<div className="absolute top-0 bottom-0 left-0 w-[3px] bg-primary" />
			)}

			<div className="mr-4 shrink-0">
				<div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-surface-container-highest">
					{participant?.picture ? (
						// biome-ignore lint/performance/noImgElement: imagens dinâmicas de fonte externa
						<img
							alt={title}
							className="h-full w-full object-cover"
							src={participant.picture}
						/>
					) : (
						<span className="material-symbols-outlined text-[28px] text-primary">
							{getChannelSymbol(conversation.channel)}
						</span>
					)}
				</div>
			</div>

			<div className="min-w-0 flex-1">
				<div className="mb-0.5 flex items-start justify-between">
					<h3 className="truncate pr-2 font-headline-sm text-headline-sm text-on-surface">
						{title}
					</h3>
					{timestamp && (
						<span className="mt-1 shrink-0 font-label-sm text-label-sm text-on-surface-variant">
							{timestamp}
						</span>
					)}
				</div>

				<div className="mb-1.5 flex items-center gap-2">
					<span
						className={`material-symbols-outlined text-[16px] ${getChannelColorClass(conversation.channel)}`}
					>
						{getChannelSymbol(conversation.channel)}
					</span>
					<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
						{channelLabel[conversation.channel] ?? conversation.channel}
					</span>
					{conversation.status !== "RESOLVED" && (
						<span className="rounded bg-secondary-container/20 px-2 py-0.5 font-bold font-label-sm text-[10px] text-on-secondary-container">
							{statusLabel[conversation.status] ?? conversation.status}
						</span>
					)}
				</div>

				<p
					className={`truncate font-body-sm text-body-sm ${
						isUnread
							? "font-semibold text-on-surface"
							: "text-on-surface-variant"
					}`}
				>
					{preview}
				</p>
			</div>

			<div className="ml-2 flex flex-col items-end justify-between">
				{isUnread ? (
					<span className="rounded-full bg-primary px-2 py-0.5 font-bold text-[10px] text-on-primary">
						{conversation.unreadMessagesCount} não{" "}
						{conversation.unreadMessagesCount === 1 ? "lida" : "lidas"}
					</span>
				) : (
					<span className="h-5" />
				)}
				<span className="rounded bg-surface-container-high px-2 py-0.5 font-label-sm text-[10px] text-on-surface-variant dark:bg-surface-container-high dark:text-on-surface-variant">
					{conversation.priority}
				</span>
			</div>
		</div>
	);
}

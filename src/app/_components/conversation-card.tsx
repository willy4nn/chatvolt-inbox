import type { Conversation } from "@/types";
import { getConversationTitle } from "@/types";

const channelLabel: Record<string, string> = {
	DASHBOARD: "Dashboard",
	WEBSITE: "Site",
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
	UNRESOLVED: "Pendente",
	RESOLVED: "Resolvido",
	HUMAN_REQUESTED: "Requisição Humana",
};

const statusColor: Record<string, string> = {
	UNRESOLVED: "bg-amber-100 text-amber-700",
	RESOLVED: "bg-emerald-100 text-emerald-700",
	HUMAN_REQUESTED: "bg-blue-100 text-blue-700",
};

const priorityColor: Record<string, string> = {
	LOW: "text-stone-400",
	MEDIUM: "text-stone-600",
	HIGH: "text-red-500",
};

function ChannelIcon({ channel }: { channel: string }) {
	const icons: Record<string, string> = {
		WHATSAPP: "\u{1F4AC}",
		TELEGRAM: "\u{1F4E8}",
		MAIL: "\u{2709}\uFE0F",
		INSTAGRAM: "\u{1F4F7}",
		SLACK: "\u{1F4E0}",
		WEBSITE: "\u{1F310}",
		DASHBOARD: "\u{1F4CB}",
		FORM: "\u{1F4DD}",
		API: "\u{1F4BB}",
		CRISP: "\u{1F4AC}",
		ZAPIER: "\u{2699}\uFE0F",
	};

	return (
		<span className="text-lg" title={channel}>
			{icons[channel] ?? "\u{1F4E8}"}
		</span>
	);
}

export function ConversationCard({
	conversation,
}: {
	conversation: Conversation;
}) {
	const isUnread = conversation.unreadMessagesCount > 0;
	const participant = conversation.participantsContacts?.[0];
	const title = getConversationTitle(conversation);

	return (
		<div
			className={`flex items-start gap-4 border-stone-100 border-b bg-white px-4 py-4 transition-colors hover:bg-stone-50 ${
				isUnread ? "border-l-2 border-l-blue-500" : ""
			}`}
		>
			<div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-stone-100">
				{participant?.picture ? (
					// biome-ignore lint/performance/noImgElement: imagens dinâmicas de fonte externa
					<img
						alt=""
						className="h-full w-full object-cover"
						src={participant.picture}
					/>
				) : (
					<ChannelIcon channel={conversation.channel} />
				)}
			</div>

			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-2">
					<h2
						className={`truncate text-sm ${
							isUnread ? "font-semibold text-stone-900" : "text-stone-700"
						}`}
					>
						{title}
					</h2>
					{isUnread && (
						<span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-blue-500" />
					)}
				</div>

				{participant && !participant.firstName && !participant.lastName && (
					<p className="mt-0.5 truncate text-stone-400 text-xs">
						{participant.email ?? participant.phoneNumber}
					</p>
				)}

				<div className="mt-1 flex items-center gap-2">
					<span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-1.5 py-0.5 text-stone-500 text-xs">
						<ChannelIcon channel={conversation.channel} />
						{channelLabel[conversation.channel] ?? conversation.channel}
					</span>
					<span
						className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium text-xs ${statusColor[conversation.status] ?? ""}`}
					>
						{statusLabel[conversation.status] ?? conversation.status}
					</span>
					<span
						className={`text-xs ${priorityColor[conversation.priority] ?? ""}`}
					>
						{conversation.priority === "HIGH" ? "!" : "\u00B7"}{" "}
						{conversation.priority}
					</span>
					{isUnread && (
						<span className="font-medium text-blue-600 text-xs">
							{conversation.unreadMessagesCount} não{" "}
							{conversation.unreadMessagesCount === 1 ? "lida" : "lidas"}
						</span>
					)}
				</div>
			</div>

			<time className="shrink-0 pt-1 text-stone-400 text-xs">
				{new Date(conversation.createdAt).toLocaleDateString("pt-BR", {
					day: "2-digit",
					month: "2-digit",
				})}
			</time>
		</div>
	);
}

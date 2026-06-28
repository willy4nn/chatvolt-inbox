"use client";

export function FloatingActionButton() {
	return (
		<button
			aria-label="Nova conversa"
			className="fixed right-6 bottom-24 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg transition-transform active:scale-90"
			type="button"
		>
			<span className="material-symbols-outlined text-[28px]">add</span>
		</button>
	);
}

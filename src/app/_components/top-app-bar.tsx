import { ThemeToggle } from "@/app/_components/theme-toggle";

export function TopAppBar() {
	return (
		<header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-outline-variant border-b bg-surface px-margin-mobile dark:border-outline dark:bg-on-background">
			<div className="flex items-center gap-4">
				<button
					aria-label="Menu"
					className="rounded-full p-2 transition-colors duration-200 hover:bg-surface-container-low dark:hover:bg-surface-variant"
					type="button"
				>
					<span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">
						menu
					</span>
				</button>
				<h1 className="font-bold font-headline-lg-mobile text-headline-lg-mobile text-primary dark:text-primary-fixed-dim">
					Inbox
				</h1>
			</div>
			<div className="flex items-center gap-1">
				<button
					aria-label="Pesquisar"
					className="rounded-full p-2 transition-colors duration-200 hover:bg-surface-container-low dark:hover:bg-surface-variant"
					type="button"
				>
					<span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">
						search
					</span>
				</button>
				<ThemeToggle />
			</div>
		</header>
	);
}

"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();

	const isDark = resolvedTheme === "dark";

	return (
		<button
			aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
			className="rounded-full p-2 transition-colors duration-200 hover:bg-surface-container-low dark:hover:bg-surface-variant"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			type="button"
		>
			<span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">
				{isDark ? "light_mode" : "dark_mode"}
			</span>
		</button>
	);
}

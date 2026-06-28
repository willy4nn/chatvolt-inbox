"use client";

import { useEffect, useRef, useState } from "react";

const navItems = [
	{ label: "Conversas", icon: "chat", active: true },
	{ label: "Contatos", icon: "group", active: false },
	{ label: "Relatórios", icon: "analytics", active: false },
	{ label: "Ajustes", icon: "settings", active: false },
];

export function BottomNavBar() {
	const [hidden, setHidden] = useState(false);
	const lastScrollTop = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop =
				window.pageYOffset || document.documentElement.scrollTop;
			setHidden(scrollTop > lastScrollTop.current && scrollTop > 0);
			lastScrollTop.current = scrollTop;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-outline-variant border-t bg-surface px-margin-mobile py-2 shadow-xl transition-transform duration-300 ease-out dark:border-outline dark:bg-on-background ${
				hidden ? "translate-y-full" : "translate-y-0"
			}`}
		>
			{navItems.map((item) => (
				<button
					className={`flex flex-col items-center justify-center rounded-full px-5 py-1 transition-transform duration-150 active:scale-90 ${
						item.active
							? "bg-primary-container text-on-primary-container dark:bg-primary dark:text-on-primary"
							: "text-on-surface-variant transition-colors hover:text-primary dark:text-outline-variant dark:hover:text-primary-fixed-dim"
					}`}
					key={item.label}
					type="button"
				>
					<span
						className="material-symbols-outlined text-[24px]"
						style={
							item.active ? { fontVariationSettings: "'FILL' 1" } : undefined
						}
					>
						{item.icon}
					</span>
					<span className="mt-0.5 font-label-sm text-label-sm">
						{item.label}
					</span>
				</button>
			))}
		</nav>
	);
}

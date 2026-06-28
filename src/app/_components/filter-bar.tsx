"use client";

type FilterStatus = "all" | "UNRESOLVED" | "RESOLVED";

const filters: { value: FilterStatus; label: string; icon: string }[] = [
	{ value: "all", label: "Todas", icon: "all_inbox" },
	{ value: "UNRESOLVED", label: "Pendentes", icon: "pending_actions" },
	{ value: "RESOLVED", label: "Resolvidas", icon: "check_circle" },
];

interface FilterBarProps {
	active: FilterStatus;
	onChange: (status: FilterStatus) => void;
}

export function FilterBar({ active, onChange }: FilterBarProps) {
	return (
		<div className="sticky top-16 z-40 border-outline-variant/30 border-b bg-surface/80 px-margin-mobile py-4 backdrop-blur-md dark:border-outline/30">
			<div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
				{filters.map((filter) => {
					const isActive = active === filter.value;
					return (
						<button
							className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 font-label-md text-label-md transition-colors ${
								isActive
									? "bg-primary text-on-primary"
									: "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
							}`}
							key={filter.value}
							onClick={() => onChange(filter.value)}
							type="button"
						>
							<span className="material-symbols-outlined text-[16px]">
								{filter.icon}
							</span>
							{filter.label}
						</button>
					);
				})}
			</div>
		</div>
	);
}

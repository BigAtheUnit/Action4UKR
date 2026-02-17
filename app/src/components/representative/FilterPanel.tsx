import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface FilterOption {
    value: string;
    label: string;
}

interface FilterPanelProps {
    label: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function FilterPanel({ label, options, value, onChange, className }: FilterPanelProps) {
    return (
        <div className={cn('space-y-2', className)}>
            <label htmlFor="filter" className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                id="filter"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-[var(--color-ukraine-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ukraine-blue)]"
            >
                <option value="">All {label}s</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

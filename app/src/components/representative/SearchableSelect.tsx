import { useState, useMemo, useRef, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Option {
    value: string;
    label: string;
    details?: string;
}

interface SearchableSelectProps {
    options: Option[];
    value: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export function SearchableSelect({
    options,
    value,
    onChange,
    placeholder = 'Search...',
    className,
    disabled = false,
}: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Update internal search state when external value changes
    useEffect(() => {
        if (value) {
            const selected = options.find((opt) => opt.value === value);
            if (selected) {
                setSearch(selected.label);
            }
        } else {
            setSearch('');
        }
    }, [value, options]);

    const filteredOptions = useMemo(() => {
        if (!search && !isOpen) return options; // Optimization?? No, if closed we don't need to filter really
        if (!search) return options;

        const lowerSearch = search.toLowerCase();
        return options
            .filter((opt) =>
                opt.label.toLowerCase().includes(lowerSearch) ||
                opt.details?.toLowerCase().includes(lowerSearch)
            )
            .slice(0, 50); // Limit results for performance
    }, [options, search, isOpen]);

    const handleSelect = (option: Option) => {
        onChange(option.value);
        setSearch(option.label);
        setIsOpen(false);
    };

    const handleFocus = () => {
        setIsOpen(true);
        if (value) {
            // If a value is selected, clear search on focus to allow fresh searching? 
            // Or keep it? Standard behavior: select text.
            inputRef.current?.select();
        }
    };

    return (
        <div className={cn('relative w-full', className)} ref={containerRef}>
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    className={cn(
                        'w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base shadow-sm focus:border-[var(--color-ukraine-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ukraine-blue)] disabled:bg-gray-100 disabled:opacity-50',
                        className
                    )}
                    placeholder={placeholder}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setIsOpen(true);
                        if (value && e.target.value !== options.find(o => o.value === value)?.label) {
                            // If user types, clear selection until they pick again? 
                            // Or let parent handle it. For now simplified.
                            // onChange(''); // Optional: clear parent value while typing
                        }
                    }}
                    onFocus={handleFocus}
                    disabled={disabled}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            {isOpen && (
                <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredOptions.length === 0 ? (
                        <li className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-500">
                            No results found.
                        </li>
                    ) : (
                        filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                className={cn(
                                    'relative cursor-default select-none py-3 pl-3 pr-9 hover:bg-gray-50 cursor-pointer',
                                    value === option.value ? 'bg-[var(--color-ukraine-blue)] text-white hover:bg-[var(--color-ukraine-blue-dark)]' : 'text-gray-900'
                                )}
                                onClick={() => handleSelect(option)}
                            >
                                <div className="flex flex-col">
                                    <span className="block truncate font-medium">{option.label}</span>
                                    {option.details && (
                                        <span className={cn(
                                            "block truncate text-xs",
                                            value === option.value ? 'text-blue-100' : 'text-gray-500'
                                        )}>
                                            {option.details}
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}

import { useState } from 'react';
import { Button } from '../shared/Button';
import { lookupPostcode } from '../../services/postcodeApi';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface PostcodeInputProps {
    onFound: (constituency: string) => void;
    className?: string;
}

export function PostcodeInput({ onFound, className }: PostcodeInputProps) {
    const [postcode, setPostcode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!postcode.trim()) return;

        setLoading(true);
        setError(null);

        const constituency = await lookupPostcode(postcode);

        if (constituency) {
            onFound(constituency);
            setPostcode(''); // Clear input on success? Maybe keep it?
        } else {
            setError('Postcode not found or invalid.');
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSearch} className={cn('flex flex-col gap-2', className)}>
            <label htmlFor="postcode" className="text-sm font-medium text-gray-700">
                Search by Postcode
            </label>
            <div className="flex gap-2">
                <input
                    id="postcode"
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="e.g. SW1A 1AA"
                    className="flex-1 rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-[var(--color-ukraine-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ukraine-blue)] text-base"
                />
                <Button type="submit" isLoading={loading} disabled={!postcode.trim()}>
                    Find
                </Button>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
    );
}

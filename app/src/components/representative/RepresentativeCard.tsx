import { Card, CardContent } from '../shared/Card';
import type { Representative } from '../../types';

interface RepresentativeCardProps {
    rep: Representative;
    onClear?: () => void;
}

export function RepresentativeCard({ rep, onClear }: RepresentativeCardProps) {
    return (
        <Card className="bg-white border-[var(--color-ukraine-blue)] shadow-md animate-in fade-in zoom-in duration-300">
            <CardContent className="p-6 flex items-start justify-between gap-4">
                <div className="space-y-2">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{rep.name}</h3>
                        <p className="text-[var(--color-ukraine-blue)] font-medium">
                            {rep.constituency}
                            {rep.department && ` (${rep.department})`}
                            {rep.member_state && ` (${rep.member_state})`}
                        </p>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600">
                        {rep.party && <p><span className="font-semibold">Party:</span> {rep.party}</p>}
                        {rep.political_group && <p><span className="font-semibold">Group:</span> {rep.political_group}</p>}
                        {rep.email && <p><span className="font-semibold">Email:</span> {rep.email}</p>}
                    </div>
                </div>

                {onClear && (
                    <button
                        onClick={onClear}
                        className="text-gray-400 hover:text-red-500 transition-colors bg-gray-50 hover:bg-red-50 p-2 rounded-full"
                        title="Remove selection"
                        aria-label="Remove selection"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </CardContent>
        </Card>
    );
}

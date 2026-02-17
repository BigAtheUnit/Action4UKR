import { useApp } from '../../context/AppContext';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';
import { buildEmailUrl } from '../../services/emailUrlBuilder';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function EmailProvider() {
    const { state, nextStep, prevStep } = useApp();
    const { selectedRepresentative, subject, body } = state;

    const handleSend = (provider: 'mailto' | 'gmail' | 'yahoo' | 'outlook') => {
        if (!selectedRepresentative?.email) return;

        const url = buildEmailUrl(provider, {
            to: selectedRepresentative.email,
            subject,
            body
        });

        window.open(url, '_blank');
        nextStep();
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(body);
            alert('Message body copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const providers = [
        {
            id: 'gmail',
            label: 'Gmail',
            color: 'bg-red-50 text-red-700 hover:bg-red-100 border-red-100',
            icon: (
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
            )
        },
        {
            id: 'outlook',
            label: 'Outlook',
            color: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100',
            icon: (
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                    <path d="M1 18.257h6V5.743H1v12.514zm14.657-6.58L23 7l-7.343-4.677-1.13 1.558.026.02L21 8.324l-5.343 4.29-2.31-2.937-2.378 2.05L7 11.75v6.507l4.026 3.033 4.631-3.703 6.6-4.678-6.6-1.232zM23 18.257h-6v-5l6 4.677v.323z" />
                </svg>
            )
        },
        {
            id: 'yahoo',
            label: 'Yahoo',
            color: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-100',
            icon: (
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                    <path d="M16 3l-3.3 5.4L9.4 3H5l5.4 8.6V21h4v-9.4L19.8 3h-3.8z" />
                </svg>
            )
        },
        {
            id: 'mailto',
            label: 'Default Mail App',
            color: 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200',
            icon: (
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            )
        },
    ] as const;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Ready to send?
                </h2>
                <p className="text-gray-500">
                    Click a logo to open your drafted message.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
                {providers.map((p) => (
                    <Card
                        key={p.id}
                        hoverable
                        onClick={() => handleSend(p.id)}
                        className={cn("transition-all hover:scale-105 active:scale-95 cursor-pointer border", p.color)}
                    >
                        <div className="p-6 flex flex-col items-center justify-center space-y-3">
                            {p.icon}
                            <span className="font-bold text-lg">{p.label}</span>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="max-w-xl mx-auto text-center space-y-4">
                <div className="bg-white p-4 rounded border border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">Can't open the app?</p>
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                        Copy Message Body
                    </Button>
                </div>
            </div>

            <div className="flex justify-start max-w-2xl mx-auto pt-4">
                <Button variant="ghost" onClick={prevStep}>
                    &larr; Back to Editor
                </Button>
            </div>
        </div>
    );
}

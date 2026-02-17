import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { CampaignStep } from '../../types';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Step {
    id: CampaignStep;
    label: string;
}

const STEPS: Step[] = [
    { id: 'country-selection', label: 'Country' },
    { id: 'representative-search', label: 'Find Rep' },
    { id: 'message-editor', label: 'Compose' },
    { id: 'email-provider', label: 'Send' },
    { id: 'confirmation', label: 'Done' },
];

interface ProgressIndicatorProps {
    currentStep: CampaignStep;
    className?: string;
}

export function ProgressIndicator({ currentStep, className }: ProgressIndicatorProps) {
    const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

    return (
        <div className={cn('w-full py-4', className)}>
            <div className="relative flex items-center justify-between">
                {/* Progress Bar Background */}
                <div className="absolute left-0 top-1/2 -z-10 h-1 w-full -translate-y-1/2 bg-gray-200 rounded-full" />

                {/* Active Progress Bar */}
                <div
                    className="absolute left-0 top-1/2 -z-10 h-1 -translate-y-1/2 bg-[var(--color-ukraine-blue)] rounded-full transition-all duration-300"
                    style={{ width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%` }}
                />

                {STEPS.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const isPending = index > currentStepIndex;

                    return (
                        <div key={step.id} className="flex flex-col items-center">
                            <div
                                className={cn(
                                    'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors z-10 bg-white',
                                    (isCompleted || isCurrent)
                                        ? 'border-[var(--color-ukraine-blue)]'
                                        : 'border-gray-300',
                                    isCompleted && 'bg-[var(--color-ukraine-blue)] text-white',
                                    isCurrent && 'text-[var(--color-ukraine-blue)]',
                                    isPending && 'text-gray-400'
                                )}
                            >
                                {isCompleted ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <div className="absolute top-10 w-24 flex justify-center">
                                <span
                                    className={cn(
                                        "text-xs font-medium hidden sm:block text-center transition-colors",
                                        isCurrent ? "text-[var(--color-ukraine-blue)] font-bold shadow-sm" :
                                            isCompleted ? "text-gray-700" : "text-gray-400"
                                    )}>
                                    {step.label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

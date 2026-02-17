import { useState, useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function PrivacyBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const { goToStep } = useApp();

    useEffect(() => {
        const isDismissed = localStorage.getItem('privacy-banner-dismissed');
        if (!isDismissed) {
            // Small delay for smooth entrance
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const dismiss = () => {
        setIsVisible(false);
        localStorage.setItem('privacy-banner-dismissed', 'true');
    };

    const handleLearnMore = () => {
        goToStep('privacy');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-in slide-in-from-bottom-5 duration-500 fade-in">
            <div className="bg-white/90 backdrop-blur-md border border-gray-200/50 p-4 rounded-2xl shadow-2xl flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-full text-blue-600 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-2">
                    <p className="text-sm font-medium text-gray-900">
                        We don't track you.
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                        No cookies, no analytics, no personal data storage. Just action.
                    </p>
                    <div className="flex gap-3 pt-1">
                        <button
                            onClick={handleLearnMore}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Read Policy
                        </button>
                        <button
                            onClick={dismiss}
                            className="text-xs font-semibold text-gray-500 hover:text-gray-700"
                        >
                            Got it
                        </button>
                    </div>
                </div>
                <button
                    onClick={dismiss}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    aria-label="Close"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

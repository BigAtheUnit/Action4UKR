import { useApp } from '../../context/AppContext';
import { Button } from '../shared/Button';
import { SocialShare } from '../shared/SocialShare';

export function Confirmation() {
    const { reset, goToStep } = useApp();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Good job!
                </h2>
                <p className="text-gray-600 max-w-lg mx-auto">
                    You've taken an important step. Note that your email provider opened in a new tab -
                    please make sure you clicked <strong>Send</strong> there.
                </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm max-w-2xl mx-auto space-y-6">
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-gray-900">multiply your impact</h3>
                    <p className="text-sm text-gray-500">
                        Share this campaign with 3 friends to amplify our voice.
                    </p>
                </div>
                <SocialShare />
            </div>

            <div className="space-y-4 pt-4">
                <Button onClick={() => goToStep('support')} size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    How else can I help? &rarr;
                </Button>

                <Button onClick={reset} variant="ghost" size="sm">
                    Contact Another Representative
                </Button>
            </div>
        </div>
    );
}

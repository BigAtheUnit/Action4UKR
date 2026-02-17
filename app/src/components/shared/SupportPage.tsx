import { useApp } from '../../context/AppContext';
import { Button } from '../shared/Button';
import { ArrowLeft, ExternalLink, Heart } from 'lucide-react';

export function SupportPage() {
    const { goToStep } = useApp();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-red-50 rounded-full mb-2">
                    <Heart className="w-8 h-8 text-red-500 fill-current" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Support Ukraine Directly
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Sending an email is a powerful first step. Here are other high-impact ways you can help Ukraine defend itself and rebuild.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
                {/* United24 */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col h-full space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                United24
                                <ExternalLink className="w-4 h-4 text-gray-400" />
                            </h3>
                            <p className="text-sm text-blue-600 font-medium tracking-wide uppercase">Official Fundraising Platform</p>
                        </div>
                        <p className="text-gray-600 flex-1">
                            Launched by the President of Ukraine, this is the main venue for collecting charitable donations in support of Ukraine. diverse directions: Defence and Demining, Medical Aid, and Rebuild Ukraine.
                        </p>
                        <a
                            href="https://u24.gov.ua/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Donate via United24
                        </a>
                    </div>
                </div>

                {/* Come Back Alive */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col h-full space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                Come Back Alive
                                <ExternalLink className="w-4 h-4 text-gray-400" />
                            </h3>
                            <p className="text-sm text-blue-600 font-medium tracking-wide uppercase">Competent Assistance</p>
                        </div>
                        <p className="text-gray-600 flex-1">
                            One of the most trusted and effective foundations providing competent assistance to the Ukrainian military since 2014. They supply thermal imaging, drones, and training.
                        </p>
                        <a
                            href="https://savelife.in.ua/en/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Support Come Back Alive
                        </a>
                    </div>
                </div>
            </div>

            {/* Other Ways */}
            <div className="bg-blue-50 rounded-xl p-8 max-w-3xl mx-auto text-center space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Spread the Word</h3>
                <p className="text-gray-700">
                    Information warfare is real. Share verified news, debunk myths, and keep the conversation about Ukraine alive in your community.
                </p>
            </div>

            <div className="flex justify-center pt-8">
                <Button variant="ghost" onClick={() => goToStep('country-selection')}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Start
                </Button>
            </div>
        </div>
    );
}

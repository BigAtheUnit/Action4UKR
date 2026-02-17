import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';

export function CountrySelector() {
    const { selectCountry, state } = useApp();

    return (
        <div className="flex flex-col items-center justify-center space-y-12 py-8 md:py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hero / Main Focus - UK */}
            <div className="text-center space-y-8 max-w-4xl relative">
                {/* Decorative element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/50 blur-3xl rounded-full -z-10" />

                <div className="inline-flex items-center justify-center p-4 bg-white shadow-sm rounded-full mb-6 ring-1 ring-gray-100">
                    <span className="text-6xl text-center filter drop-shadow-sm transform hover:scale-110 transition-transform duration-300">🇬🇧</span>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                        Email Your <span className="text-[var(--color-ukraine-blue)]">MP</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                        Ask your Member of Parliament to urgently support <span className="font-medium text-gray-900">Ukraine</span>.
                    </p>
                </div>

                <div className="pt-8 pb-4">
                    <button
                        onClick={() => selectCountry('UK')}
                        disabled={state.loading}
                        className="group relative inline-flex items-center justify-center px-8 py-5 text-xl font-bold text-white transition-all duration-200 bg-[var(--color-ukraine-blue)] rounded-full hover:bg-[var(--color-ukraine-blue-dark)] hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto min-w-[200px]"
                    >
                        {state.loading ? 'Loading...' : 'Start Now'}
                        {!state.loading && <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />}
                    </button>
                    <p className="text-sm text-gray-400 mt-4">Takes less than 2 minutes</p>
                </div>
            </div>

            {/* Secondary Options */}
            <div className="pt-16 w-full max-w-lg">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-gray-50 px-3 text-sm font-medium text-gray-500 uppercase tracking-widest">Other Regions</span>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                        onClick={() => selectCountry('EU')}
                        className="group flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200"
                    >
                        <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">🇪🇺</span>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">Contact EU MEPs</span>
                    </button>

                    <button
                        onClick={() => selectCountry('FR')}
                        className="group flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200"
                    >
                        <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">🇫🇷</span>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">Contact French Députés</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

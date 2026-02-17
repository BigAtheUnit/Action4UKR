import { useApp } from '../../context/AppContext';
import { SocialShare } from '../shared/SocialShare';

export function Header() {
    const { reset } = useApp();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-3 cursor-pointer group" onClick={reset}>
                    {/* Placeholder for a real logo if we had one, but text is fine */}
                    <div className="flex flex-col group-hover:opacity-80 transition-opacity">
                        <span className="text-xl font-extrabold text-[#0057B7] leading-none tracking-tight">ACTION FOR</span>
                        <span className="text-xl font-extrabold text-[#FFD700] leading-none tracking-tight text-shadow-sm" style={{ textShadow: '0px 1px 1px rgba(0,0,0,0.1)' }}>UKRAINE</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600 hidden md:inline-block">Share this campaign</span>
                    <SocialShare />
                </div>
            </div>
        </header>
    );
}

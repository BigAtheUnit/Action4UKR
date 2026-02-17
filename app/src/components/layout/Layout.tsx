import { Header } from './Header';
import { FundraisingLinks } from '../shared/FundraisingLinks';
import { PrivacyBanner } from '../shared/PrivacyBanner';
import { useApp } from '../../context/AppContext';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const { goToStep } = useApp();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
                {children}
                <FundraisingLinks />
            </main>
            <PrivacyBanner />
            <footer className="border-t bg-white py-8 text-center text-sm text-gray-500">
                <div className="container mx-auto px-4">
                    <p className="mb-2">© {new Date().getFullYear()} Action For Ukraine. Built by volunteers.</p>
                    <p className="text-xs text-gray-400">
                        This site is not affiliated with any government entity.
                    </p>
                    <div className="mt-4 flex justify-center gap-4 text-xs">
                        <button onClick={() => goToStep('privacy')} className="hover:text-blue-600 transition-colors">Privacy Policy</button>
                        <span className="text-gray-300">•</span>
                        <a href="#" className="hover:text-blue-600 transition-colors">About Us</a>

                    </div>
                </div>
            </footer>
        </div>
    );
}

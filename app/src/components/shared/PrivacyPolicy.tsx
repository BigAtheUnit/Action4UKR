import { ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function PrivacyPolicy() {
    const { reset } = useApp();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <button
                onClick={reset}
                className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Campaign
            </button>

            <div className="prose prose-blue max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h1>Privacy Policy</h1>
                <p className="text-sm text-gray-500">Last Updated: February 16, 2026</p>

                <h2>1. Introduction</h2>
                <p>Action For Ukraine ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our website.</p>

                <h2>2. Data We Collect</h2>
                <p>We collect minimal information necessary to help you contact your elected representative.</p>
                <ul>
                    <li><strong>Information you provide:</strong> Name and Postcode.</li>
                    <li><strong>Purpose:</strong> To identify your constituency and populate the email template to your representative.</li>
                </ul>

                <h2>3. How We Use Your Data</h2>
                <ul>
                    <li><strong>Local Processing:</strong> Your data is processed primarily in your browser. We do <strong>not</strong> store your name or postcode on our servers.</li>
                    <li><strong>Third-Party Services:</strong> We use <code>postcodes.io</code> to look up your parliamentary constituency. Your postcode is sent to their API for this purpose only.</li>
                </ul>

                <h2>4. Cookies</h2>
                <p>We use minimal local storage to remember your progress through the campaign flow. We do not use tracking cookies for advertising purposes.</p>
            </div>
        </div>
    );
}

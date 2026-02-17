import { User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function UserNameInput() {
    const { state, dispatch } = useApp();

    return (
        <div className="bg-blue-50/80 border-2 border-blue-200 rounded-xl p-5 shadow-md">
            <div className="space-y-4">
                <div>
                    <label htmlFor="user-name" className="block text-xl font-bold text-gray-900 mb-1">
                        Your Name <span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-gray-600">
                        This will be signed at the bottom of your email.
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                            <User className="h-5 w-5" />
                        </div>
                        <input
                            id="user-name"
                            type="text"
                            value={state.userName}
                            onChange={(e) => dispatch({ type: 'SET_USER_NAME', payload: e.target.value })}
                            placeholder="e.g. Jean Dupont"
                            className="w-full rounded-lg border-gray-300 pl-10 pr-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg transition-colors bg-white text-gray-900"
                        />
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 flex gap-2 items-start">
                        <span className="text-lg">ℹ️</span>
                        <p>
                            Please provide your real name. MPs and representatives typically only respond to their own constituents, so anonymous messages are often ignored.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

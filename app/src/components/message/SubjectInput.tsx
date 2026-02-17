import { useApp } from '../../context/AppContext';

export function SubjectInput() {
    const { state, dispatch } = useApp();

    return (
        <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                Subject Line
            </label>
            <input
                id="subject"
                type="text"
                value={state.subject}
                onChange={(e) => dispatch({ type: 'SET_SUBJECT', payload: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-[var(--color-ukraine-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ukraine-blue)] font-medium text-base"
            />
        </div>
    );
}

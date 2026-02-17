import { useApp } from '../../context/AppContext';

export function BodyEditor() {
    const { state, dispatch } = useApp();

    return (
        <div className="space-y-2">
            <label htmlFor="body" className="text-sm font-medium text-gray-700">
                Message Body
            </label>
            <textarea
                id="body"
                rows={12}
                value={state.body}
                onChange={(e) => dispatch({ type: 'SET_BODY', payload: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-[var(--color-ukraine-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ukraine-blue)] font-sans text-base leading-relaxed resize-y"
            />
            <div className="flex justify-end">
                <span className="text-xs text-gray-400">
                    {state.body.length} characters
                </span>
            </div>
        </div>
    );
}

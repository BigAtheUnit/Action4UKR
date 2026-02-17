import { useApp } from '../../context/AppContext';
import { Button } from '../shared/Button';
import { templates } from '../../config/templates';
import type { TemplateTone } from '../../types';

export function ToneSelector() {
    const { state, applyTemplate } = useApp();

    return (
        <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Choose message tone:</label>
            <div className="flex flex-wrap gap-2">
                {templates.map((tmpl) => (
                    <Button
                        key={tmpl.tone}
                        variant={state.selectedTone === tmpl.tone ? 'primary' : 'outline'}
                        onClick={() => applyTemplate(tmpl.tone as TemplateTone)}
                        size="sm"
                        className="flex-1 min-w-[100px]"
                    >
                        {tmpl.label}
                    </Button>
                ))}
                <Button
                    variant={state.selectedTone === 'custom' ? 'primary' : 'outline'}
                    onClick={() => applyTemplate('custom')}
                    size="sm"
                    className="flex-1 min-w-[100px] border-dashed"
                >
                    Write my own
                </Button>
            </div>
        </div>
    );
}

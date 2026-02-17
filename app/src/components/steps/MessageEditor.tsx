import { useApp } from '../../context/AppContext';
import { Button } from '../shared/Button';
import { ToneSelector } from '../message/ToneSelector';
import { SubjectInput } from '../message/SubjectInput';
import { BodyEditor } from '../message/BodyEditor';
import { UserNameInput } from '../message/UserNameInput';

export function MessageEditor() {
    const { state, nextStep, prevStep } = useApp();
    const { selectedRepresentative, userName } = state;

    const isValid = userName.trim().length > 0;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Compose your message
                </h2>
                <p className="text-gray-500">
                    Sending to <span className="font-semibold text-gray-900">{selectedRepresentative?.name}</span>
                    {selectedRepresentative?.constituency && ` (${selectedRepresentative.constituency})`}
                </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <UserNameInput />
                <hr className="border-gray-100" />
                <ToneSelector />
                <hr className="border-gray-100" />
                <SubjectInput />
                <BodyEditor />
            </div>

            <div className="flex justify-between items-center max-w-4xl mx-auto pt-4">
                <Button variant="ghost" onClick={prevStep}>
                    &larr; Back
                </Button>
                <div className="flex flex-col items-end gap-2">
                    <Button
                        onClick={nextStep}
                        size="lg"
                        disabled={!isValid}
                        className="px-8 shadow-lg shadow-blue-500/20"
                    >
                        Choose Email Provider &rarr;
                    </Button>
                    {!isValid && (
                        <p className="text-sm text-red-500 font-medium">
                            Please enter your name to continue.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

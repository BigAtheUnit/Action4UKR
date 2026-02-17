import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../shared/Button';
import { PostcodeInput } from '../representative/PostcodeInput';
import { FilterPanel } from '../representative/FilterPanel';
import { SearchableSelect } from '../representative/SearchableSelect';
import { RepresentativeCard } from '../representative/RepresentativeCard';


export function RepresentativeLookup() {
    const { state, selectRepresentative, prevStep } = useApp();
    const { selectedCountry, representatives } = state;

    const [filterValue, setFilterValue] = useState('');
    const [selectedRepId, setSelectedRepId] = useState<string | null>(null);

    // Derive unique filter options (Departments for FR, Member States for EU)
    const filterOptions = useMemo(() => {
        if (selectedCountry === 'FR') {
            const depts = Array.from(new Set(representatives.map(r => r.department).filter(Boolean))) as string[];
            return depts.sort().map(d => ({ value: d, label: d }));
        }
        if (selectedCountry === 'EU') {
            const states = Array.from(new Set(representatives.map(r => r.member_state).filter(Boolean))) as string[];
            return states.sort().map(s => ({ value: s, label: s }));
        }
        return [];
    }, [selectedCountry, representatives]);

    // Filter representatives list based on filter value
    const filteredReps = useMemo(() => {
        if (!filterValue) return representatives;
        if (selectedCountry === 'FR') {
            return representatives.filter(r => r.department === filterValue);
        }
        if (selectedCountry === 'EU') {
            return representatives.filter(r => r.member_state === filterValue);
        }
        return representatives;
    }, [representatives, filterValue, selectedCountry]);

    // Options for SearchableSelect
    const selectOptions = useMemo(() => {
        return filteredReps.map(r => ({
            value: r.id,
            label: r.name,
            details: r.constituency ? `${r.party ? r.party + ' - ' : ''}${r.constituency}` : r.party,
        }));
    }, [filteredReps]);

    // Handle Postcode Search (UK)
    const handlePostcodeFound = (constituency: string) => {
        // Normalize constituency name for matching?
        // For now assuming exact match or case-insensitive match
        const match = representatives.find(r =>
            r.constituency.toLowerCase() === constituency.toLowerCase()
        );

        if (match) {
            setSelectedRepId(match.id);
        } else {
            alert(`No representative found for constituency: ${constituency}`);
        }
    };

    const selectedRep = useMemo(() =>
        representatives.find(r => r.id === selectedRepId),
        [representatives, selectedRepId]
    );

    const handleContinue = () => {
        if (selectedRep) {
            selectRepresentative(selectedRep);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Context / Explainer */}
            <div className="text-center space-y-4 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider">
                    <span>Step 1 of 3</span>
                    <span>•</span>
                    <span>Find your Rep</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                    Find your representative
                </h2>

                <p className="text-lg text-gray-600 leading-relaxed">
                    We need to know who represents you so we can address the email correctly.
                    <br className="hidden md:block" />
                    {selectedCountry === 'UK' && "Enter your full postcode below—it's the most accurate way."}
                    {selectedCountry === 'FR' && "Select your department to see a list of your Députés."}
                    {selectedCountry === 'EU' && "Select your country to find your MEPs."}
                </p>
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
                {/* UK Specific Logic */}
                {selectedCountry === 'UK' && (
                    <div className="space-y-6">
                        <PostcodeInput onFound={handlePostcodeFound} />
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-gray-50 px-2 text-gray-500 uppercase">Or search by name</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* FR/EU Filter Logic */}
                {(selectedCountry === 'FR' || selectedCountry === 'EU') && (
                    <>
                        {filterOptions.length > 0 ? (
                            <FilterPanel
                                label={selectedCountry === 'FR' ? "Department" : "Member State"}
                                options={filterOptions}
                                value={filterValue}
                                onChange={(val) => {
                                    setFilterValue(val);
                                    setSelectedRepId(null); // Clear selection on filter change
                                }}
                            />
                        ) : selectedCountry === 'FR' && (
                            <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-md border border-blue-100">
                                <p>
                                    💡 Tip: You can search by typing your representative's name directly below.
                                    Don't know their name? <a href="https://www.assemblee-nationale.fr/dyn/vos-deputes" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">Find it here</a>.
                                </p>
                            </div>
                        )}
                    </>
                )}

                {/* Name Search (Common) */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        {selectedCountry === 'UK' ? "Type your MP name or constituency" : "Search Representative by Name"}
                    </label>
                    <SearchableSelect
                        options={selectOptions}
                        value={selectedRepId}
                        onChange={setSelectedRepId}
                        placeholder={selectedCountry === 'UK' ? "e.g. Boris Johnson or Uxbridge..." : "Type representative name..."}
                    />
                </div>

                {/* Selection Preview */}
                {selectedRep && (
                    <div className="space-y-4 pt-4">
                        <p className="text-sm font-medium text-gray-700">Selected Representative:</p>
                        <RepresentativeCard
                            rep={selectedRep}
                            onClear={() => setSelectedRepId(null)}
                        />
                        <Button
                            onClick={handleContinue}
                            fullWidth
                            size="lg"
                            className="mt-4"
                        >
                            Write to {selectedRep.name} &rarr;
                        </Button>
                    </div>
                )}

                {/* Navigation */}
                <div className="flex justify-start pt-4">
                    <Button variant="ghost" onClick={prevStep}>
                        &larr; Back to Country Selection
                    </Button>
                </div>
            </div>
        </div>
    );
}

import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';
import type { AppState, CampaignStep, CountryCode, Representative, TemplateTone } from '../types';
import { templates } from '../config/templates';
import { interpolate } from '../services/templateEngine';

type Action =
    | { type: 'SELECT_COUNTRY'; payload: CountryCode }
    | { type: 'SET_REPRESENTATIVES'; payload: Representative[] }
    | { type: 'SELECT_REPRESENTATIVE'; payload: Representative }
    | { type: 'SET_USER_NAME'; payload: string }
    | { type: 'SET_TONE'; payload: TemplateTone }
    | { type: 'SET_SUBJECT'; payload: string }
    | { type: 'SET_BODY'; payload: string }
    | { type: 'SET_STEP'; payload: CampaignStep }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'RESET' };

const initialState: AppState = {
    currentStep: 'country-selection',
    selectedCountry: null,
    representatives: [],
    selectedRepresentative: null,
    userName: '',
    selectedTone: 'diplomatic',
    subject: '',
    body: '',
    loading: false,
};

function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'SELECT_COUNTRY':
            return { ...state, selectedCountry: action.payload, loading: true };
        case 'SET_REPRESENTATIVES':
            return { ...state, representatives: action.payload, loading: false };
        case 'SELECT_REPRESENTATIVE':
            return { ...state, selectedRepresentative: action.payload };
        case 'SET_USER_NAME':
            const oldName = state.userName || 'Your Name';
            const newName = action.payload || 'Your Name';

            // Smarter replacement: Target the signature area (last occurrence)
            // This prevents replacing "a" in "as a constituent" when typing "a" as name.
            let newBody = state.body;
            const lastIndex = newBody.lastIndexOf(oldName);

            // Only replace if found and it's likely the signature (near the end)
            // We verify it's within the last 50 chars as a heuristic for signature
            if (lastIndex !== -1 && lastIndex > newBody.length - 100) {
                newBody = newBody.substring(0, lastIndex) + newName + newBody.substring(lastIndex + oldName.length);
            }

            return {
                ...state,
                userName: action.payload,
                // Subject is NOT updated when name changes, as per user request
                body: newBody
            };
        case 'SET_TONE':
            return { ...state, selectedTone: action.payload };
        case 'SET_SUBJECT':
            return { ...state, subject: action.payload };
        case 'SET_BODY':
            return { ...state, body: action.payload };
        case 'SET_STEP':
            return { ...state, currentStep: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

interface AppContextValue {
    state: AppState;
    dispatch: React.Dispatch<Action>;
    selectCountry: (code: CountryCode) => Promise<void>;
    selectRepresentative: (rep: Representative) => void;
    goToStep: (step: CampaignStep) => void;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
    applyTemplate: (tone: TemplateTone) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const STEP_ORDER: CampaignStep[] = [
    'country-selection',
    'representative-search',
    'message-editor',
    'email-provider',
    'confirmation',
];

// Sanitize base URL to ensure clean path concatenation
const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

const DATA_FILES: Record<CountryCode, string> = {
    UK: `${baseUrl}data/uk.json`,
    FR: `${baseUrl}data/france.json`,
    EU: `${baseUrl}data/eu.json`,
};

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getRepTitle = (country?: CountryCode) => {
        switch (country) {
            case 'UK': return 'MP';
            case 'FR': return 'Député';
            case 'EU': return 'MEP';
            default: return 'Representative';
        }
    };

    const selectCountry = useCallback(async (code: CountryCode) => {
        dispatch({ type: 'SELECT_COUNTRY', payload: code });
        try {
            const res = await fetch(DATA_FILES[code]);
            const data: Representative[] = await res.json();
            dispatch({ type: 'SET_REPRESENTATIVES', payload: data });
            dispatch({ type: 'SET_STEP', payload: 'representative-search' });
        } catch (err) {
            console.error('Failed to load data:', err);
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    const selectRepresentative = useCallback(
        (rep: Representative) => {
            dispatch({ type: 'SELECT_REPRESENTATIVE', payload: rep });
            // Auto-fill template
            const tmpl = templates.find((t) => t.tone === state.selectedTone) ?? templates[0];
            const data = {
                rep_name: rep.name,
                rep_title: getRepTitle(rep.country_code),
                constituency: rep.constituency || '',
                user_name: state.userName || 'Your Name',
            };
            dispatch({ type: 'SET_SUBJECT', payload: interpolate(tmpl.subject, data) });
            dispatch({ type: 'SET_BODY', payload: interpolate(tmpl.body, data) });
            dispatch({ type: 'SET_STEP', payload: 'message-editor' });
        },
        [state.selectedTone, state.userName]
    );

    const applyTemplate = useCallback(
        (tone: TemplateTone) => {
            dispatch({ type: 'SET_TONE', payload: tone });

            if (tone === 'custom') {
                dispatch({ type: 'SET_SUBJECT', payload: '' });
                dispatch({ type: 'SET_BODY', payload: '' });
                return;
            }

            const tmpl = templates.find((t) => t.tone === tone) ?? templates[0];
            const data = {
                rep_name: state.selectedRepresentative?.name ?? '',
                rep_title: getRepTitle(state.selectedRepresentative?.country_code),
                constituency: state.selectedRepresentative?.constituency ?? '',
                user_name: state.userName || 'Your Name',
            };
            dispatch({ type: 'SET_SUBJECT', payload: interpolate(tmpl.subject, data) });
            dispatch({ type: 'SET_BODY', payload: interpolate(tmpl.body, data) });
        },
        [state.selectedRepresentative, state.userName]
    );



    const goToStep = useCallback((step: CampaignStep) => {
        dispatch({ type: 'SET_STEP', payload: step });
    }, []);

    const nextStep = useCallback(() => {
        const idx = STEP_ORDER.indexOf(state.currentStep);
        if (idx < STEP_ORDER.length - 1) {
            dispatch({ type: 'SET_STEP', payload: STEP_ORDER[idx + 1] });
        }
    }, [state.currentStep]);

    const prevStep = useCallback(() => {
        const idx = STEP_ORDER.indexOf(state.currentStep);
        if (idx > 0) {
            dispatch({ type: 'SET_STEP', payload: STEP_ORDER[idx - 1] });
        }
    }, [state.currentStep]);

    const reset = useCallback(() => {
        dispatch({ type: 'RESET' });
    }, []);

    return (
        <AppContext.Provider
            value={{
                state,
                dispatch,
                selectCountry,
                selectRepresentative,
                goToStep,
                nextStep,
                prevStep,
                reset,
                applyTemplate,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within AppProvider');
    return ctx;
}

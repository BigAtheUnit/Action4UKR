import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { ProgressIndicator } from './components/shared/ProgressIndicator';
import { CountrySelector } from './components/steps/CountrySelector';
import { RepresentativeLookup } from './components/steps/RepresentativeLookup';
import { MessageEditor } from './components/steps/MessageEditor';
import { EmailProvider } from './components/steps/EmailProvider';
import { Confirmation } from './components/steps/Confirmation';
import { PrivacyPolicy } from './components/shared/PrivacyPolicy';
import { SupportPage } from './components/shared/SupportPage';

function CampaignFlow() {
  const { state } = useApp();

  const renderStep = () => {
    switch (state.currentStep) {
      case 'country-selection':
        return <CountrySelector />;
      case 'representative-search':
        return <RepresentativeLookup />;
      case 'message-editor':
        return <MessageEditor />;
      case 'email-provider':
        return <EmailProvider />;
      case 'confirmation':
        return <Confirmation />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'support':
        return <SupportPage />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {state.currentStep !== 'privacy' && <ProgressIndicator currentStep={state.currentStep} />}
        <div className="min-h-[400px]">
          {renderStep()}
        </div>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <CampaignFlow />
    </AppProvider>
  );
}

export default App;

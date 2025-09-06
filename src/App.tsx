import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import HomePage from '../components/HomePage';
import SignUpPage from '../components/SignUpPage';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage';
import SubscriptionPage from '../components/SubscriptionPage';
import MockInterviewPage from '../components/MockInterviewPage';
import AwaitingConfirmationPage from '../components/AwaitingConfirmationPage';
import ForgotPasswordPage from '../components/ForgotPasswordPage';
import ResetPasswordPage from '../components/ResetPasswordPage';
import Spinner from '../components/shared/Spinner';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

import { getCareerProfile, getProfilesForUser, getMe } from './services/apiService';

// --------------------- TYPES ---------------------
type User = any; // Replace with your User type
type CareerProfile = any; // Replace with your CareerProfile type

export enum AppPhase {
  INIT,
  HOME,
  SIGNUP,
  LOGIN,
  DASHBOARD,
  SUBSCRIPTION,
  MOCK_INTERVIEW,
  AWAITING_CONFIRMATION,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
}

// --------------------- CONTEXT ---------------------
interface AppContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  isSubscribed: boolean;
  setIsSubscribed: (val: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

// --------------------- REDUCER ---------------------
interface AppState {
  phase: AppPhase;
  error: string | null;
  notification: string | null;
  careerProfiles: CareerProfile[];
  selectedCareer: string | null;
  actionToken: string | null;
  userEmailForConfirmation: string | null;
  redirectToRecommendations: boolean;
  assessmentAnswers: string[] | null;
  isLoading: boolean;
  loadingMessage: string;
}

type AppAction =
  | { type: 'SET_PHASE'; phase: AppPhase }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'SET_NOTIFICATION'; notification: string | null }
  | { type: 'SET_CAREER_PROFILES'; careerProfiles: CareerProfile[] }
  | { type: 'ADD_CAREER_PROFILE'; profile: CareerProfile }
  | { type: 'SET_SELECTED_CAREER'; career: string | null }
  | { type: 'SET_ACTION_TOKEN'; token: string | null }
  | { type: 'SET_USER_EMAIL_CONFIRMATION'; email: string | null }
  | { type: 'SET_REDIRECT'; redirect: boolean }
  | { type: 'SET_ASSESSMENT_ANSWERS'; answers: string[] | null }
  | { type: 'SET_LOADING'; loading: boolean; message?: string }
  | { type: 'RESET' };

const initialState: AppState = {
  phase: AppPhase.INIT,
  error: null,
  notification: null,
  careerProfiles: [],
  selectedCareer: null,
  actionToken: null,
  userEmailForConfirmation: null,
  redirectToRecommendations: false,
  assessmentAnswers: null,
  isLoading: false,
  loadingMessage: '',
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PHASE': return { ...state, phase: action.phase };
    case 'SET_ERROR': return { ...state, error: action.error };
    case 'SET_NOTIFICATION': return { ...state, notification: action.notification };
    case 'SET_CAREER_PROFILES': return { ...state, careerProfiles: action.careerProfiles };
    case 'ADD_CAREER_PROFILE': return { ...state, careerProfiles: [action.profile, ...state.careerProfiles] };
    case 'SET_SELECTED_CAREER': return { ...state, selectedCareer: action.career };
    case 'SET_ACTION_TOKEN': return { ...state, actionToken: action.token };
    case 'SET_USER_EMAIL_CONFIRMATION': return { ...state, userEmailForConfirmation: action.email };
    case 'SET_REDIRECT': return { ...state, redirectToRecommendations: action.redirect };
    case 'SET_ASSESSMENT_ANSWERS': return { ...state, assessmentAnswers: action.answers };
    case 'SET_LOADING': return { ...state, isLoading: action.loading, loadingMessage: action.message ?? '' };
    case 'RESET': return { ...initialState, phase: AppPhase.HOME };
    default: return state;
  }
}

// --------------------- APP COMPONENT ---------------------
const App: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [user, setUser] = React.useState<User | null>(null);
  const [isSubscribed, setIsSubscribed] = React.useState<boolean>(false);

  // ---------------- INITIALIZATION ----------------
  useEffect(() => {
    const initializeApp = async () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const [path, queryString] = hash.split('?');
        const params = new URLSearchParams(queryString);
        const token = params.get('token');

        if (path.startsWith('/confirm') && token) {
          dispatch({ type: 'SET_ACTION_TOKEN', token });
          dispatch({ type: 'SET_PHASE', phase: AppPhase.AWAITING_CONFIRMATION });
          return;
        }

        if (path.startsWith('/reset') && token) {
          dispatch({ type: 'SET_ACTION_TOKEN', token });
          dispatch({ type: 'SET_PHASE', phase: AppPhase.RESET_PASSWORD });
          return;
        }
      }

      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        try {
          dispatch({ type: 'SET_LOADING', loading: true, message: 'Reauthenticating...' });
          const loggedInUser = await getMe();
          await handleLoginSuccess(loggedInUser);
        } catch (err) {
          console.error(err);
          localStorage.removeItem('authToken');
          dispatch({ type: 'SET_PHASE', phase: AppPhase.HOME });
        } finally {
          dispatch({ type: 'SET_LOADING', loading: false });
        }
      } else {
        dispatch({ type: 'SET_PHASE', phase: AppPhase.HOME });
      }
    };

    initializeApp();
  }, []);

  // ---------------- LOGIN ----------------
  const handleLoginSuccess = async (loggedInUser: User) => {
    setUser(loggedInUser);
    dispatch({ type: 'SET_NOTIFICATION', notification: null });
    dispatch({ type: 'SET_LOADING', loading: true, message: 'Loading your dashboard...' });
    try {
      if (loggedInUser._id) {
        const profiles = await getProfilesForUser(loggedInUser._id);
        dispatch({ type: 'SET_CAREER_PROFILES', careerProfiles: profiles });
      }
      setIsSubscribed(!!loggedInUser.isSubscribed || !!loggedInUser.isSchoolSponsored);
    } catch (err) {
      console.error(err);
      dispatch({ type: 'SET_ERROR', error: 'Could not load your saved profiles.' });
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
      dispatch({ type: 'SET_PHASE', phase: AppPhase.DASHBOARD });
    }
  };

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsSubscribed(false);
    dispatch({ type: 'RESET' });
  };

  // ---------------- SUBSCRIPTION SUCCESS ----------------
  const handleSubscriptionSuccess = async () => {
    alert('Subscription successful! Your plan has been upgraded.');
    if (user?._id) {
      dispatch({ type: 'SET_LOADING', loading: true, message: 'Updating your subscription...' });
      try {
        const updatedUser = await getMe();
        setUser(updatedUser);
        setIsSubscribed(updatedUser.isSubscribed || false);

        if (state.assessmentAnswers) {
          dispatch({ type: 'SET_LOADING', loading: true, message: 'Generating your career profile...' });
          const newProfile = await getCareerProfile(state.assessmentAnswers);
          dispatch({ type: 'ADD_CAREER_PROFILE', profile: newProfile });
          dispatch({ type: 'SET_ASSESSMENT_ANSWERS', answers: null });
          dispatch({ type: 'SET_REDIRECT', redirect: true });
        }
      } catch (err) {
        console.error(err);
        dispatch({ type: 'SET_ERROR', error: 'Failed to update your account. Please re-login.' });
      } finally {
        dispatch({ type: 'SET_LOADING', loading: false });
        dispatch({ type: 'SET_PHASE', phase: AppPhase.DASHBOARD });
      }
    } else {
      dispatch({ type: 'SET_PHASE', phase: AppPhase.DASHBOARD });
    }
  };

  // ---------------- ASSESSMENT SUBMISSION ----------------
  const submitAssessment = useCallback(
    async (answers: string[], childId?: string) => {
      if (!user?._id && !childId) {
        dispatch({ type: 'SET_ERROR', error: 'You must be logged in to submit an assessment.' });
        dispatch({ type: 'SET_PHASE', phase: AppPhase.LOGIN });
        return;
      }

      dispatch({ type: 'SET_LOADING', loading: true, message: 'Analyzing your personality...' });
      dispatch({ type: 'SET_ERROR', error: null });

      if (isSubscribed) {
        try {
          const newProfile = await getCareerProfile(answers, childId);
          if (!childId && user?._id) {
            const profiles = await getProfilesForUser(user._id);
            dispatch({ type: 'SET_CAREER_PROFILES', careerProfiles: profiles });
          }
        } catch (err) {
          console.error(err);
          dispatch({ type: 'SET_ERROR', error: err instanceof Error ? err.message : 'Unknown error' });
          throw err;
        } finally {
          dispatch({ type: 'SET_LOADING', loading: false });
          if (!childId) dispatch({ type: 'SET_PHASE', phase: AppPhase.DASHBOARD });
        }
      } else {
        dispatch({ type: 'SET_LOADING', loading: false });
        dispatch({ type: 'SET_ASSESSMENT_ANSWERS', answers });
        dispatch({ type: 'SET_REDIRECT', redirect: true });
        dispatch({ type: 'SET_PHASE', phase: AppPhase.SUBSCRIPTION });
      }
    },
    [user, isSubscribed]
  );

  // ---------------- RENDER CONTENT ----------------
  const renderContent = () => {
    switch (state.phase) {
      case AppPhase.HOME: return <HomePage onStart={() => dispatch({ type: 'SET_PHASE', phase: AppPhase.SIGNUP })} />;
      case AppPhase.SIGNUP: return <SignUpPage onSignUpSuccess={(email, token) => {
        dispatch({ type: 'SET_USER_EMAIL_CONFIRMATION', email });
        dispatch({ type: 'SET_ACTION_TOKEN', token });
        dispatch({ type: 'SET_PHASE', phase: AppPhase.AWAITING_CONFIRMATION });
      }} onGoToLogin={() => dispatch({ type: 'SET_PHASE', phase: AppPhase.LOGIN })} />;
      case AppPhase.LOGIN: return <LoginPage onLoginSuccess={handleLoginSuccess} onGoToSignUp={() => dispatch({ type: 'SET_PHASE', phase: AppPhase.SIGNUP })} onGoToForgotPassword={() => dispatch({ type: 'SET_PHASE', phase: AppPhase.FORGOT_PASSWORD })} notification={state.notification} />;
      case AppPhase.AWAITING_CONFIRMATION:
        if (!state.userEmailForConfirmation && !state.actionToken) { dispatch({ type: 'RESET' }); return null; }
        return <AwaitingConfirmationPage email={state.userEmailForConfirmation} token={state.actionToken} onConfirmSuccess={() => {
          dispatch({ type: 'SET_NOTIFICATION', notification: 'Email confirmed successfully! Please log in.' });
          dispatch({ type: 'SET_USER_EMAIL_CONFIRMATION', email: null });
          dispatch({ type: 'SET_ACTION_TOKEN', token: null });
          dispatch({ type: 'SET_PHASE', phase: AppPhase.LOGIN });
        }} />;
      case AppPhase.FORGOT_PASSWORD: return <ForgotPasswordPage onGoToLogin={() => dispatch({ type: 'SET_PHASE', phase: AppPhase.LOGIN })} />;
      case AppPhase.RESET_PASSWORD:
        if (!state.actionToken) { dispatch({ type: 'SET_PHASE', phase: AppPhase.LOGIN }); return null; }
        return <ResetPasswordPage token={state.actionToken} onResetSuccess={() => {
          dispatch({ type: 'SET_NOTIFICATION', notification: 'Your password has been reset successfully. Please log in.' });
          dispatch({ type: 'SET_ACTION_TOKEN', token: null });
          dispatch({ type: 'SET_PHASE', phase: AppPhase.LOGIN });
        }} />;
      case AppPhase.DASHBOARD:
        if (!user) { dispatch({ type: 'RESET' }); return <HomePage onStart={() => dispatch({ type: 'SET_PHASE', phase: AppPhase.SIGNUP })} />; }
        return <DashboardPage 
                  user={user}
                  careerProfiles={state.careerProfiles}
                  onSubmitAssessment={submitAssessment}
                  error={state.error}
                  onUpgrade={() => dispatch({ type: 'SET_PHASE', phase: AppPhase.SUBSCRIPTION })}
                  onStartInterview={(career) => dispatch({ type: 'SET_SELECTED_CAREER', career })}
                  isSubscribed={isSubscribed}
                  redirectToRecommendations={state.redirectToRecommendations}
                  onRedirectConsumed={() => dispatch({ type: 'SET_REDIRECT', redirect: false })}
                  onErrorAcknowledged={() => dispatch({ type: 'SET_ERROR', error: null })}
                />;
      case AppPhase.SUBSCRIPTION: return <SubscriptionPage user={user} onBack={() => dispatch({ type: 'SET_PHASE', phase: AppPhase.DASHBOARD })} onSubscriptionSuccess={handleSubscriptionSuccess} />;
      case AppPhase.MOCK_INTERVIEW:
        if (!state.selectedCareer) { dispatch({ type: 'SET_PHASE', phase: AppPhase.DASHBOARD }); return null; }
        return <MockInterviewPage careerName={state.selectedCareer} onEndInterview={() => dispatch({ type: 'SET_SELECTED_CAREER', career: null })} />;
      default: return <HomePage onStart={() => dispatch({ type: 'SET_PHASE', phase: AppPhase.SIGNUP })} />;
    }
  };

  const mainContainerClasses = `flex-grow container mx-auto px-4 py-8 flex flex-col items-center ${state.phase !== AppPhase.DASHBOARD && state.phase !== AppPhase.MOCK_INTERVIEW ? 'justify-center' : ''}`;

  return (
    <AppContext.Provider value={{ user, setUser, isSubscribed, setIsSubscribed }}>
      <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
        {(state.isLoading || state.phase === AppPhase.INIT) && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
            <Spinner message={state.isLoading ? state.loadingMessage : 'Initializing...'} />
          </div>
        )}
        <Header user={user} onLogoClick={() => dispatch({ type: 'RESET' })} onSignUp={() => dispatch({ type: 'SET_PHASE', phase: AppPhase.SIGNUP })} onLogin={() => dispatch({ type: 'SET_PHASE', phase: AppPhase.LOGIN })} onLogout={handleLogout} />
        <main className={mainContainerClasses}>{state.phase !== AppPhase.INIT && renderContent()}</main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
};

export default App;

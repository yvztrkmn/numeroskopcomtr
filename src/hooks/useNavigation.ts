import React, { useCallback, useContext } from 'react';
import type { Page } from '../App';
import type { Tab } from '../components/CalculatorPage';

// This, App.tsx'teki state ve setState fonksiyonlarını tutacak.
// Bu context, App.tsx'ten sağlanacak.
interface AppContextType {
    onNavigate: (page: Page) => void;
    onNavigateToCalculators: (tab: Tab) => void;
    onNavigateToHomeAndScroll: (sectionId: string) => void;
}

// Define AppContext here, once.
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AppContext = React.createContext<AppContextType>({
    onNavigate: () => {},
    onNavigateToCalculators: () => {},
    onNavigateToHomeAndScroll: () => {},
} as AppContextType);


export const useNavigate = () => {
    const { onNavigate } = useContext(AppContext);
    return useCallback((page: Page) => {
        onNavigate(page);
    }, [onNavigate]);
};

export const useNavigateToCalculators = () => {
    const { onNavigateToCalculators } = useContext(AppContext);
    return useCallback((tab: Tab) => {
        onNavigateToCalculators(tab);
    }, [onNavigateToCalculators]);
};

export const useNavigateToHomeAndScroll = () => {
    const { onNavigateToHomeAndScroll } = useContext(AppContext);
    return useCallback((sectionId: string) => {
        onNavigateToHomeAndScroll(sectionId);
    }, [onNavigateToHomeAndScroll]);
};
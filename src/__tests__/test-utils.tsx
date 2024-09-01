// testUtils.jsx
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { reducers } from '../redux/store'; // Update with the actual path
import { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Configure the persist reducer
const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Function to create a Redux store with persist capabilities
export function createTestStore() {
    const store = configureStore({
        reducer: persistedReducer,
    });
    const persistor = persistStore(store);
    return { store, persistor };
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    store?: ReturnType<typeof createTestStore>;
  }

// Create a custom wrapper for testing
export function renderWithProviders(ui: React.ReactElement, { store = createTestStore(), ...renderOptions }: ExtendedRenderOptions = {}) {
    function Wrapper({ children }: PropsWithChildren) {
        return (
            <Provider store={store.store}>
                <PersistGate loading={null} persistor={store.persistor}>
                    {children}
                </PersistGate>
            </Provider>
        );
    }

    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
}

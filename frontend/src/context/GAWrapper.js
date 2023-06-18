// Library
import { useEffect } from 'react';

// Firebase/GA4 SDK
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';

// Utils
import TagManager from '../utils/tagManagerHelper';

// -----------------------------------------------------------------

// GTM key
const tagManagerArgs = {
    prod: {
        gtmId: process.env.REACT_APP_GTM_KEY
    }
};

// Firebase/GA4
const firebaseConfig = {
    prod: {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    }
};

// -----------------------------------------------------------------

export let analyticsEvent;

const GAWrapper = ({ children }) => {
    useEffect(() => {
        let app;
        // Initialize Firebase/GA4/GTM/GCP based on env
        app = initializeApp(firebaseConfig.prod);
        TagManager.initialize(tagManagerArgs.prod);

        const analytics = getAnalytics(app);

        // LOGGER.log('gcpErrorHandler', errorHandler)
        // LOGGER.log('GA_analytics', analytics)

        analyticsEvent = analytics;
        // Log page_view
        logEvent(analytics, 'page_view', {
            page_title: document.title,
            page_location: window.location.origin,
            page_path: window.location.pathname
        });
    }, []);

    return <>{children}</>;
};

export default GAWrapper;

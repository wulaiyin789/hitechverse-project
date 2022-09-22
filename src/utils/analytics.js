import ReactGA from 'react-ga';

export const initGA = () => {
    if(process.env.NODE_ENV !== 'development') {
        ReactGA.initialize('UA-178787777-2');
    } else {
        ReactGA.initialize('UA-178787777-2', { debug: true });
    }
    // console.log('GA initialised');
};

export const logPageView = () => {
    // console.log(`Logging PageView for ${window.location.pathname}`);
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = '', action = '', label = '') => {
    if (category && action) {
        ReactGA.event({ category, action, label });
    }
};

export const logException = (description = '', fatal = false) => {
    if (description) {
        ReactGA.exception({ description, fatal });
    }
};
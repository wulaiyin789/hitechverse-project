import ReactGA from 'react-ga4';

export const initGA = () => {
    if(process.env.NODE_ENV !== 'development') {
        ReactGA.initialize('G-J6HHVPBDC2');
    } else {
        ReactGA.initialize('G-J6HHVPBDC2', { debug: true });
    }
    // console.log('GA initialised');
};

export const logPageView = () => {
    // console.log(`Logging PageView for ${window.location.pathname}`);

    // Old react-ga
    // ReactGA.set({ page: window.location.pathname });
    // ReactGA.pageview(window.location.pathname);

    // GA4
    ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: `Page: ${window.location.pathname}` });
};

export const logEvent = (category = '', action = '', label = '') => {
    if (category && action) {
        ReactGA.event({ category, action, label });
    }
};

// export const logException = (description = '', fatal = false) => {
//     if (description) {
//         ReactGA.exception({ description, fatal });
//     }
// };
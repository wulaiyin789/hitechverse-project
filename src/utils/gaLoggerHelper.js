import { logEvent } from 'firebase/analytics'

import { analyticsEvent } from '../context/GAWrapper'
// import LOGGER from './loggerHelper'

const GA_LOGGER = {
  event: (eventName, eventParams) => {
    try {
      logEvent(analyticsEvent, eventName, eventParams)
    } catch (e) {
      if(process.env.NODE_ENV === 'development') console.log('GA Error occurred: ', e)
    }
  },
}

export default GA_LOGGER;

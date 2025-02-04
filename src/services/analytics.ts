import ReactGA from 'react-ga';

const onError = (description: string) => {
  ReactGA.exception({ description });
};

/**
 * Track an event
 *
 * @param category Top level category for the event, e.g. 'User', 'Navigation', etc.
 * @param action Description of what happened in the event, e.g. 'Edited activity'
 * @param label More specific description of the action
 * @param value If applicable, a numerical value for the event
 * @returns nothing
 */
const onEvent = (category: string, action: string, label?: string, value?: number) =>
  ReactGA.event({
    category,
    action,
    label,
    value,
  });

const onPageView = () => ReactGA.pageview(window.location.pathname + window.location.search);

const initialize = () => {
  ReactGA.initialize(process.env.REACT_APP_ANALYTICS_ID ?? 'UA-101865570-1');
  // Set user role
  // TODO get user role from JWT
  ReactGA.set({ dimension1: 'god' });
  onPageView();
};

const analyticsService = {
  initialize,
  onError,
  onEvent,
  onPageView,
};

export default analyticsService;

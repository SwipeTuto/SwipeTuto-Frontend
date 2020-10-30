import ReactGA from "react-ga"
 
const TRACKING_ID = "G-LK11G49643"
 
function init() {
  // Enable debug mode on the local development environment
  const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development"
  // ReactGA.initialize(TRACKING_ID)
  ReactGA.initialize(TRACKING_ID, { debug: isDev })
}
 
function sendEvent(payload) {
  ReactGA.event(payload)
}
 
function sendPageview(path) {
  ReactGA.set({ 
    page: path ,
    title: path})
  ReactGA.pageview(path)
}

export default {
  init,
  sendEvent,
  sendPageview,
}
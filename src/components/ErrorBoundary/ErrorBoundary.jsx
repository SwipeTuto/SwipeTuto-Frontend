import React from "react";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    // process the error
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return <NotFoundPage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

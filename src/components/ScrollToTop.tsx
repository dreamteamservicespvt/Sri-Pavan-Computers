
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// This component will handle scrolling to top when navigating between routes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;

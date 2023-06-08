import { useEffect, useRef } from "react";

const options: IntersectionObserverInit = {
  root: document,
  rootMargin: "0px",
  threshold: 0.1,
};

export default function useIntersectionObserver(cb: () => void) {
  function callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    if (entries[0].isIntersecting) {
      cb();
      observer.unobserve(entries[0].target);
    }
  }

  const observer = useRef<IntersectionObserver>(new IntersectionObserver(callback, options));

  useEffect(() => {
    const observeCurrent = observer.current;
    return () => {
      observeCurrent.disconnect();
    };
  }, []);

  return observer.current;
}

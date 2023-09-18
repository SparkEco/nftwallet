import { useState, useEffect } from "react";

function useDelayUnmount(isMounted: boolean, delay: number): boolean {
  const [shouldRender, setShouldRender] = useState(isMounted);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delay);
      console.log("Delay");
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isMounted, shouldRender, delay]);

  return shouldRender;
}
export default useDelayUnmount;

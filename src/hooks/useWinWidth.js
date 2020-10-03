import { useEffect, useState } from 'react';

export const useWinWidth = () => {
  const [winWidth, setWinWidth] = useState();


  useEffect(() => {
    let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    window.addEventListener("resize", () => {
      let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      setWinWidth(width)
    })
    setWinWidth(width)
  }, []);

  return winWidth
};

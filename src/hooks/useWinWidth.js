import { useEffect, useState } from 'react';

export const useWinWidth = () => {
  const [winWidth, setWinWidth] = useState(Math.max(document.documentElement.clientWidth, window.innerWidth || 0));;

  const checkSize = () => {
    let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    setWinWidth(width)
  }


  useEffect(() => {
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize)
    }
  }, []);

  return winWidth
};

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCardsSize } from '../redux/layout/layout-selectors';
import { useWinWidth } from './useWinWidth';

export const useColumnsNumber = () => {
  const [colNumber, setColNumber] = useState()
  const cardsSize = useSelector(selectCardsSize)
  const winWidth = useWinWidth();


  useEffect(() => {

    switch (true) {
      case winWidth < 540:
        setColNumber(1);
        break;
      case winWidth < 680:
        setColNumber(2);
        break;

      case winWidth < 960 && cardsSize === "big":
        setColNumber(2);
        break;
      case winWidth < 960 && cardsSize === "small":
        setColNumber(3);
        break;
      case winWidth < 1600 && cardsSize === "big":
        setColNumber(3);
        break;
      case winWidth < 1600 && cardsSize === "small":
        setColNumber(4);
        break;
      case winWidth >= 1600 && cardsSize === "big":
        setColNumber(4);
        break;
      case winWidth >= 1600 && cardsSize === "small":
        setColNumber(6);
        break;



      default:
        setColNumber(1);
        break;

    }

  }, [cardsSize, winWidth]);

  return colNumber
};
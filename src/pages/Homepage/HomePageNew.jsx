import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

// import CardPreviewSmall from "../../components/CardsComponents/CardPreviewSmall/CardPreviewSmall";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import Loading from "../../components/Loading/Loading";
import { getCardAfterfilterAction, setCurrentSearch } from "../../redux/filter/filter-actions";
// import HeaderImage from "../../assets/logos/header_image.png";
import { ReactComponent as CommunityIllustration } from "../../assets/images/illustrations/community_illustration.svg";

import { selectCardsFetchedCards, selectCurrentSearch, selectTotalNumberOfResults } from "../../redux/filter/filter-selectors";
import { selectTheme } from "../../redux/layout/layout-selectors";

import "./HomePageNew.scss";
import { selectIsLoaded } from "../../redux/layout/layout-selectors";

import { initialSearchState, topicArray } from "../../helper";
import CardGridList from "../../components/CardsComponents/CardGridList/CardGridList";

import Register from "../../components/LayoutComponents/Login/Register";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import HowItWorks from "../../components/LayoutComponents/HowItWorks/HowItWorks";
import { setLoaded } from "../../redux/layout/layout-actions";

const HomePage = () => {
  // const isLoaded = useSelector(selectIsLoaded);
  const currentTheme = useSelector(selectTheme);
  const numOfResults = useSelector(selectTotalNumberOfResults);
  const dispatch = useDispatch();
  const currentSearch = useSelector(selectCurrentSearch);
  const isLoaded = useSelector(selectIsLoaded);
  const currentUser = useSelector(selectCurrentUser);
  // const [cardsAreReady, setCardsAreReady] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  // const cardsFetched = useSelector(selectCardsFetchedCards);

  // useEffect(() => {
  //   if (window.scrollY) {
  //     window.scroll(0, 0);
  //   }
  // }, []);

  const handleTopicClick = (newTopic) => {
    // console.log(newTopic);
    const currentSearchCopy = {
      ...currentSearch,
      searchTopic: newTopic,
      searchOrder: "likes",
    };
    dispatch(setCurrentSearch(currentSearchCopy));
    dispatch(getCardAfterfilterAction(currentSearchCopy));
  };

  useEffect(() => {
    console.log(numOfResults === 0);
    if (numOfResults === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [numOfResults]);

  useEffect(() => {
    console.log("isEmpty: ", isEmpty);
  }, [isEmpty, numOfResults]);

  return (
    <>
      {currentUser && <Redirect to={"/search"} />}
      <div className={`HomePage ${currentTheme}-theme`}>
        <header className="HomePage__header">
          <h1 className="title title-1">Swipetuto</h1>
          <h2 className="title title-2">On apprend quoi aujourd'hui ?</h2>
          <div className="HomePage__topics">
            {topicArray.map((topic, index) => (
              <CustomButton key={`topicKey${index}`} onClick={() => handleTopicClick(topic.queryName)}>
                {topic.name}
              </CustomButton>
            ))}
          </div>
        </header>
        <div className="HomePage__grid">
          {isLoaded && !isEmpty ? (
            <>
              <div className="HomePage__grid--overlay"></div>
              <CardGridList loadFilter={true} allowInfiniteScroll={false} />
            </>
          ) : isLoaded && isEmpty ? (
            <div className="HomePage__nocard">
              <h2 className="title title-2">Oups ! Il semble qu'aucune carte n'a été trouvée...</h2>
              <h2 className="title title-2">Mais au fait, comment ça marche Swipetuto ?</h2>
              <HowItWorks />
            </div>
          ) : (
            <Loading />
          )}
          {/* {isEmpty && (
            <div className="HomePage__nocard">
              <HowItWorks />
            </div>
          )} */}
        </div>
        <div className="HomePage__login">
          <h2 className="title title-2">Inscrivez-vous pour en découvrir bien plus :</h2>
          <div className="HomePage__login--box">
            <CommunityIllustration className="HomePage__login--illustration" />
            <Register />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

import React, { useEffect, useState, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import Loading from "../../components/Loading/Loading";
import { setCurrentSearch } from "../../redux/filter/filter-actions";
import { ReactComponent as CommunityIllustration } from "../../assets/images/illustrations/community_illustration.svg";
import { selectCurrentSearch, selectTotalNumberOfResults } from "../../redux/filter/filter-selectors";
import { selectTheme } from "../../redux/layout/layout-selectors";
import { selectIsLoaded } from "../../redux/layout/layout-selectors";
import { topicArray } from "../../helper/functions/getTopicsArray";
import CardGridList from "../../components/CardsComponents/CardGridList/CardGridList";
// import Register from "../../components/LayoutComponents/Login/Register";
import HowItWorks from "../../components/LayoutComponents/HowItWorks/HowItWorks";
import STSmallLogoBlackmod from "../../assets/stlogos/logo seul blackmode.png";
import STSmallLogo from "../../assets/stlogos/logo seul.png";
import "./HomePage.scss";

const Register = lazy(() => import("../../components/LayoutComponents/Login/Register"));

const HomePage = () => {
  const currentTheme = useSelector(selectTheme);
  const numOfResults = useSelector(selectTotalNumberOfResults);
  const dispatch = useDispatch();
  const currentSearch = useSelector(selectCurrentSearch);
  const isLoaded = useSelector(selectIsLoaded);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleTopicClick = (newTopic) => {
    const currentSearchCopy = {
      ...currentSearch,
      searchTopic: newTopic,
      searchOrder: "likes",
    };
    dispatch(setCurrentSearch(currentSearchCopy));
  };

  useEffect(() => {
    if (numOfResults === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [numOfResults]);

  return (
    <>
      <div className={`HomePage ${currentTheme}-theme-d`}>
        <header className="HomePage__header">
          <img src={currentTheme === "light" ? STSmallLogo : STSmallLogoBlackmod} alt="swipetuto logo" />

          <h1 className="title title-1">SWIPETUTO</h1>
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
              <div className={`HomePage__grid--overlay ${currentTheme}`}></div>
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
        </div>
        <div className="HomePage__login">
          <h2 className="title title-2">Inscrivez-vous pour en découvrir bien plus :</h2>
          <div className="HomePage__login--box">
            <Suspense fallback={<div />}>
              <CommunityIllustration className="HomePage__login--illustration" />
              <Register />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

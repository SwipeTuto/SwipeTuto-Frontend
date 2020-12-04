import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

// import CardPreviewSmall from "../../components/CardsComponents/CardPreviewSmall/CardPreviewSmall";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import Loading from "../../components/Loading/Loading";
import {
  getCardAfterfilterAction,
  setCurrentSearch,
} from "../../redux/filter/filter-actions";
// import HeaderImage from "../../assets/logos/header_image.png";
import { ReactComponent as CommunityIllustration } from "../../assets/images/illustrations/community_illustration.svg";

import { selectCurrentSearch } from "../../redux/filter/filter-selectors";
import { selectTheme } from "../../redux/layout/layout-selectors";

import "./HomePageNew.scss";
import { selectIsLoaded } from "../../redux/layout/layout-selectors";

import { initialSearchState, topicArray } from "../../helper";
import CardGridList from "../../components/CardsComponents/CardGridList/CardGridList";

import Register from "../../components/LayoutComponents/Login/Register";
import { selectCurrentUser } from "../../redux/user/user-selectors";

const HomePage = () => {
  // const isLoaded = useSelector(selectIsLoaded);
  const currentTheme = useSelector(selectTheme);

  const dispatch = useDispatch();
  const currentSearch = useSelector(selectCurrentSearch);
  const isLoaded = useSelector(selectIsLoaded);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (window.scrollY) {
      window.scroll(0, 0);
    }
    // const currentSearchCopy = {...currentSearch, searchTopic: null, searchOrder: "likes"};
    // dispatch(setCurrentSearch(currentSearchCopy))
    // console.log("call")
    const currentSearchCopy = { ...initialSearchState, searchOrder: "likes" };
    dispatch(getCardAfterfilterAction(currentSearchCopy));
  }, [dispatch]);

  const handleTopicClick = (newTopic) => {
    // console.log(newTopic);
    const currentSearchCopy = {
      ...currentSearch,
      searchTopic: newTopic,
      searchOrder: "likes",
    };
    dispatch(setCurrentSearch(currentSearchCopy));
  };

  return (
    <>
      {currentUser && <Redirect to={"/search"} />}
      <div className={`HomePage ${currentTheme}-theme`}>
        <header className="HomePage__header">
          <h1 className="title title-1">Swipetuto</h1>
          <h2 className="title title-2">On apprend quoi aujourd'hui ?</h2>
          <div className="HomePage__topics">
            {topicArray.map((topic, index) => (
              <CustomButton
                key={`topicKey${index}`}
                onClick={() => handleTopicClick(topic.queryName)}
              >
                {topic.name}
              </CustomButton>
            ))}
          </div>
        </header>
        <div className="HomePage__grid">
          <div className="HomePage__grid--overlay"></div>
          {isLoaded ? (
            <CardGridList loadFilter={true} allowInfiniteScroll={false} />
          ) : (
            <Loading />
          )}
        </div>
        <div className="HomePage__login">
          <h2 className="title title-2">
            Inscrivez-vous pour en découvrir bien plus :
          </h2>
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

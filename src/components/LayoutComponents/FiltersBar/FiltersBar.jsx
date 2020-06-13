// Bar avec les items pour filtrer les slides
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { ReactComponent as GridLargeLogo } from "../../../assets/images/grid.svg";
import { ReactComponent as GridSmallLogo } from "../../../assets/images/apps.svg";

import { getCardAfterfilterAction, setActive } from "../../../redux/filter/filter-actions";
import { getCardsAction } from "../../../redux/cards/cards-actions";

import { allFiltersItems } from "../../../constants"

import "./FiltersBar.scss";

const FiltersBar = ({ handleClickSize }) => {

  /**
   * CONTROLE
   * 1.SearchBar
   * 
   * TODO
   * 1. Gestion de la croix qui ne marche pas dans le label
   * Toujours es encore le problème de selction du men
   * 
   * STEP
   * 1. recuper les params du URL
   * 2. Split les params
   * 3. les ajouter dans le store
   * 
   * PROBLEM
   * 1. Dans le label la crois n'affiche pas all
   * 2. La gestion du all
   */

  const dispatch = useDispatch();
  const langage = useSelector((state) => state.filter.currentSearch);
  const activeClass = useSelector((state) => state.filter.activeClass);
  const [catOrLan, setCatOrLang] = useState(true)





  const AllOrFilterCards = (langage, category) => {
    langage || category ?
      dispatch(getCardAfterfilterAction(langage, category))
      :
      dispatch(setActive('all'))
    dispatch(getCardsAction())
  }

  // useEffect((e) => {
  //   const allFiltersItems = [
  //     ...document.querySelectorAll("button.FiltersBar__options--item"),
  //   ];
  //   allFiltersItems.map((item) => {
  //     item.classList.remove("active")
  //     if(item.dataset.filter === activeClass) {

  //       item.classList.add('active')
  //       setCatOrLang(false)
  //     } 
  //   })


  // }, [activeClass])

  const cardsClick = e => {

    AllOrFilterCards(langage)
    dispatch(setActive('all'))



  }

  const handleClick = (e) => {
    const newSearchFilters = e.target.dataset.filter;

    setCatOrLang(true)
    AllOrFilterCards(langage, newSearchFilters);

    dispatch(setActive('all'))
  }

  return (
    <div className="FiltersBar">
      <div className="FiltersBar__wrapper">
        <div className="FiltersBar__up">
          <select name="cards-filter" id="cards-filter">
            <option value="popular">Populaire</option>
            <option value="new">Nouveau</option>
          </select>
          <div className="FiltersBar__options">
            <NavLink
              to={`/cards${
                langage !== "" && langage !== undefined
                  ? `/${catOrLan ? langage : ''}`
                  : ``
                }`}
            >
              <button
                className={"FiltersBar__options--item " + (activeClass === 'all' && 'active')}
                onClick={(e) => handleClick(e)}
                data-filter="all"
              >
                Tous
            </button>
            </NavLink>
            <NavLink

              to={`/cards${
                langage !== "" && langage !== undefined
                  ? `/${langage}/theorie`
                  : `/theorie`
                }`}
            >


              <button
                className={"FiltersBar__options--item " + (activeClass === 'theorie' && 'active')}
                data-filter="theorie"
                onClick={handleClick}
              >
                Théorie
              </button>
            </NavLink>
            <NavLink
              to={`/cards${
                langage !== "" && langage !== undefined
                  ? `/${langage}/code`
                  : `/code`
                }`}
            >
              <button
                type="submit"
                // className="FiltersBar__options--item nav-link"
                // activeClassName="active"
                className={"FiltersBar__options--item " + (activeClass === 'code' && 'active')}
                data-filter="code"
                onClick={handleClick}
              >
                Code
              </button>
            </NavLink>
            <NavLink
              to={`/cards${
                langage !== "" && langage !== undefined
                  ? `/${langage}/memo`
                  : `/memo`
                }`}
            >
              <button
                // className="FiltersBar__options--item active"
                className={"FiltersBar__options--item " + (activeClass === 'memo' && 'active')}
                data-filter="memo"
                onClick={handleClick}
              >
                memo
              </button>
            </NavLink>

            <NavLink
              to={`/cards${
                langage !== "" && langage !== undefined
                  ? `/${langage}/bloccode`
                  : `/bloccode`
                }`}
            >
              <button
                name="bloc code"
                // className="FiltersBar__options--item"
                className={"FiltersBar__options--item " + (activeClass === 'bloc code' && 'active')}
                data-filter="bloc code"
                onClick={handleClick}
              >
                bloc code
              </button>
            </NavLink>
            <NavLink
              to={`/cards${
                langage !== "" && langage !== undefined
                  ? `/${langage}/performances`
                  : `/performances`
                }`}
            >
              <button
                // className="FiltersBar__options--item"
                className={"FiltersBar__options--item " + (activeClass === 'performances' && 'active')}
                data-filter="performances"
                onClick={handleClick}
              >
                Performances
              </button>
            </NavLink>
            <NavLink
              to={`/cards${
                langage !== "" && langage !== undefined
                  ? `/${langage}/ressources`
                  : `/ressources`
                }`}
            >
              <button
                // className="FiltersBar__options--item"
                className={"FiltersBar__options--item " + (activeClass === 'ressources' && 'active')}
                data-filter="ressources"
                onClick={handleClick}
              >
                Ressources
              </button>
            </NavLink>
            <NavLink
              to={`/cards${
                langage !== "" && langage !== undefined
                  ? `/${langage}/autre`
                  : `/autre`
                }`}
            >
              <button
                // className="FiltersBar__options--item"
                className={"FiltersBar__options--item " + (activeClass === 'autre' && 'active')}
                data-filter="autre"
                onClick={handleClick}
              >
                Autre
              </button>
            </NavLink>
          </div>
        </div>
        <div className="FiltersBar__down">
          <div
            className="FiltersBar__size-logo active"
            data-gridsize="small"
            onClick={(e) => handleClickSize(e)}
          >
            <GridSmallLogo className="grid-size-logo" pointerEvents="none" />
          </div>

          <div
            className="FiltersBar__size-logo "
            data-gridsize="big"
            onClick={(e) => handleClickSize(e)}
          >
            <GridLargeLogo className="grid-size-logo" pointerEvents="none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;

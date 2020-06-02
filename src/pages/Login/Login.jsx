// Présent dans App.js dans une Route ("/")

import React, { Fragment, useState } from "react";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton"
import { loginGoogle } from '../../services/userService'
import { langageList } from '../../services/searchService'


const LoginPage = props => {
  const [test, setTest] = useState(null)


  const handleClick = (e) => {
    loginGoogle().then(user => {
      props.history.push('/')
      console.log('3')
      props.test2()
    })
  }

  const handleClick2 = (e) => {
    langageList().then(rep => {
      setTest(rep.data.results)
    })
  }
  console.log('login OK')

  return (
    <Fragment>
      {
        test ?
          test.map(rep => <h1>{rep.name}</h1>)
          :
          null
      }
      <h1>Login page</h1>
      <CustomButton onClick={(e) => handleClick(e)} color="dark">
        SingnUp with Google
        </CustomButton>
      <CustomButton
        onClick={e => handleClick2(e)}
        color="dark">
        test
        </CustomButton>
    </Fragment>
  );
};
export default LoginPage;

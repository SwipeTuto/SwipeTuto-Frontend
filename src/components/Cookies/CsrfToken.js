import React from 'react';
import { getCookie } from "../../helper/getCookie"

var csrftoken = getCookie('csrftoken');
// var csrftoken = sessionStorage.getItem("X-CSRF-TOKEN")
// console.log(csrftoken)
const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};
export default CSRFToken;
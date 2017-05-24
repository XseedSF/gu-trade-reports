import axios from 'axios';


const delay = (ms) =>  new Promise((resolve) => setTimeout(resolve,ms));

export const fetchForm = (data) =>
delay(500)
.then(() => {
    return data;
});
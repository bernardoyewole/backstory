'use strict';

import { onEvent, select, selectAll, create, print } from "./utils.js";

const userImage = selectAll('.people-container img');
const usernames = selectAll('.people-container h3');
const cities = selectAll('.people-container p');

function setUserImages(arr) {
    userImage.forEach((img, index) => {
        img.setAttribute('src', `${arr[index].picture.medium}`)
    });
}

function setUsernames(arr) {
    usernames.forEach((username, index) => {
        username.innerText = `${arr[index].name.first} ${arr[index].name.last}`
    });
}

function setCities(arr) {
    cities.forEach((city, index) => {
        city.innerText = `${arr[index].location.city}`
    });
}

function appendUsers(arr) {
    setUserImages(arr);
    setUsernames(arr);
    setCities(arr);
}

const options = {
    method: 'GET', 
    mode: 'cors'
};

async function getUsers() {
    const URL = 'https://randomuser.me/api/?nat=CA&results=10&seed=same';

    try {
        const result = await fetch(URL, options);

        if (!result.ok) {
            throw new Error(`${result.statusText} (${result.status})`);
        }

        const users = await result.json();
        const list = users.results;
        console.log(list);
        appendUsers(list);
    } catch (error) {
        console.log(error.message);
    }
}

getUsers();
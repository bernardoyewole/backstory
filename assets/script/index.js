"use strict";

import { onEvent, select } from "./utils.js";

const loginBtn = select(".login-button");

const loginDetails = JSON.parse(localStorage.getItem("login"));
const login = [{ email: "demouser@mail.com", password: "admin" }];

let invalidMsg = select(".error-message");

localStorage.setItem("login", JSON.stringify(login));

function loginPage() {
    let email = select(".mail").value.trim();
    let password = select(".password").value.trim();

    let isValidEmail = email.length > 0;
    let isValidPassword = password.length > 0;

    let isMatch = loginDetails.some(details => details.email === email && details.password === password);

    let message = (!isValidEmail ? "Email is required " : "") +
                    (!isValidPassword ? "Password is required " : "") +
                    (!isMatch && isValidEmail && isValidPassword ? "Wrong email or password" : "");

    invalidMsg.classList.toggle("is-visible", message !== "");
    invalidMsg.innerHTML = message;

    if (isMatch) {
        select(".mail").value = "";
        select(".password").value = "";
        window.location.assign("home.html");
    }
}

onEvent("click", loginBtn, () => {
    loginPage();
});
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const targetTable = document.querySelector("#Ulist");
const serverUrl = "https://jsonplaceholder.typicode.com/users";
const sortButton = document.querySelectorAll(`.sort-button`);
var SortOptions;
(function (SortOptions) {
    SortOptions[SortOptions["byName"] = 0] = "byName";
    SortOptions[SortOptions["byPhone"] = 1] = "byPhone";
    SortOptions[SortOptions["byNick"] = 2] = "byNick";
    SortOptions[SortOptions["byEmail"] = 3] = "byEmail";
})(SortOptions || (SortOptions = {}));
let users;
class User {
    constructor(id, name, nickname, email, phone) {
        this.id = id;
        this.name = name;
        this.nickName = nickname;
        this.email = email;
        this.phone = phone;
    }
}
function RunServerApp() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {
        console.log(json);
        fillTable(readJson(json));
    });
    // dont work somehow
    function readJson(json) {
        const pureObj = JSON.parse(json.toString());
        users = pureObj.map((user) => user = new User(user.id, user.name, user.nickName, user.email, user.phone));
        fillTable(users);
        console.log("need some changes here");
        return users;
    }
    function fillTable(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield input.forEach((user) => createHTMLInstance(user));
        });
    }
    function cleanTable() {
        document.querySelectorAll(`.user-info-list`).forEach((e) => e.remove());
    }
    function createHTMLInstance(user) {
        let listItem = document.createElement("li");
        listItem.classList.add("user-info-list");
        listItem.innerHTML = `<div class="list-item list-name">${user.name}</div><div class="list-item list-username">${user.nickName}</div><div class="list-item list-mail">${user.email}</div><div class="list-item list-phone">${user.phone}</div>`;
        listItem.setAttribute("id", `${user.id}`);
        targetTable.append(listItem);
    }
    function GetSorted(option, input) {
        switch (option) {
            case SortOptions.byName: {
                let sorted = input.sort((a, b) => a.name.localeCompare(b.name));
                cleanTable();
                fillTable(sorted);
                break;
            }
            case SortOptions.byNick: {
                let sorted = input.sort((a, b) => a.nickName.localeCompare(b.nickName));
                cleanTable();
                fillTable(sorted);
                break;
            }
            case SortOptions.byPhone: {
                let sorted = input.sort((a, b) => a.phone.localeCompare(b.phone));
                cleanTable();
                fillTable(sorted);
                break;
            }
            case SortOptions.byEmail: {
                let sorted = input.sort((a, b) => a.email.localeCompare(b.email));
                cleanTable();
                fillTable(sorted);
                break;
            }
            default: {
                console.log("Invalid sort option");
            }
        }
    }
    document.addEventListener(`click`, (event) => {
        if (event.target !== null) {
            let element = event.target;
            if (element.classList.contains("sort-button")) {
                switch (element.id) {
                    case "sbName": {
                        GetSorted(SortOptions.byName, users);
                    }
                    case "sbUName": {
                        GetSorted(SortOptions.byNick, users);
                    }
                    case "sbPhone": {
                        GetSorted(SortOptions.byPhone, users);
                    }
                    case "sbMail": {
                        GetSorted(SortOptions.byEmail, users);
                    }
                    default: {
                        console.log("Unknown sort option");
                    }
                }
            }
        }
    });
}
function domReady() {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        RunServerApp();
    }
    else {
        document.addEventListener("DOMContentLoaded", (event) => {
            RunServerApp();
        });
    }
    console.log("dom is ready");
}
domReady();

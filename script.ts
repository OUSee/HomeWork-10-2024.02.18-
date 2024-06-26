const targetTable = document.querySelector("#Ulist") as Element;
const serverUrl = "https://jsonplaceholder.typicode.com/users" as string;
const sortButton = document.querySelectorAll(`.sort-button`) as NodeListOf<Element>;

let checkIfalreadyPrinted: boolean = false;

enum SortOptions{
    byName = 0,
    byPhone = 1, 
    byNick = 2,
    byEmail = 3
}

type Users = Array<User>;

let users: Users;

class User { 
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;

    constructor(id: number, name: string, username: string, email: string, phone: string) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
    }
}


function RunServerApp() {


    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            fillTable(readJson(json))
        });
    
    

    function readJson(json: Users) {
            users = json.map(
            (user: User) =>
                user = new User(user.id, user.name, user.username, user.email, user.phone)
        );
        return users;
    }

    async function fillTable(input: Users){
        await input.forEach((user) => createHTMLInstance(user));
    }

    function cleanTable() {
        document.querySelectorAll(`.user-info-list`).forEach((e) => e.remove());
    }

    function createHTMLInstance(user: User) {
        let listItem = document.createElement("li");
        listItem.classList.add("user-info-list");
        listItem.innerHTML = `<div class="list-item list-name">${user.name}</div><div class="list-item list-username">${user.username}</div><div class="list-item list-mail">${user.email}</div><div class="list-item list-phone">${user.phone}</div>`;
        listItem.setAttribute("id", `${user.id}`);
        targetTable.append(listItem);
    }

    function GetSorted(option: SortOptions, input: Users): void {
        switch (option){
            case SortOptions.byName:{
                let sorted = input.sort((a, b) => a.name.localeCompare(b.name));
                cleanTable();
                fillTable(sorted);
                break;
            }
            case SortOptions.byNick:{
                let sorted = input.sort((a, b) => a.username.localeCompare(b.username));
                cleanTable();
                fillTable(sorted);
                break;
            }
            case SortOptions.byPhone:{
                let sorted = input.sort((a, b) => a.phone.localeCompare(b.phone));
                cleanTable();
                fillTable(sorted);
                break;
            }
            case SortOptions.byEmail:{
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

    document.addEventListener(`click`, (event: Event) => {
        if (event.target !== null) {
            let element = event.target as Element;
            if (element.classList.contains("sort-button")) {
                switch (element.id) {
                    case "sbName": { 
                        GetSorted(SortOptions.byName, users);
                        break;
                    }
                    case "sbUName": { 
                        GetSorted(SortOptions.byNick, users);
                        break;
                    }
                    case "sbPhone": { 
                        GetSorted(SortOptions.byPhone, users);
                        break;
                    }
                    case "sbMail": { 
                        GetSorted(SortOptions.byEmail, users);
                        break;
                    }
                    default: {
                        console.log("Unknown sort option");
                        break;
                    }
            }
        }
        }       
    });
}


function domReady():void {
  if (document.readyState === "complete" || document.readyState === "interactive") {
      RunServerApp()

  } else {
    document.addEventListener("DOMContentLoaded", (event: Event) => {
      RunServerApp()
    });
    }
    console.log("dom is ready")
}

domReady()

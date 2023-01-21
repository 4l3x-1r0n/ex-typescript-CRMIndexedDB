import { DataBase, IClient } from "./class/DataBase.js";
import { printAlert } from "./functions.js";

const form = document.querySelector("#formulario") as HTMLFormElement;


form.addEventListener("submit", updateClient);


const crmDataBase = new DataBase("crm", 1, getClient);

const urlParams = new URLSearchParams(window.location.search);//obtemnemos los parametros que vienen en la url

const id = +(urlParams.get("id") ?? "");//seleccionamos el id y lo convertimos a numero



function getClient() {
    crmDataBase.getClient(id)
        .then((client) => {
            showClientInForm(client);
        });
}

function showClientInForm(client: IClient) {
    const { name, email, phone, company } = client;
    (document.querySelector("#nombre") as HTMLInputElement).value = name;
    (document.querySelector("#email") as HTMLInputElement).value = email;
    (document.querySelector("#telefono") as HTMLInputElement).value = phone;
    (document.querySelector("#empresa") as HTMLInputElement).value = company;
}

function updateClient(e: Event) {
    e.preventDefault();
    const name = (document.querySelector("#nombre") as HTMLInputElement).value.trim();
    const email = (document.querySelector("#email") as HTMLInputElement).value.trim();
    const phone = (document.querySelector("#telefono") as HTMLInputElement).value.trim();
    const company = (document.querySelector("#empresa") as HTMLInputElement).value.trim();

    if (!name || !email || !phone || !company) {
        printAlert("Todods los Campos son Obligatorios!", "error", form);
        return;
    }

    const client: IClient = {
        id: id,
        name,
        email,
        phone,
        company
    };

    crmDataBase.updateClient(client)
        .then((msg) => {
            printAlert(msg, "success", form);
            setTimeout(() => {
                window.location.href = "index.html";
            }, 3000);
        })
        .catch((msg) => {
            printAlert(msg, "error", form);
        });
}

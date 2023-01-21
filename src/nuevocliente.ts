import { DataBase, IClient } from "./class/DataBase.js";
import { printAlert } from "./functions.js";

const form = document.querySelector("#formulario") as HTMLFormElement;


form.addEventListener("submit", addClient);


const crmDataBase = new DataBase("crm", 1);


function addClient(e: Event) {
    e.preventDefault();

    const name = (document.querySelector("#nombre") as HTMLInputElement).value.trim();
    const email = (document.querySelector("#email") as HTMLInputElement).value.trim();
    const phone = (document.querySelector("#telefono") as HTMLInputElement).value.trim();
    const company = (document.querySelector("#empresa") as HTMLInputElement).value.trim();

    if (!name || !email || !phone || !company) {
        printAlert("Todods los Campos son Obligatorios!", "error", form);
        return;
    }

    //crear objeto con los datos que tenemos
    const client: IClient = {
        id: Date.now(),
        name,
        email,
        phone,
        company
    };

    crmDataBase.addClient(client)
        .then((msg: string) => {
            printAlert(msg, "success", form);
            form.reset();
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        })
        .catch((msg) => printAlert(msg, "error", form));
}

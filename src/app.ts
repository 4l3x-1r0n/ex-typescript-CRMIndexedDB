//TODO revisar sweet alert para los mensajes de confirmacion cuando se elimina un usuario

import { DataBase, IClient } from "./class/DataBase.js";

const crmDataBase = new DataBase("crm", 1, loadClients);

const clientList_tbody = document.querySelector("#listado-clientes") as HTMLTableElement;

//event listeners
clientList_tbody.addEventListener("click", removeCliente);//delegation para eliminar

function loadClients(): void {
    crmDataBase.loadClients().then((clients) => {
        showClientes(clients);
    });
}

function showClientes(clients: IClient[]): void {
    clients.forEach((client) => {
        clientList_tbody.innerHTML += `
        <tr>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <p class="text-sm leading-5 font-medium text-gray-700 text-lg font-bold"> ${client.name} </p>
                <p class="text-sm leading-10 text-gray-700"> ${client.email} </p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                <p class="text-gray-700"> ${client.phone} </p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-700">
                <p class="text-gray-600"> ${client.company} </p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                <a href="editar-cliente.html?id=${client.id}" class="text-teal-600 hover:text-teal-900 mr-5"> Editar </a>
                <a href = "#" data-cliente="${client.id}" class="text-red-600 hover:text-red-900 deleteBtn"> Eliminar </a>
            </td>
        </tr>
        `;
    });



}

function removeCliente(e: Event) {
    const element = e.target as HTMLElement;
    if (element.classList.contains("deleteBtn")) {
        if (!confirm("Esta seguro que desea eliminar el cliente?")) {
            return;
        }
        crmDataBase.removeClient(+(element.dataset.cliente ?? ""))
            .then((msg) => {
                console.log(msg);
                element.parentElement?.parentElement?.remove();
            })
            .catch((msg) => {
                console.log(msg);
            });
    }
}



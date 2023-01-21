export interface IClient {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: string;
}


export class DataBase {

    private DB = {} as IDBDatabase;

    constructor(
        private dbName: string,
        private version: number,
        private callback?: () => void
    ) {
        this.initDb();
    }


    private initDb(): void {
        //abrimos la conexion
        const createDb = window.indexedDB.open(this.dbName, this.version);

        //creamos las tablas necesarias( en este caso una )
        createDb.onupgradeneeded = (e) => {

            const db = (e.target as IDBRequest).result as IDBDatabase;//selecconamos la base de datos para crear las tablas

            //creamos una tabla
            const objectStore = db.createObjectStore(this.dbName, {
                keyPath: "id",
                autoIncrement: true
            });

            // creamos las columnas
            objectStore.createIndex("name", "name", { unique: false });
            objectStore.createIndex("email", "email", { unique: true });
            objectStore.createIndex("phone", "phone", { unique: false });
            objectStore.createIndex("company", "company", { unique: false });
            objectStore.createIndex("id", "id", { unique: true });

            console.log("DB Creada y Lista");
        };

        createDb.onsuccess = () => {
            console.log("Se pudo acceder a la base de datos correctamente");
            this.DB = createDb.result;
            if (this.callback) {
                this.callback();
            }
        };

        createDb.onerror = () => {
            console.log("Ocurrió un Error!");
        };
    }

    loadClients(): Promise<IClient[]> {
        return new Promise((resolve, reject) => {
            const clients: IClient[] = [];

            const transaction = this.DB.transaction([this.dbName], "readonly");
            const objectStore = transaction.objectStore(this.dbName);

            objectStore.openCursor().onsuccess = (e) => {
                const cursor = (e.target as IDBRequest).result as IDBCursorWithValue;
                if (cursor) {
                    clients.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(clients);
                }
            };
        });
    }

    addClient(clinet: IClient): Promise<string> {
        return new Promise((resolve, reject) => {
            const transaction = this.DB.transaction([this.dbName], "readwrite");
            const objectStore = transaction.objectStore(this.dbName);
            objectStore.add(clinet);

            transaction.oncomplete = () => {
                resolve("Cliente agregado correctamente");
            };
            transaction.onerror = (e) => {
                console.error((e.target as IDBRequest).error);
                reject("Ocurrió un Error, el email existe en la base de Datos!");
            };
        });
    }

    getClient(id: number): Promise<IClient> {
        return new Promise((resolve, reject) => {
            const transaction = this.DB.transaction([this.dbName], "readonly");
            const objectStore = transaction.objectStore(this.dbName);

            const client = objectStore.get(id);

            transaction.oncomplete = () => {
                resolve(client.result);
            };
            transaction.onerror = (e) => {
                console.error((e.target as IDBRequest).error);
                reject("Ocurrió un Error!");
            };
        });
    }

    updateClient(client: IClient): Promise<string> {
        return new Promise((resolve, reject) => {
            const transaction = this.DB.transaction([this.dbName], "readwrite");
            const objectStore = transaction.objectStore(this.dbName);

            objectStore.put(client);

            transaction.oncomplete = () => {
                resolve("Cliente actulizado correctamente");
            };
            transaction.onerror = (e) => {
                console.error((e.target as IDBRequest).error);
                reject("Ocurrió un Error el email existe en la base de Datos!");
            };
        });
    }

    removeClient(id: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const transaction = this.DB.transaction([this.dbName], "readwrite");
            const objectStore = transaction.objectStore(this.dbName);

            objectStore.delete(id);

            transaction.oncomplete = () => {
                resolve("Cliente eliminado correctamente");
            };
            transaction.onerror = (e) => {
                console.error((e.target as IDBRequest).error);
                reject("Ocurrió un Error!");
            };
        });
    }

}

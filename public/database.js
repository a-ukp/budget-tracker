let db;
const request = window.indexedDB.open('budgetDB', 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objStore = db.createObjectStore("BudgetStore", { keyPath: "id", autoIncrement: true });

    objStore.createIndex('name', 'name');
    objStore.createIndex('date', 'date');
    objStore.createIndex('value', 'value');
};

request.onsuccess = (event) => {
    db = event.target.result;

    if (navigator.onLine) {
        checkDB();
    }
};

(checkDB) => {
    var 
}

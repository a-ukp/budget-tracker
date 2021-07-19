let db;
const request = window.indexedDB.open('budgetDB', 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objStore = db.createObjectStore("BudgetStore", { keyPath: "id", autoIncrement: true });
    
}
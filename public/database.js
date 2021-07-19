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

function checkDB() {
    var transaction = db.transaction(['BudgetStore'], 'readwrite');
    const BudgetStoreObj = transaction.objectStore('BudgetStore');
    var getAll = BudgetStoreObj.getAll();

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
          fetch('/api/transaction/bulk', {
            method: 'POST',
            body: JSON.stringify(getAll.result),
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then(() => {
              var transaction = db.transaction(['BudgetStore'], 'readwrite');
              const BudgetStoreObj = transaction.objectStore('BudgetStore');
              BudgetStoreObj.clear();
            });
        }
      };
}

window.addEventListener('online', checkDB);

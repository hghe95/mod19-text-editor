import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
//Accepts content and adds to the database
export const putDb = async (content) => {
  const jateDB = await openDB(`jate`, 1);
  const tx = jateDB.transation(`jate`, `readwrite`);
  const store = tx.objectStore(`jate`);
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log(result, `Data has been saved to database`);
}

//Gets all content from the database
export const getDb = async () => {
  const jateDB = await openDB(`jate`, 1);
  const tx = jateDB.transation(`jate`, `readonly`);
  const store = tx.objectStore(`jate`);
  const request = store.get(1);
  const result = await request;
  console.log(result, `result.value`);
}

initdb();

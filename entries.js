// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')

// const adapter = new FileSync('profile-database.json')
// const db = low(adapter)
// db.defaults({ entries: [] }).write()

// function putEntry(entry) {
// // TODO: store it locally
//     db.get('entries').push(entry).write()
// }

// function getEntries() {
//     return db.get('entries').value()
// }

// module.exports = {
//     putEntry,
//     getEntries,
// }



const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const xlsx = require('xlsx');
const path = require('path');

// Setup lowdb
const adapter = new FileSync('profile-database.json');
const db = low(adapter);
db.defaults({ entries: [] }).write();

// Function to write data to Excel
function writeToExcel(entries) {
    // Create a new workbook and worksheet
    const ws = xlsx.utils.json_to_sheet(entries);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Entries');

    // Write the workbook to an Excel file
    const filePath = path.join(__dirname, 'logs.xlsx');
    xlsx.writeFile(wb, filePath);
}

// Function to add an entry
function putEntry(entry) {
    // Push the entry to the database
    db.get('entries').push(entry).write();

    // Get all entries from the database
    const entries = db.get('entries').value();

    // Write the entries to the Excel file
    writeToExcel(entries);
}

// Function to get all entries
function getEntries() {
    return db.get('entries').value();
}

module.exports = {
    putEntry,
    getEntries,
};

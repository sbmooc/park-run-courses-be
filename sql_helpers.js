const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('test.db', err => {

	if (err) {
		console.error(err.message)
	}
	console.log('Connected to the in-memory SQlite database')
})

const create_courses_sql = 'CREATE TABLE courses (id INTEGER PRIMARY KEY, event_name TEXT NOT NULL, location_longitude INTEGER NOT NULL, location_latitude INTEGER NOT NULL)'

const run_sql = (sql, db) => {
db.all(sql, [], (err, rows) => {
	if (err) {
		throw err
	} else{
		console.log('db table created OK')
	}
})

}


module.exports

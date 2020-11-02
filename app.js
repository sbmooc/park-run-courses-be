const express = require('express')
const db = require('./models')
const assert = require('assert')
const { save_course, download_strava_segment } = require('./download_strava_segment');
const { convertCourses, convertEvents} = require('./geoJsonhelpers')
const app = express()
app.use(express.json())
const port = 3000

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	res.header("Cache-Control", "no-store")
	next();
});


app.get('/events', (req, res) => {
	db.Event.findAll().then(events => {
		res.json(convertEvents(events))
	}
	)
})

app.get('/events/:eventId', (req, res) => {
	db.Event.findAll({
		where: {
			id: req.params['eventId']
		}
	}
	).then(events => {
		assert(events.length == 1)
		res.json(convertEvents(events))
	}
	)
})

app.get('/courses', (req, res) => {
	db.Course.findAll({
		where: {
			...req.query
		}
	}
	).then(courses => {
		res.json(convertCourses(courses))
	})
})

app.get('/courses/:courseId', (req, res) => {
	db.Course.findAll({
		where: {
			id: req.params['courseId']
		}
	}
	).then(courses => {
		assert(courses.length == 1)
		res.json(convertCourses(courses))
	}
	)
})

app.post('/segments/:segmentId', (req, res) => {
	const segmentId = req.params['segmentId']
	download_strava_segment(segmentId).then(
		response => {
			res.send(response.body.latlng)
		}).catch((err) => {
			res.status(400)
			res.send()
		}
		)
})

const course_data_validation = (data) => {
	const required_keys = ['segmentId', 'eventId', 'courseName']
	required_keys.forEach(
		(key) => {
			if (!(key in data)){
				throw 'Incorrect keys missing '	+ key
			}
		}
	)
	return { segmentId: data.segmentId, eventId: data.eventId, name: data.courseName }
}

app.post('/courses/', (req, res) => {
	try {
		var { segmentId, eventId, name } = course_data_validation(req.body)
	}
	catch {
		res.status(400)
		res.send()
	}
	download_strava_segment(segmentId).then(
		strava_response => {
			save_course(eventId, name, strava_response.body.latlng)
			res.status(201)
			res.send()
		}
	)
})


app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
})

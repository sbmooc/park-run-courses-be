const express = require('express')
const db = require('./models')
const assert = require('assert')
const bodyParser = require('body-parser');
const { save_course, download_strava_segment } = require('./download_strava_segment');
const app = express()
app.use(express.json())
const port = 3000


app.get('/events', (req, res) => {
	db.Event.findAll().then(events => {
		res.json(events)
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
		res.json(events[0])
	}
	)
})

app.get('/courses', (req, res) => {
	db.Course.findAll().then(events => {
		res.json(events)
	}
	)
})

app.get('/courses/:courseId', (req, res) => {
	db.Course.findAll({
		where: {
			id: req.params['eventId']
		}
	}
	).then(courses => {
		assert(courses.length == 1)
		res.json(courses[0])
	}
	)
})

const validate_courses_post = (data) => {
	return { segmentId: data.segmentId, eventId: data.eventId, name: data.name}
}

app.post('/courses/', (req, res) => {
	try {
		var {segmentId, eventId, name} = validate_courses_post(req.body)
	}
	catch {
		return res.status(400)
	}
	finally {
	download_strava_segment(segmentId).then(
		strava_response => {
			save_course(eventId, name, strava_response.latlng)
		}
	)
	return res.send('all ok')
	}
})


app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
})

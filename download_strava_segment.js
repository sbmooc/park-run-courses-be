const tiny = require('tiny-json-http')
const db = require('./models')

const download_strava_segment = (segment_id) => {
    var url = `https://www.strava.com/stream/segments/${segment_id}`
    return tiny.get({url})
}

const save_course = (event_id, name, latlng) => {
    var latlng = latlng.join('|')
    db.Course.create(   
        {
            name: name,
            latlng: latlng,
            EventId: event_id 
        }
    )
}

module.exports = {download_strava_segment, save_course}
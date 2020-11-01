const tiny = require('tiny-json-http')
const db = require('./models')
const { convertLatLngToLngLat } = require('./geoJsonhelpers')

const download_strava_segment = (segment_id) => {
    var url = `https://www.strava.com/stream/segments/${segment_id}`
    return tiny.get({ url })
}

const save_course = (event_id, name, latlng) => {
    const lnglat = convertLatLngToLngLat(latlng)
    db.Course.create(
        {
            name: name,
            lnglat: lnglat.join('|'),
            EventId: event_id
        }
    )
}

module.exports = { download_strava_segment, save_course, convertLatLngToLngLat }
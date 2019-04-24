ics_sources = [
    {url:'https://sogo.alolise.org/SOGo/dav/public/jerome.avond/Calendar/2BBA-5AB19A00-1-1147EF20.ics',event_properties:{color:'gold'}},
    {url:'http://sogo.alolise.org/SOGo/dav/public/contact.la-bricoleuse/Calendar/5A19-5CC08400-1-65AE8400.ics',event_properties:{color:'crimson'}}
]


function data_req (url, callback) {
    req = new XMLHttpRequest()
    req.addEventListener('load', callback)
    req.open('GET', url)
    req.send()
}

function add_recur_events() {
    if (sources_to_load_cnt < 1) {
        $('#calendar').fullCalendar('addEventSource', expand_recur_events)
    } else {
        setTimeout(add_recur_events, 30)
    }
}

function load_ics(ics){
    data_req(ics.url, function(){
        $('#calendar').fullCalendar('addEventSource', fc_events(this.response, ics.event_properties))
        sources_to_load_cnt -= 1
    })
}


$(document).ready(function() {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
	locale: 'fr',
	lang: 'fr',

        defaultView: 'month',
	    /*
        defaultDate: '2016-03-01'
	*/
    })
    sources_to_load_cnt = ics_sources.length
    for (ics of ics_sources) {
        load_ics(ics)
    }
    add_recur_events()
})

/*
 *
*/

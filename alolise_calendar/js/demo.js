ics_sources = [
    {url:'https://sogo.alolise.org/SOGo/dav/public/contact/Calendar/7ED8-5CC21C00-5-16859160.ics', event_properties:{color: '#33CC00'}},
//    {url:'https://sogo.alolise.org/SOGo/dav/public/jerome.avond/Calendar/2BBA-5AB19A00-1-1147EF20.ics',event_properties:{color:'gold'}},
//    {url:'http://sogo.alolise.org/SOGo/dav/public/contact.la-bricoleuse/Calendar/5A19-5CC08400-1-65AE8400.ics',event_properties:{color:'crimson'}}
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
	  eventClick: function(event) {
		      if (event.url) {
			        window.open(event.url, '_blank');
			      	return false;
			          }
		    },
        eventMouseover: function (data, event, view) {

		if (data.addr) {
			lieu = data.addr;
		} else {
			lieu = "Non indiqué";
		};
		if (data.desc) {
		} else {
			data.desc = "---";
		};
		if (data.start.format("d") != data.end.format("d")) {
			data.end.subtract(1, "seconds");
			formatdate = "dddd DD/MM";
		} else {
			formatdate = "HH:mm";
		};

//'<div>' + Object.keys(data)+ '<br/><br/> ' + data.allDay + '<br/><br/> ' + '</div>'
            tooltip = '<div class="tooltiptopicevent" style="width:100;border-radius:10px 25px;height:auto;background:'+data.color+';position:absolute;z-index:10001;padding:10px 10px 10px 10px ;  line-height: 100%;">' + data.start.format(formatdate) + " ~ " + data.end.format(formatdate) + "<br/><br/><b>" + data.title + '</b></br></br>' + data.desc + '</br></br>lieu : ' + lieu + '</div>';


            $("body").append(tooltip);
            $(this).mouseover(function (e) {
                $(this).css('z-index', 10000);
                $('.tooltiptopicevent').fadeIn('500');
                $('.tooltiptopicevent').fadeTo('10', 1.9);
            }).mousemove(function (e) {
                	$('.tooltiptopicevent').css('z-index', 10000);
                	$('.tooltiptopicevent').css('left', 0);
                	$('.tooltiptopicevent').css('top', 0);
		    /*
		    marge = 20;
		    if (e.pageX < 220) { 
                	$('.tooltiptopicevent').css('left', e.pageX + marge);
			} else {
                	$('.tooltiptopicevent').css('left', e.pageX - 200 - marge);
			}
		    if (e.pageY < 250) { 
                	$('.tooltiptopicevent').css('top', e.pageY + 10);
			} else {
                	$('.tooltiptopicevent').css('bottom', 500 - e.pageY - 10);
			}
			*/
            });


        },
        eventMouseout: function (data, event, view) {
            $(this).css('z-index', 8);

            $('.tooltiptopicevent').remove();

        },

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

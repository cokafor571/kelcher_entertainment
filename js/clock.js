(function($) {

    $(function() {

        // set end date
        var deadline = '2017-07-31';

        // time remaining as a math function
        function getTimeRemaining(endtime) {
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor( (t/1000) % 60 );
            var minutes = Math.floor( (t/1000/60) % 60 );
            var hours = Math.floor( (t/(1000*60*60)) % 24 );
            var days = Math.floor( t/(1000*60*60*24) );
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function initializeClock(endtime) {

            function updateClock() {

                var daysSpan = $('.days'),
                    hoursSpan = $('.hours'),
                    minutesSpan = $('.minutes'),
                    secondsSpan = $('.seconds');

                var t = getTimeRemaining(endtime);

                daysSpan.html( t.days );

                if (t.hours.toString().length == 1) {
                    hoursSpan.html( '0' + t.hours );
                } else {
                    hoursSpan.html( t.hours );
                }

                if (t.minutes.toString().length == 1) {
                    minutesSpan.html( '0' + t.minutes );
                } else {
                    minutesSpan.html( t.minutes );
                }

                if (t.seconds.toString().length == 1) {
                    secondsSpan.html( '0' + t.seconds );
                } else {
                    secondsSpan.html( t.seconds );
                }
                
                if ( t.total <= 0 ) {
                    clearInterval(timeinterval);
                }
            }

            updateClock(); // run function once at first to avoid delay

            var timeinterval = setInterval( updateClock, 1000 );

        }

        initializeClock(deadline); 

    });
})(jQuery);
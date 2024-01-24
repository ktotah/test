// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
$(function () {
    // Display the current date in the header of the page
    $('#currentDay').text(dayjs().format('dddd, MMMM D'));
    // Also display the current time in a 12-hour format with AM/PM
    var currentTime = dayjs().format('h:mm A'); // 'h' for hour, 'mm' for minutes, 'A' for AM/PM
    $('<p>').text(currentTime).appendTo('#currentDay');

    // Function to update the time block classes
    function updateTimeBlockClasses() {
        var currentHour = dayjs().hour(); // gets the current hour using Day.js
        console.log("Block hour: " + blockHour + ", Current hour: " + currentHour); // internal - so I can check what currentHour is set to in the console log (for future debugging if necessary)
        $('.time-block').each(function() {
            var blockHour = parseInt($(this).attr('id').replace('hour-', ''));
            if (blockHour < currentHour) {
                $(this).removeClass('future present').addClass('past'); 
            } else if (blockHour === currentHour) {
                $(this).removeClass('past future').addClass('present');
            } else {
                $(this).removeClass('past present').addClass('future');
            }
        });
    }

    // Click event for save buttons
    $('.saveBtn').on('click',function() {
        // 'this' refers to the button that was clicked
        var hourId = $(this).parent().attr('id'); // Get the 'hour-x' id of the containing time-block
        var eventText = $(this).siblings('.description').val(); // Get the user input from the sibling textarea element
        localStorage.setItem(hourId, eventText); // Save the user input in local storage
    });

    // Retrieve and display saved user input from local storage
    $('.time-block').each(function() {
        var hourId = $(this).attr('id'); // Get the 'hour-x' id of the time-block
        var savedEvent = localStorage.getItem(hourId); // Get the saved user input from local storage
        if (savedEvent) {
            $(this).find('.description').val(savedEvent); // If there is a saved event, set the value of the textarea to the saved user input
        }
    });

     

    // Function to clear events at midnight
    function clearEventsAtMidnight() {
        var currentHour = dayjs().hour();
        if (currentHour === 0) {
            for (var hour = 9; hour <= 17; hour++) {
                localStorage.removeItem('hour-' + hour);
                $('#hour-' + hour).find('.description').val(''); // clears the textareas
            }
        }
    }

    // Call the update function and clear events at midnight function when the page initially loads 
    updateTimeBlockClasses();
    clearEventsAtMidnight();

    // Set up an interval to run the functions every 60 seconds to keep the classes/colors/textareas updated
    setInterval(function() {
        updateTimeBlockClasses();
        clearEventsAtMidnight();
    }, 60000);
  });
  
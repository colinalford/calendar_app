//Model

var model = {

	//initializes date object for storing dates and 
	dates : {},

	//adds the current date as of page load to the dates object
	init: function () {
		model.addDate(controller.today());
	},

	// adds a date to the dates object
	addDate: function (dateObj) {
		var formatted = controller.formatDate(dateObj);
		if(this.dates[formatted] === undefined) {
			this.dates[formatted] = {};
			this.dates[formatted].tasks = [];
			this.dates[formatted].events = [];
			this.dates[formatted].notes = [];
		}
	},

	// adds a task to the dates object by date
	addTask : function(dateObj, task) {
		var formatted = controller.formatDate(dateObj);
		model.addDate(dateObj);
		var arr = [task, controller.timestamp()];
		this.dates[formatted].tasks.push(arr);
	},

	// adds an event to the dates object by date
	addEvent : function(dateObj, event) {
		var formatted = controller.formatDate(dateObj);
		model.addDate(dateObj);
		this.dates[formatted].events.push([event, controller.timestamp()]);
	},

	// adds a note to the dates object by date
	addNote : function(dateObj, note) {
		var formatted = controller.formatDate(dateObj);
		model.addDate(dateObj);
		this.dates[formatted].tasks.push([note, controller.timestamp()]);
	}
};


// View
var view = {

	// On page load, loads the grid and populates it with calendar information and any events associated with dates already in the dates object
	init : function () {
		view.renderGrid();
		view.displayMonth(controller.current);
		view.displayDay();
		view.changeMonth();
	},

	// Renders the month name, year, and previous and next month buttons above the calendar grid
	displayMonthHeading : function (dateObj) {
		$('#month-name').text(controller.month(dateObj)+' '+dateObj.getFullYear());
	},

	// Adds the name of each day across the top of the calendar
	weekHeadings : function() {
		var i = -7;
		var incr = 0;
		while (i < 0) {
			$('.col'+i).text(controller.dayOfWeek(incr));
			incr = incr + 1;
			i = i + 1;
		}
	},

	changeMonth : function () {
		

		$('#prev').click(function(){
			var month = controller.current.getMonth();
			controller.current.setMonth(controller.current.getMonth() - 1);
			view.displayMonth(controller.current);
			
		});

		$('#next').click(function(){
			var month = controller.current.getMonth();
			controller.current.setMonth(controller.current.getMonth() + 1);
			view.displayMonth(controller.current);
		});
	},

	// Displays date information unique to the given month within the calendar grid
	displayMonth : function (dateObj) {

		view.clearGrid();

		var start = controller.firstDay(dateObj);
		var numDays = controller.numberOfDays(dateObj);

		view.weekHeadings();
		view.displayMonthHeading(dateObj);

		var i = 0;
		while (i < numDays) {
			$('.col'+(start+i)).text((i+1));
			i = i + 1;
		}

	},

	// Creates a grid for the calendar
	renderGrid : function () {
		var rows = 7;
		var cols = 7;

		var i = 1;
		var j = 1;
		var k = -7;
		
		while (i <= rows) {
			$('.month').append('<div class="row" id="row'+i+'"></div>');
			while (j <= cols) {
				$("#row"+i).append('<div class="col col'+k+'"></div>');
				j = j + 1;
				k = k + 1;
			};
			j = 1;
			i = i + 1;
		};
	},

	clearGrid : function () {
		var cols = 41;
		var i = 0;
		while (i <= cols){
			$('.col'+i).text(' ');
			i = i + 1;
		}
	},

	displayDay : function(){
		var button = '<button type="button" onclick="%data%">%contents%</button>';
		var taskButton = button.replace('%data%', 'view.addTask()').replace('%contents%', 'Add Task');
		var eventButton = button.replace('%data%', 'view.addEvent()').replace('%contents%', 'Add Event');
		var noteButton = button.replace('%data%', 'view.addNote()').replace('%contents%', 'Add Note');

		$('.day').prepend(taskButton);
		$('.day').prepend(eventButton);
		$('.day').prepend(noteButton);
	},

	addTask : function () {
		$('#form-area').append('<form id="task"><input name="task" id="task-input"><input type="button" id="task-submit"/></form>');
		$('#task-submit').click(function(){
			model.addTask(controller.current, $('#task-input').val());
			alert(model.dates.toSource());
		});
	},

	addEvent : function(){
		$('#form-area').append('<form id="event"><input type="text" name="event" id="event-input"></form>');
	},
	addNote : function(){
		$('#form-area').append('<form id="note"><input type="text" name="task" id="note-input"></form>');
	}
};

var controller = {

	// Initializes the model and views on page load
	init : function() {
		model.init();
		controller.current = controller.today();
		view.init();
	},

	// Formats the date as a string from a date object for easy store in the dates object as a key. Formats as "YEAR-MONTH-DAY", e.g., "2014-3-13";
	formatDate : function (dateObj) {
		var day = dateObj.getDate().toString();
		var month = (dateObj.getMonth()+1).toString();
		var year = dateObj.getFullYear().toString();
		return year + "-" + month + "-" + day;
	},

	// Creates a date object for the current date
	today : function () {
		var today = new Date();
		return today;
	},

	// Creates a date object for any given day
	createDay : function(year, month, day) {
		var day = new Day (year, month, day);
		model.addDate(day);
		return day;
	},

	// Creaes a timestamp for the time when it is invoked
	timestamp : function(){
		return Date.now();
	},

	// Returns the name of a month from a date object
	month : function(dateObj) {
		var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
		return monthNames[dateObj.getMonth()];
	},

	// Returns the name of the day of the week from a date object or integer from 0-6
	dayOfWeek : function (dateObj) {
		var day = 0;
		if (typeof dateObj === "object") {
			day = dateObj.getDay();
		} else {
			day = dateObj;
		}
		var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		return days[day];
	},

	// Returns the number of days in a month from a date object
	numberOfDays : function(dateObj) {
		var thirtyOne = [0,2,4,6,7,9,11];
		var thirty = [3,5,8,10];

		if (thirtyOne.indexOf(dateObj.getMonth()) !== -1) {
			return 31;
		} else if (thirty.indexOf(dateObj.getMonth()) !== -1) {
			return 30;
		} else if (controller.isLeapYear(dateObj)) {
			return 29;
		} else {
			return 28;
		}
	},

	// Returns true if the year from a date object is a leap year
	isLeapYear : function(dateObj) {
		var year = dateObj.getFullYear();
		if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
			return true;
		} else {
			return false;
		}
	},

	// return the first day of the month from a date object that is passed in
	firstDay : function (dateObj) {
		var month = dateObj.getMonth();
		var year = dateObj.getFullYear();
		var firstDay = new Date(year, month, 1);
		return firstDay.getDay();
	},

	// returns an array of tasks from the date passed in
	getTasks : function (dateObj) {
		var formatted = controller.formatDate(dateObj);
		var tasks = model.dates[formatted].tasks;
		return tasks;
	},

	// returns an array of events from the date passed in
	getEvents : function(date) {
		var events = model.dates[date].events;
		return events;
	},

	// returns an array of notes from the date passed in
	getNotes : function(date) {
		var notes = model.dates[date].events;
		return notes;
	},

	addNote : function(dateObj, note) {
		model.addNote(dateObj, note);
	},

	addTask : function(dateObj, task) {
		model.addTask(dateObj, task);
	},

	addEvent : function(dateObj, event) {
		model.addEvent(dateObj, event);
	},
};

controller.current = new Date();


controller.init();

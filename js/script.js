//Model

var model = {

	dates : {},

	init: function () {
		model.addDate(controller.today());
	},

	addDate: function (dateObj) {
		var formatted = controller.formatDate(dateObj);
		if(this.dates[formatted] === undefined) {
			this.dates[formatted] = {};
		}
		this.dates[formatted].tasks = [];
		this.dates[formatted].events = [];
		this.dates[formatted].notes = [];
	},

	addTask : function(dateObj, task) {
		var formatted = controller.formatDate(dateObj);
		model.addDate(formatted);
		this.dates[formatted].tasks.push([task, controller.timestamp()]);
	},

	addEvent : function(dateObj, event) {
		var formatted = controller.formatDate(dateObj);
		model.addDate(formatted);
		this.dates[formatted].events.push([event, controller.timestamp()]);
	},

	addNote : function(dateObj, note) {
		var formatted = controller.formatDate(dateObj);
		model.addDate(formatted);
		this.dates[formatted].tasks.push([note, controller.timestamp()]);
	}
};

var view = {

	init : function () {
		var date = new Date(2016, 6, 1);
		view.renderGrid();
		//view.displayMonth(controller.today());
		view.displayMonth(date);
		alert(controller.numberOfDays(date));
	},

	firstDay : function (dateObj) {
		var month = dateObj.getMonth();
		var year = dateObj.getFullYear();
		var firstDay = new Date(year, month, 1);
		return firstDay.getDay();
	},

	monthHeadings : function() {
		var i = -7;
		var incr = 0;
		while (i < 0) {
			$('.col'+i).text(controller.dayOfWeek(incr));
			incr = incr + 1;
			i = i + 1;
		}
	},

	displayMonth : function (dateObj) {
		var start = view.firstDay(dateObj);
		var numDays = controller.numberOfDays(dateObj);
		view.monthHeadings();
		
		var i = 0;

		while (i < numDays) {
			$('.col'+(start+i)).text((i+1)+'th');
			i = i + 1;
		}

	},

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

	displayDay : function () {},
	displayTasks : function () {},
	displayEvents : function () {},
	displayNotes : function () {},
};

var controller = {

	init : function() {
		model.init();
		view.init();
	},

	formatDate : function (dateObj) {
		var day = dateObj.getDate().toString();
		var month = (dateObj.getMonth()+1).toString();
		var year = dateObj.getFullYear().toString();
		return year + "-" + month + "-" + day;
	},

	today : function () {
		var today = new Date();
		return today;
	},

	createDay : function(year, month, day) {
		var day = new Day (year, month, day);
		model.addDate(day);
		return day;
	},

	timestamp : function(){
		return Date.now();
	},

	month : function(dateObj) {
		var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
		return monthNames[dateObj.getMonth()];
	},

	dayOfWeek : function (dateObj) {
		var day = 0;
		if (typeof dateObj === "object") {
			day = dateObj.getDay();
		} else {
			day = dateObj;
		}
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		return days[day];
	},

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

	isLeapYear : function(dateObj) {
		var year = dateObj.getFullYear();
		if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
			return true;
		} else {
			return false;
		}
	},

	getTasks : function (date) {
		return model.dates[date].tasks;
	},

	getEvents : function(date) {
		return model.dates[date].events;
	},

	getNotes : function(date) {
		return model.dates[date].events;
	}
};


controller.init();

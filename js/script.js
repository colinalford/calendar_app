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
		if (this.dates[formatted].tasks === undefined) {
			this.dates[formatted].tasks = [];
		}
		this.dates[formatted].tasks.push([controller.timestamp(), task]);
	},

	addEvent : function(dateObj, event) {
		var formatted = controller.formatDate(dateObj);
		model.addDate(formatted);
		if (this.dates[formatted].events === undefined) {
			this.dates[formatted].events = [];
		}
		this.dates[formatted].events.push([controller.timestamp(), event]);
	},

	addNote : function(dateObj, note) {
		var formatted = controller.formatDate(dateObj);
		model.addDate(formatted);
		if (this.dates[formatted].notes === undefined) {
			this.dates[formatted].notes = [];
		}
		this.dates[formatted].tasks.push([controller.timestamp(), note]);
	}
};

var view = {

	init : function () {
		
	},

	displayMonth : function () {},

	displayDay : function () {},

	displayTasks : function () {},
	displayEvents : function () {},
	displayNotes : function () {},
};

var controller = {

	init : function() {
		model.init();
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

	timestamp : function(){
		return Date.now();
	},

	month : function(dateObj) {
		var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
		return monthNames[dateObj.getMonth()];
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


model.init();





//Model

var model = {

	currentDate : function () {
		var today = new Date();
		var month = today.getMonth()+1;
		return today.getFullYear().toString() + "-" + month.toString() + "-" + today.getDate().toString();
	},

	dates : {},

	addDate: function (date) {
		this.dates[date] = {};
		this.dates[date].tasks = [];
		this.dates[date].events = [];
		this.dates[date].notes = [];
	},

	addTask : function(date, task) {
		this.dates[date].tasks.push(task);
	},

	addEvent : function(date, event) {
		this.dates[date].events.push(event);
	},

	addNote : function(date, note) {
		this.dates[date].notes.push(note);
	},
};

var view = {
	displayMonth : function () {
		view.displayEvents(date, event);
		view.displayTasks(date, task);
	},
	displayDay : function () {
		view.displayTasks(date, task);
		view.displayEvents(date, event);
		view.displayNotes(date, note);
	},
	displayTasks : function () {},
	displayEvents : function () {},
	displayNotes : function () {},
};

var controller = {
	getDate : function (){},
	getTask : function (){},
	getNote : function (){},
	getEvent : function (){}
}


var i = 10;

while (i > 0) {
	var datum = "2015-12-"+i;
	var t_task = "Lorem ipsum dolor sit amet.";
	var t_event = "Lorem ipsum dolor sit amet, consectetur adipisicing.";
	var t_note = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente aliquid quaerat amet hic, mollitia iste!";
	model.addDate(datum);
	model.addTask(datum, t_task);
	model.addEvent(datum, t_event);
	model.addNote(datum, t_note);
	i = i - 1;
}

var myDate = new Date();
model.addDate(model.currentDate);
model.addTask(model.currentDate, "Get adfasdffasdfa");
model.addTask(model.currentDate, "asdfasdfadsfadsfads");
model.addTask(model.currentDate, "Swgasdf;lkghas");
alert(model.dates[model.currentDate].tasks);
/*


//View
function View () {}

//Controller
function Controller() {}

var model = {
	"date" : {
		"2014-12-31" : {
			"events" : [],
			"tasks" : [],
			"notes" : []
		}
	}
}
*/
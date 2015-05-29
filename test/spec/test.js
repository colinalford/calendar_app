/*global describe, it */
'use strict';

describe('Test Model Methods', function(){

	
		var	newDate = "2015-12-31",
			text = "Get it to the Greek";
	model.addDate(newDate);

	it('Should add new task to model', function(){
		model.addTask(newDate, text);
		expect(model.dates[newDate].tasks[0]).toBe(text);
	});

	it('Should add new event to model', function(){
		model.addEvent(newDate, text);
		expect(model.dates[newDate].events[0]).toBe(text);
	});

	it('Should add new note to model', function(){
		model.addNote(newDate, text);
		expect(model.dates[newDate].notes[0]).toBe(text);
	});
});


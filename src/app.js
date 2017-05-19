// /src/app.js
// Load Foundation Files
import _settings  from './css/_settings.scss';
import foundation  from './css/foundation.css';
import css from './css/styles.css';

// Import jQuery & underscore
import $ from 'jquery';
import _ from 'underscore';
import Task from './models/task';
import TaskList from './collections/task_list';

var taskList;


var render = function(task) {
  // Select the template using jQuery
  var template_text = $('#taskItemTemplate').html();

  //console.log(template_text);
  // Get an underscore template object
  var template = _.template(template_text);

  // Use the underscore template function to compile the
  // template and data into raw html.
  var compiledHTML = template(task.toJSON());

  // append the html to the unordered list.
  $('.todo-items').append(compiledHTML);

  $('li.task-item:last').find('button.alert').click({taskCid: task.cid}, function(params) {
    console.log("Remove");
    taskList.remove(params.data.taskCid);
  });
};

// ...
// ready to go

var renderList = function(taskList) {
  // Clear the unordered list
  $('.todo-items').empty();

  // Iterate through the list rendering each Task
  taskList.each(function(task) {
    render(task);
    });
};

$(document).ready(function() {
  var taskData = [{
    title: "Create a model",
    completed: true
  },
  {
    title: "Create a collection",
    completed: false
  }];

  taskList = new TaskList(taskData);

  taskList.each(function(task) {
    render(task);
  });
  taskList.on("update", function() {
    renderList(taskList);
  });
});
var readNewTaskForm = function() {
  // Get the values from the fields
  var title = $('#title').val();
  $('#title').val('');
  var description = $('#description').val();
  $('#description').val('');
  var completed = $('#completed-checkbox').is(":checked");
  $('#completed-checkbox').prop('checked', false);

  return {
    title: title,
    description: description,
    completed: completed
  };
};

$('#add-task').click( function() {

    // Create a new Task
    var task = new Task( readNewTaskForm() );

    // Add the Task to the list
    taskList.add(task);

    // re-render the list
    renderList(taskList);
  });

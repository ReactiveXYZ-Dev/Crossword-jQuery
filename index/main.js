
$(document).ready(function (){
	// initialize word source
	var words = [
		new Word("hi","vertical",{x:1, y: 1}, "The most common greeting!")
		// add your words below...
	];

	// initialize board
	var board = new Board(words, $('table#crossword'), {
		horizontal: $('#horizontal-content'),
		vertical: $('#vertical-content')
	});

	board.begin();
	board.writeDescriptions();
	board.enableArrowControls();

	// Example:
	// validate board with a button click
	$('button#validate-btn').click(function (){
		// board.validate returns a boolean with the result of validation
		// board.validate accepts a callback function that returns the first word that is incorrect
		if (!board.validate(function (word) {
			alert("Word number: " + word.index + " is wrong!")
		})) {
			$(this).html("Revalidate!");
		} else {
			$(this).html("Succcess!").removeClass('btn-primary').addClass('btn-success')
		}
	});
});
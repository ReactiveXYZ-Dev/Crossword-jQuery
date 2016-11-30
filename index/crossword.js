(function ($) {
	
	window.Word = function (text, direction, origin, description){
		this.text = text;
		this.direction = direction;
		this.len = text.length;
		this.origin = origin;
		this.description = description;
	}

	/*
		Public
	 */
	Word.prototype.setBoardDOM = function(table) {
		this.$table = $(table);
	};

	Word.prototype.setDescriptionAreas = function(horizontal, vertical) {
		this.$horizontalDescArea = $(horizontal);
		this.$verticalDescArea = $(vertical);
	};

	Word.prototype.plotOrigin = function(index) {
		this.index = index;
		this.domForOrigin().find('input').attr('placeholder',index);
	};

	Word.prototype.writeDescription = function(callback) {

		if (this.description === undefined) {
			return;
		}

		if (callback) {
			callback(this.description, this.index);
		} else {
			if (this.direction == 'horizontal') {
				this.$horizontalDescArea.append("<p>" + this.index + ": " + this.description + "</p>")
			}
			if (this.direction == 'vertical') {
				this.$verticalDescArea.append("<p>" + this.index + ": "  + this.description + "</p>")
			}
		}
	};

	Word.prototype.markAsEditable = function() {
		var character = this.domForOrigin();
		for (var i = 0; i < this.len; i++) {
			character.find('input').addClass('editable');
			character = this.domForNextCharacter(character);
		}
	};

	Word.prototype.drawTooltip = function() {
		var character = this.domForOrigin();
		character.append('<span class="tooltiptext">' + this.description + '</span></div>');
	};

	Word.prototype.validate = function (){

		var character = this.domForOrigin();
		for (var i = 0; i < this.len; i++) {
			if (character.find('input').val() != this.text[i]) {
				return false;
			}
			character = this.domForNextCharacter(character);
		}
		return true;
	}


	/*
		Private
	 */
	Word.prototype.domForOrigin = function() {

		// locate row
		var tr = this.$table.find('tr').filter(function (i) {
			return i == this.origin.y
		}.bind(this));

		// locate column
		var td = tr.find('td').filter(function (i){
			return i == this.origin.x
		}.bind(this));

		return td;

	};

	Word.prototype.domForNextCharacter = function (current){

		if (this.direction == 'horizontal') {
			return current.next();
		}

		if (this.direction == 'vertical') {
			var tr = current.parent('tr');
			tr = tr.next();
			return tr.find('td').filter(function(i) {
				return i == current.index();
			});
		}

		return current;
	}

	window.Board = function (words, table,descriptionAreas){

		this.$table = table;

		this.words = words;

		this.words.forEach(function (word) {

			word.setBoardDOM(this.$table);

			word.setDescriptionAreas(descriptionAreas.horizontal, descriptionAreas.vertical)

		}.bind(this));

	}

	Board.prototype.begin = function() {
		
		// Init all words
		this.words.forEach(function (word, index) {
			word.plotOrigin(index + 1);
			word.markAsEditable();
			word.drawTooltip();
		});

		// Disable unused fields
		this.$table.find('input').not(".editable").prop('disabled', true);
	};

	Board.prototype.writeDescriptions = function(callback) {
		
		this.words.forEach(function (word) {
			word.writeDescription(callback);
		});

	};

	Board.prototype.enableArrowControls = function() {

		// assign arrow key listeners
		$(document).keydown(function (e) {

			var focusedCell = this.$table.find(':focus');

			if (focusedCell.length == 0) {
				return;
			}

			switch (e.which) {
				case 37: {
					// left
					var leftCell = focusedCell.parent("td").prev().find('input.editable').focus();
				}
				break;
				case 38: {
					// up
					var focusedCell = focusedCell.parent('td');
					var currentRow = focusedCell.parent("tr");
					var upRow = currentRow.prev();
					var upCell = upRow.find('td').filter(function(i) {
									return i == focusedCell.index();
								});
					upCell.find('input').focus();
				}
				break;
				case 39: {
					// right
					focusedCell.parent("td").next().find('input.editable').focus();
				}
				break;
				case 40: {
					// down
					var focusedCell = focusedCell.parent('td');
					var currentRow = focusedCell.parent("tr");
					var downRow = currentRow.next();
					var downCell = downRow.find('td').filter(function(i) {
									return i == focusedCell.index();
								});
					downCell.find('input').focus();
				}
				break;
				default:
				return;
			}

		}.bind(this))
	};

	Board.prototype.validate = function(callback) {
		
		for (var i = 0; i < this.words.length; i++) {
			var word = this.words[i];
			if (!word.validate()) {
				callback(word);
				return false;
			}
		}

		return true;
	};

})(jQuery)
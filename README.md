# Crossword-jQuery: a fun thing to make
A crossword generator using jQuery, HTML and Bootstrap (optional, just to make table look prettier)

# Usage
1. Sketch your crosswords on a piece of paper
2. Check for the number of rows and columns
3. Create the rows and columns as HTML table rows
4. Import crossword.js
5. Load your word sources in an array
6. Board.begin()
7. * check the demo HTML and main.js for more insights

# API
**Word**

- Initialize word object into data source

Word(text|string, direction|'horizontal' or 'vertical', origin|{x: x, y: y}, description|string)

**Board**

- Board(words|array<Word>, $table, {horizontal: $horizontal_description_area, vertical: $vertical_description_area})

- Initialize board

board.begin();

- Write your word description into HTML, with optional callback

board.writeDescriptions(callback(description|string, index|number))

- Enable navigation using arrow

board.enableArrowControls();

- Validate the board

board.validate(callback(word))



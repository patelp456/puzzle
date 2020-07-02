move_count = 0;
// convert arry of length 16 to 4*4 grid.
function convert_2d(arr) {
    var grid = [];
    for (let i = 0; i < arr.length; i += 4) {
        grid.push(arr.slice(i, i + 4));
    }
    return grid;
}

// get grid of buttons.
function get_grids() {
    var arr = document.getElementsByClassName('grid-item');
    arr = Object.values(arr);
    var grid = convert_2d(arr);
    return grid;
}

// check if grid is solved or not
function isSolved(grid) {
    var status = grid[0][0].innerText == 1 &&
        grid[0][1].innerText == 2 &&
        grid[0][2].innerText == 3 &&
        grid[0][3].innerText == 4 &&
        grid[1][0].innerText == 5 &&
        grid[1][1].innerText == 6 &&
        grid[1][2].innerText == 7 &&
        grid[1][3].innerText == 8 &&
        grid[2][0].innerText == 9 &&
        grid[2][1].innerText == 10 &&
        grid[2][2].innerText == 11 &&
        grid[2][3].innerText == 12 &&
        grid[3][0].innerText == 13 &&
        grid[3][1].innerText == 14 &&
        grid[3][2].innerText == 15 &&
        grid[3][3].innerText == '';
    return status;
}

// suffle numbers
function get_random_grid(grid) {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];
    var index, counter, temp;
    counter = arr.length;

    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter -= 1;
        temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }

    matrix = convert_2d(arr);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            grid[i][j].innerText = matrix[i][j];
        }
    }

    return grid;
}

function get_surronding_boxes(grid, i, j) {
    var top_box, left_box, right_box, bot_box;
    if (i == 0) {
        top_box = null;
    } else {
        top_box = grid[i - 1][j];
    }

    if (i == 3) {
        bot_box = null;
    } else {
        bot_box = grid[i + 1][j];
    }

    if (j == 0) {
        left_box = null;
    } else {
        left_box = grid[i][j - 1];
    }

    if (j == 3) {
        right_box = null;
    } else {
        right_box = grid[i][j + 1];
    }

    return [top_box, left_box, right_box, bot_box];
}

grid = get_grids();

// add event listener for clicks of button
function get_box_clicked(elem) {
    idx = elem.id.split('-');
    i = parseInt(idx[0]);
    j = parseInt(idx[1]);

    // swap box content if applicable
    boxes = get_surronding_boxes(grid, i, j);
    for (let idx = 0; idx < boxes.length; idx++) {
        if (boxes[idx] != null) {
            if (boxes[idx].innerText == '') {
                boxes[idx].innerText = grid[i][j].innerText;
                grid[i][j].innerText = '';
                move_count += 1;
                break;
            }
        }
    }

    // check for winning status
    if (isSolved(grid)) {
        document.getElementById('win').innerText = 'Congratulations you won ... Total Moves: ' + move_count;
        document.getElementById('win').style.backgroundColor = 'rgb(12, 175, 88)';

        var arr = document.getElementsByClassName('grid-item');
        arr = Object.values(arr);
        for (let i = 0; i < arr.length; i++) {
            arr[i].onclick = '';
        }

    } else {
        document.getElementById('win').innerText = 'try try try... until you succeed Total Moves: ' + move_count;
        document.getElementById('win').style.backgroundColor = 'rgb(210, 105, 30)';
        document.getElementById('win').style.display = 'block';
    }
}

// start new game
function new_game() {
    grid = get_random_grid(grid);
    while (isSolved(grid)) {
        grid = get_random_grid(grid);
    }

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            grid[i][j].onclick = new Function("get_box_clicked(this)");
        }
    }
    document.getElementById('win').style.display = 'none';
    move_count = 0;
}

new_game();
// #This procedure finds the next empty square to fill on the Sudoku grid
function findNextCellToFill(grid) {
    // #Look for an unfilled grid location
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            if (grid[x][y] == 0) { 
                return {"x":x, "y":y} 
            }
        }

    }
    return {"x":-1, "y":-1}
}

// #This procedure checks if setting the(i, j) square to e is valid
function isValid(grid, i, j, e) {
    var rowOk
    for (let x = 0; x < 9; x++) {
        if (e != grid[i][x]) {
            rowOk = true
        } else {
            rowOk = false
            break
        }
    }
    if (rowOk) {
        var columnOk
        for (let x = 0; x < 9; x++) {
            if (e != grid[x][j]) {
                columnOk = true
            } else {
                columnOk = false
                break
            }
        }
        if (columnOk) {
            // #finding the top left x, y co - ordinates of
            // #the section or sub - grid containing the i, j cell
            var secTopX = 3 * parseInt(i / 3)
            var secTopY = 3 * parseInt(j / 3)
            for (let x = secTopX; x < secTopX + 3; x++) {
                for (let y = secTopY; y < secTopY + 3; y++) {
                    if (grid[x][y] == e) {
                        return false
                    }
                }
            }
            return true
        }
    }
    return false
}

// #This procedure fills in the missing squares of a Sudoku puzzle
// #obeying the Sudoku rules through brute - force guessing and checking
function solveSudoku(grid, i, j) {
    // #find the next cell to fill
    let {x,y} = findNextCellToFill(grid)
    i = x
    j = y
    if (i == -1) {
        return true
    }
    for (let e = 1; e < 10; e++) {
        // #Try different values in i, j location
        if (isValid(grid, i, j, e)) {
            grid[i][j] = e
            if (solveSudoku(grid, i, j)) {
                return true
            }
            // #Undo the current cell for backtracking
            grid[i][j] = 0
        }
    }

    return false
}

// # check if the sudoku has repetitive number, or it will go into
// # a almost endless calculation
function isSudoku(grid) {
    // if (sum(grid) == 0) {
    //     return false
    // }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] != 0) {
                temp = grid[i][j]
                grid[i][j] = 0
                if (!isValid(grid, i, j, temp)) {
                    grid[i][j] = temp
                    return false
                }
                grid[i][j] = temp
            }
        }
    }
    return true
}

function run_sudoku(grid) {
    if (isSudoku(grid)) {
        return solveSudoku(grid,0,0)
    }
    return false
}

function displaySudoku() {
    var input = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]]

    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            var id = "in" + (x+1) + (y+1)
            var content = document.getElementById(id).value
            if (content != "") {
                input[x][y] = parseInt(content) 
            }
        }
    }
    if (run_sudoku(input)){
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                var id = "in" + (x+1) + (y+1)
                document.getElementById(id).value = input[x][y]
            }
        }
        document.getElementById("test_out").innerHTML = "Yes!"
    }else{
        document.getElementById("test_out").innerHTML = "No Answer!"
    }
}

function resetSudoku(){
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            var id = "in" + (x+1) + (y+1)
            document.getElementById(id).value = ""
        }
    }
    document.getElementById("test_out").innerHTML = ""
}

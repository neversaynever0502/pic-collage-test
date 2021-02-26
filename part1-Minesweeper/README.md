## Open Website:

Just open the main.html file in browser.


## RUN test:

npm install

npm run test


## My Coding Explanation:

1.At the beginning, the matrix called grid is used to put down a two-dimensional array.

2.Randomly generate bombs in the matrix, and cannot be in duplicate locations, and cannot be the first square clicked.

3.Click, will allow the clicked box to follow the variable grid, replace the css and innerHTML, so that he displays the number or bomb (right-click for put flag).

4.Later in the process of clicking, if you click on the number of 0 boxes, and determine whether the top or bottom or left or right is 0, and if it is 0, then keep expanding until the margin is not 0.

5.Win condition, use the variable called grid_show matrix to store the clicked blocks, if the number of clicks (excluding the number of flags put in) is equal to the number of rows multiplied by the number of columns minus the number of bombs, and no bombs have been clicked, that is, the winner.

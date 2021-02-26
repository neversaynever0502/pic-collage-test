const {
  besides_numbers_arr,
  find_repeat_2D_array,
  findAllBesideZero,
  click_little_square,
  make2Darray,
  random_generate_bumb,
  calculate_numbers_in_little_square,
  restart,
  check_win
} = require('./main_for_test');


let firstClick = true
let grid = []
let grid_show = []
let column_count = 8
let rows_count = 8
let bumb_count = 12 
let whole_can_click_count = column_count*rows_count-bumb_count
let lose_or_not = false

test('check generate bumbs and not on first click in rendering the grid', () => {
  let avoid_bumb_row = 0
  let avoid_bumb_column = 0 
  grid = make2Darray(column_count,rows_count)
  grid_show = make2Darray(column_count,rows_count)
  grid = random_generate_bumb(grid,bumb_count,avoid_bumb_row,avoid_bumb_column)
  let bumb_temp_count = 0
  for(i=0;i<column_count;i++){
    for(j=0;j<rows_count;j++){
      if (grid[i][j]==-1){
        bumb_temp_count++
      }
    }
  }
  expect(bumb_temp_count).toBe(bumb_count);
  expect(grid[0][0]).not.toBe(-1);

});

test('check calculate numbers in rendering the grid', () => {
  grid = calculate_numbers_in_little_square(grid,column_count,rows_count)
  // calculate grid[1][1] number
  let temp_bumb_number = 0
  for(rows=-1;rows<=1;rows++){
    for(columns=-1;columns<=1;columns++){
      if(grid[1+rows]&&grid[1+rows][1+columns]==-1){
        temp_bumb_number++
      }
    }
  }
  expect(temp_bumb_number).toBe(grid[1][1]);
});

test('check win', () => {
  // win
  // let whole_can_click_count_temp=0
  let win = false
  for(i=0;i<column_count;i++){
    for(j=0;j<rows_count;j++){
      
      if (grid[i]&&grid[i][j]==-1){
        
        [win,whole_can_click_count,grid_show,grid] = click_little_square(i,j,'right_click_put_flag',whole_can_click_count,grid_show,grid)
        // console.log('right_click_put_flag:',win,whole_can_click_count)
      }else{
        [win,whole_can_click_count,grid_show,grid] = click_little_square(i,j,'left_click_show_number',whole_can_click_count,grid_show,grid)
        // console.log('left_click_show_number:',win,whole_can_click_count)
      }
    }
  }
  expect(win).toBe(true);
});

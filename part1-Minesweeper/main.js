
let firstClick = true
let grid = []
let grid_show = []
let column_count = 8
let rows_count = 8
let bumb_count = 12 
let whole_can_click_count = column_count*rows_count-bumb_count
let lose_or_not = false

// Return the number of up, left, right and down
function besides_numbers_arr(arr,i,j){
  return [
    [arr[i-1]?arr[i-1][j]:undefined,i-1,j],
    [arr[i][j+1],i,j+1],
    [arr[i+1]?arr[i+1][j]:undefined,i+1,j],
    [arr[i][j-1],i,j-1]
  ]
}

// Test an arr and row, column has no overlap
function find_repeat_2D_array(arr,i,j){
  let this_repeat = false
  arr.forEach((a)=>{
    if(a[1]==i&&a[2]==j){
      this_repeat = true
    }
  })
  return this_repeat
}

// The augmentation point is 0 until the margin is not 0
function findAllBesideZero(arr,i,j){
  let lightupArr = []

  lightupArr.push([arr[i][j],i,j])
  let beside_arr= []
  beside_arr.push(besides_numbers_arr(arr,i,j))

  let continueRun = true
  let loop = 0

  while(continueRun){
    let thisLoopHasNoZeroBesides = true
    if(beside_arr[loop]&&beside_arr[loop].length){
      for(k=0;k<beside_arr[loop].length;k++){
        i=beside_arr[loop][k][1]
        j=beside_arr[loop][k][2]
        if(!find_repeat_2D_array(lightupArr,i,j)&&beside_arr[loop][k][0]!=undefined){
          lightupArr.push(beside_arr[loop][k])
          if(beside_arr[loop][k][0]==0){
            beside_arr=[...beside_arr,besides_numbers_arr(arr,i,j)]
          }
        }
        if(beside_arr[loop][k][0]==0){
          thisLoopHasNoZeroBesides = false
        }
      }
    }


    if(thisLoopHasNoZeroBesides){
      continueRun = false
    }
    loop++
  }

  return lightupArr

}

// Click on the square box
function click_little_square(i,j){
  if(firstClick){
    render_bumb_and_whole_data(i,j)
    firstClick=false
  }
  // click right 
  if (event.type == 'contextmenu') {
    console.log('click right button')
    if(document.querySelector(`div[location${i}${j}]`).classList.contains('bumb')){
      document.querySelector(`div[location${i}${j}]`).classList.remove('bumb')
      document.querySelector(`div[location${i}${j}]`).innerHTML = '<div></div>'

      bumb_count = bumb_count+1
      grid_show[i][j] = false
      document.getElementById('flag_remain').innerHTML=`flag remain: ${bumb_count}`
    }else{
      document.querySelector(`div[location${i}${j}]`).classList.add('bumb')
      document.querySelector(`div[location${i}${j}]`).innerHTML = '<div style="text-align:center"><img style="width:15px;height:15px;margin-top:2px" src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/finish_flag-512.png" /></div>'
      bumb_count = bumb_count-1
      grid_show[i][j] = true
      document.getElementById('flag_remain').innerHTML=`flag remain: ${bumb_count}`  
    }
  }else{
    document.querySelector(`div[location${i}${j}]`).classList.add('clicked')

    let real_show = ''

    if(grid[i][j]==-1){
      // if it is a bumb
      real_show = '<img style="width:15px;height:15px;margin-top:2px" src="https://cdn3.iconfinder.com/data/icons/streamline-icon-set-free-pack/48/Streamline-02-512.png" />'
      document.querySelector(`div[location${i}${j}]`).innerHTML = `<div>${real_show}</div>`
      grid_show[i][j] = true
      lose_or_not = true
      alert('bumb!You lose!')
    }else if(grid[i][j]==0){
      // if the number is zero on the box, 
      real_show = grid[i][j]
      document.querySelector(`div[location${i}${j}]`).innerHTML = `<div></div>`

      let ar = findAllBesideZero(grid,i,j)

      for(k=0;k<ar.length;k++){

        if(ar[k][0]!=undefined){
          real_show = ar[k][0]

          if(grid_show[ar[k][1]][ar[k][2]]!==true){
            whole_can_click_count = whole_can_click_count -1
            console.log('whole_can_click_count:',whole_can_click_count)
            grid_show[ar[k][1],ar[k][2]] = true
          }
          if(real_show==1){
            document.querySelector(`div[location${ar[k][1]}${ar[k][2]}`).innerHTML = `<div class='clicked_1'>${real_show}</div>`
          }else if(real_show==2){
            document.querySelector(`div[location${ar[k][1]}${ar[k][2]}`).innerHTML = `<div class='clicked_2'>${real_show}</div>`
          }else if(real_show==3){
            document.querySelector(`div[location${ar[k][1]}${ar[k][2]}`).innerHTML = `<div class='clicked_3'>${real_show}</div>`
          }else if(real_show>=4){
            document.querySelector(`div[location${ar[k][1]}${ar[k][2]}`).innerHTML = `<div class='clicked_4'>${real_show}</div>`
          }else{
            document.querySelector(`div[location${ar[k][1]}${ar[k][2]}`).innerHTML = `<div class='clicked_0'>${real_show}</div>`
          }          
        }
      }
    }else{
      if(!grid_show[i][j]){
        real_show = grid[i][j]
        if(real_show==1){
          document.querySelector(`div[location${i}${j}]`).innerHTML = `<div class='clicked_1'>${real_show}</div>`
        }else if(real_show==2){
          document.querySelector(`div[location${i}${j}]`).innerHTML = `<div class='clicked_2'>${real_show}</div>`
        }else if(real_show==3){
          document.querySelector(`div[location${i}${j}]`).innerHTML = `<div class='clicked_3'>${real_show}</div>`
        }else if(real_show>=4){
          document.querySelector(`div[location${i}${j}]`).innerHTML = `<div class='clicked_4'>${real_show}</div>`
        }
        // console.log(grid_show)
        whole_can_click_count = whole_can_click_count - 1
        grid_show[i][j] = true

        console.log('whole_can_click_count:',whole_can_click_count)
      }
    }
  }
  auto_check_win()
}

// Creating two-dimensional matrices
function make2Darray(column_count,rows_count){
  var arr = new Array(column_count)
  for(i=0;i<arr.length;i++){
    arr[i] = new Array(rows_count)
  }
  return arr
}

// Insert the bombs randomly and can not be repeated and can not be the first click of the box
function random_generate_bumb(arr,n,avoid_bumb_row,avoid_bumb_column){
  console.log(arr,n,avoid_bumb_row,avoid_bumb_column)
  // console.log(arr[9])
  let bumb_location = []
  while(bumb_location.length<n){
    let randomNumber_row = Math.floor(Math.random()*arr.length)
    let randomNumber_column = Math.floor(Math.random()*arr.length)
    if((bumb_location.indexOf(String(randomNumber_row)+String(randomNumber_column))==-1)){
      if((!((randomNumber_row==avoid_bumb_row)&&(randomNumber_column==avoid_bumb_column)))){
        arr[randomNumber_row][randomNumber_column] = -1
        bumb_location.push(String(randomNumber_row)+String(randomNumber_column))
      }
    }
  }
  return arr
}

// Considering the bombs, calculate all the numbers (the number of bombs in the nine-box grid)
function calculate_numbers_in_little_square(arr,column_count,rows_count){
  for(i=0;i<column_count;i++){
    for(j=0;j<rows_count;j++){
      let bumb_number = 0
      if(arr[i][j]!==-1){
        // Calculation of the number of bumb in the nine-box grid
        for(rows=-1;rows<=1;rows++){
          for(columns=-1;columns<=1;columns++){
            if(arr[i+rows]&&arr[i+rows][j+columns]==-1){
              bumb_number++
            }
          }
        }
        arr[i][j] = bumb_number
      }else{
        console.log('bumb',i,j)
      }
    }
  }
  return arr
}

// Restart the game
function restart(){
  document.oncontextmenu = function(){return false};     //禁止滑鼠右鍵選單顯示


  let html_innput = ''
  grid = make2Darray(column_count,rows_count)
  for(i=0;i<column_count;i++){
    for(j=0;j<rows_count;j++){
      html_innput=html_innput+`<div class='little_square' onclick='click_little_square(${i},${j})' oncontextmenu='click_little_square(${i},${j})' location${i}${j}='true'><div class='numbers_square' numberlocation${i}${j}='true'>${grid[i][j]}</div></div>`
    }
  }

  document.getElementById("game_board").style.width=30*rows_count;
  document.getElementById('game_board').innerHTML=html_innput
  document.getElementById('flag_remain').innerHTML=`flag remain: ${bumb_count}`
}

// New game to render bumb and calculate all numbers
function render_bumb_and_whole_data(avoid_bumb_row,avoid_bumb_column){
  let html_innput = ''
  grid = make2Darray(column_count,rows_count)
  grid = random_generate_bumb(grid,bumb_count,avoid_bumb_row,avoid_bumb_column)
  grid = calculate_numbers_in_little_square(grid,column_count,rows_count)
  grid_show = make2Darray(column_count,rows_count)
  for(i=0;i<column_count;i++){
    for(j=0;j<rows_count;j++){
      html_innput=html_innput+`<div class='little_square' onclick='click_little_square(${i},${j})' oncontextmenu='click_little_square(${i},${j})' location${i}${j}='true'><div class='numbers_square' numberlocation${i}${j}='true'>${grid[i][j]}</div></div>`
    }
  }
  document.getElementById('game_board').innerHTML=html_innput
}

// check if win or not by clicking button
function check_win(){
  console.log(whole_can_click_count)
  if(lose_or_not){
    alert('You Lose It.')
  }else{
    if(bumb_count==0&&whole_can_click_count==0){
      alert('Congraduations!You Win!')
    }else{
      alert('Still Working On it')
    }
  }
}

// each click to check if win
function auto_check_win(){
  console.log(whole_can_click_count)
  if(bumb_count==0&&whole_can_click_count==0){
    alert('Congraduations!You Win!')
  }
}

restart()
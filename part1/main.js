
let firstClick = true
let grid = []
let grid_show = []
let column_count = 8
let rows_count = 8
let bumb_count = 12 
let whole_can_click_count = column_count*rows_count-bumb_count
let lose_or_not = false

function besides_numbers_arr(arr,i,j){
  return [
    [arr[i-1]?arr[i-1][j]:undefined,i-1,j],
    [arr[i][j+1],i,j+1],
    [arr[i+1]?arr[i+1][j]:undefined,i+1,j],
    [arr[i][j-1],i,j-1]
  ]
}

function find_repeat_2D_array(arr,i,j){
  let this_repeat = false
  arr.forEach((a)=>{
    if(a[1]==i&&a[2]==j){
      this_repeat = true
    }
  })
  // console.log('find_repeat_2D_array:',arr,i,j,this_repeat)
  return this_repeat
}
function findAllBesideZero(arr,i,j){
  let lightupArr = []
  // let c = true
  // let c2 = true
  // let w = 0
  // while (c) {
  //   let beside_arr= besides_numbers_arr(arr,i,j)
  //   for(k=0; k<beside_arr.length; k++) {
  //     if(!find_repeat_2D_array(lightupArr,beside_arr[k][1],beside_arr[k][2])){
  //       lightupArr.push(beside_arr[k])
  //     }
  //     if (beside_arr[k][0] == 0) {
        
  //     }else{
  //       c2=false
  //     }
  //   }
  //   if(!c2){
  //     c=false
  //   }
  // }
  // for(loop=0;loop<1;loop++) {
  //   loop = 0
  //   let beside_arr = []
  //   for(k=0;k<beside_arr.length;k++){
  //     if (loop === 0) {
  //       beside_arr= [...beside_arr, besides_numbers_arr(arr,i,j)]  
  //     } else {
  //       // @TODO Zuray Question....
  //       // beside_arr= [...beside_arr, besides_numbers_arr(arr,beside_arr[loop][k][1],beside_arr[loop][k][2])]
  //     }
  //     // if(!find_repeat_2D_array(lightupArr,beside_arr[loop][k][1],beside_arr[loop][k][2])){
  //       lightupArr.push(beside_arr[loop][k])
  //     // }
  //     // if(beside_arr[loop][k][0]==0){
  //       // i= beside_arr[loop][k][1]
  //       // j = beside_arr[loop][k][2]
  //       // beside_arr.push(besides_numbers_arr(arr,besides_numbers_arr(arr,beside_arr[loop][k][1],beside_arr[loop][k][2])))
  //     // }
  //   }
  // }
  // return lightupArr
  
  // for(loop=0;loop<10;loop++){
  lightupArr.push([arr[i][j],i,j])
  let beside_arr= besides_numbers_arr(arr,i,j)
  for(k=0;k<beside_arr.length;k++){
    if(!find_repeat_2D_array(lightupArr,beside_arr[k][1],beside_arr[k][2])&&beside_arr[k][0]!=undefined){
      lightupArr.push(beside_arr[k])
    }
    if(beside_arr[k][0]==0){
      let beside_arr2 = besides_numbers_arr(arr,beside_arr[k][1],beside_arr[k][2])
      for(let k=0;k<beside_arr2.length;k++){
        if(!find_repeat_2D_array(lightupArr,beside_arr2[k][1],beside_arr2[k][2])&&beside_arr2[k][0]!=undefined){
          lightupArr.push(beside_arr2[k])
        }
        if(beside_arr2[k][0]==0){
          let beside_arr3 = besides_numbers_arr(arr,beside_arr2[k][1],beside_arr2[k][2])
          for(let k=0;k<beside_arr3.length;k++){
              if(!find_repeat_2D_array(lightupArr,beside_arr3[k][1],beside_arr3[k][2])&&beside_arr3[k][0]!=undefined){
                lightupArr.push(beside_arr3[k])
              }
              if(beside_arr3[k][0]==0){
                let beside_arr4 = besides_numbers_arr(arr,beside_arr3[k][1],beside_arr3[k][2])
                for(let k=0;k<beside_arr4.length;k++){
                  if(!find_repeat_2D_array(lightupArr,beside_arr4[k][1],beside_arr4[k][2])&&beside_arr4[k][0]!=undefined){
                    lightupArr.push(beside_arr4[k])
                  }
                    if(beside_arr4[k][0]==0){
                      let beside_arr5 = besides_numbers_arr(arr,beside_arr4[k][1],beside_arr4[k][2])
                      for(let k=0;k<beside_arr5.length;k++){
                        if(!find_repeat_2D_array(lightupArr,beside_arr5[k][1],beside_arr5[k][2])&&beside_arr5[k][0]!=undefined){
                          lightupArr.push(beside_arr5[k])
                        }
                        if(beside_arr5[k][0]==0){
                          let beside_arr6 = besides_numbers_arr(arr,beside_arr5[k][1],beside_arr5[k][2])
                          for(let k=0;k<beside_arr6.length;k++){
                            if(!find_repeat_2D_array(lightupArr,beside_arr6[k][1],beside_arr6[k][2])&&beside_arr6[k][0]!=undefined){
                              lightupArr.push(beside_arr6[k])

                            }
                          }
                        }
                      }
                    }
                }
              }
          }
        }
      }
    }
  }

  return lightupArr

}

function click_little_square(i,j){
  if(firstClick){
    render_bumb_and_whole_data(i,j)
    firstClick=false
  }
  
  if (event.type == 'contextmenu') {
    console.log('click right button')
    if(document.querySelector(`div[location${i}${j}]`).classList.contains('bumb')){
      document.querySelector(`div[location${i}${j}]`).classList.remove('bumb')
      document.querySelector(`div[location${i}${j}]`).innerHTML = '<div></div>'

      bumb_count = bumb_count+1
      grid_show[i][j] = false
      console.log(grid_show)
      document.getElementById('flag_remain').innerHTML=`flag remain: ${bumb_count}`
    }else{
      document.querySelector(`div[location${i}${j}]`).classList.add('bumb')
      document.querySelector(`div[location${i}${j}]`).innerHTML = '<div style="text-align:center"><img style="width:15px;height:15px;margin-top:2px" src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/finish_flag-512.png" /></div>'
      bumb_count = bumb_count-1
      grid_show[i][j] = true
      console.log(grid_show)

      document.getElementById('flag_remain').innerHTML=`flag remain: ${bumb_count}`  
    }
  }else{
    document.querySelector(`div[location${i}${j}]`).classList.add('clicked')

    let real_show = ''

    if(grid[i][j]==-1){
      real_show = '<img style="width:15px;height:15px;margin-top:2px" src="https://cdn3.iconfinder.com/data/icons/streamline-icon-set-free-pack/48/Streamline-02-512.png" />'
      // alert('bumb!')
      document.querySelector(`div[location${i}${j}]`).innerHTML = `<div>${real_show}</div>`
      grid_show[i][j] = true
      console.log(grid_show)
      lose_or_not = true
      alert('bumb!You lose!')
    }else if(grid[i][j]==0){
      real_show = grid[i][j]
      document.querySelector(`div[location${i}${j}]`).innerHTML = `<div></div>`

      let ar = findAllBesideZero(grid,i,j)
      console.log('ar:::',ar)
      console.log('ar-length::',ar.length)
      // if(!grid_show[i][j]){ 
      //   whole_can_click_count = whole_can_click_count -1
      // }

      for(k=0;k<ar.length;k++){
        // document.querySelector(`div[location${ar[k][1]}${ar[k][2]}]`).classList.add('clicked')

        if(ar[k][0]!=undefined){
          real_show = ar[k][0]
          // if(real_show==0){
          console.log(grid_show[ar[k][1],ar[k][2]])
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
            // whole_can_click_count = whole_can_click_count -1
            // console.log('whole_can_click_count:',whole_can_click_count)
            document.querySelector(`div[location${ar[k][1]}${ar[k][2]}`).innerHTML = `<div class='clicked_0'>${real_show}</div>`
          }
          
          // console.log(grid_show)
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

    // document.querySelector(`div[numberlocation${i}${j}]`).classList.remove('numbers_square')
    // document.querySelector(`div[numberlocation${i}${j}]`).classList.add('numbers_square_clicked')


    // console.log(thisDiv)
    // thisDiv.addClass('')
    // if(grid[i][j]==-1){
    //   alert('you lose')
    // }
  }
  auto_check_win()
}

function make2Darray(column_count,rows_count){
  var arr = new Array(column_count)
  for(i=0;i<arr.length;i++){
    arr[i] = new Array(rows_count)
  }
  return arr
}

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

function calculate_numbers_in_little_square(arr,column_count,rows_count){
  console.log(arr,column_count,rows_count)
  for(i=0;i<column_count;i++){
    for(j=0;j<rows_count;j++){
      console.log(i,j)
      // if(i==0){
      //   arr[i][j] = '?'
      // }else if(j==0){
      //   arr[i][j] = '?'
      // }else if(i==column_count-1){
      //   arr[i][j] = '?2'
      // }else if(j=rows_count-1){
      //   arr[i][j] = '?2'
      // }else{
      //   console.log(123)
      let bumb_number = 0
      if(arr[i][j]!==-1){
        for(rows=-1;rows<=1;rows++){
          for(columns=-1;columns<=1;columns++){
            if(arr[i+rows]&&arr[i+rows][j+columns]==-1){
              bumb_number++
            }
          }
        }
        // if(arr[i-1]&&arr[i-1][j]==-1){
        //   bumb_number++
        // }
        // if(arr[i][j-1]&&arr[i][j-1]==-1){
        //   bumb_number++
        // }
        // if(arr[i+1]&&arr[i+1][j]==-1){
        //   bumb_number++
        // }
        // if(arr[i][j+1]&&arr[i][j+1]==-1){
        //   bumb_number++
        // }
        arr[i][j] = bumb_number
      }else{
        console.log('炸彈',i,j)
        
      }
      // }
    }
  }
  return arr
}

function restart(){
  document.oncontextmenu = function(){return false};     //禁止滑鼠右鍵選單顯示


  let html_innput = ''
  grid = make2Darray(column_count,rows_count)
  for(i=0;i<column_count;i++){
    for(j=0;j<rows_count;j++){
      html_innput=html_innput+`<div class='little_square' onclick='click_little_square(${i},${j})' oncontextmenu='click_little_square(${i},${j})' location${i}${j}='true'><div class='numbers_square' numberlocation${i}${j}='true'>${grid[i][j]}</div></div>`
    }
    // html_innput=html_innput+'<div style="margin-top:-2px"></div>'
  }

  document.getElementById("game_board").style.width=30*rows_count;

  document.getElementById('game_board').innerHTML=html_innput
  document.getElementById('flag_remain').innerHTML=`flag remain: ${bumb_count}`
}

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
    // html_innput=html_innput+'<div style="margin-top:-2px"></div>'
  }
  document.getElementById('game_board').innerHTML=html_innput
}

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

function auto_check_win(){
  console.log(whole_can_click_count)
  if(bumb_count==0&&whole_can_click_count==0){
    alert('Congraduations!You Win!')
  }
}

restart()
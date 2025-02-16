// Information about the data:
// https://github.com/fivethirtyeight/data/tree/master/us-weather-history

const weatherURL = "https://raw.githubusercontent.com/fivethirtyeight/data/refs/heads/master/us-weather-history/KNYC.csv"

// https://p5js.org/reference/p5/p5.Table/
let weatherTable

let currentRow = 0
let currentColumn = 1

let m = 1
let data

function preload() {
  weatherTable = loadTable(weatherURL, 'csv', 'header')
}

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER)
  // console.log(weatherTable.getRowCount())
  data = getMonthSubset(m)
  noLoop()
}

function draw() {
  background(220);
  
  let padding = 0.04 *width
  let dx = (width-padding)/(data.length)
  for(let i = 0; i < data.length; i++ ) {
    const x = padding + (i)*dx
    fill("blue")
    noStroke()
    circle(x,data[i],5)
    
  }
}

function getMonthSubset(m) {
  mData = []
  for(let i = 0; i < weatherTable.getRowCount(); i++ ) {
    let date = weatherTable.getString(i,0)
    if (date.split("-")[1] == m) {
      let temp = weatherTable.getNum(i,1)
      let maxtemp = max(weatherTable.getColumn(1))
      let mintemp = min(weatherTable.getColumn(1))
      temp = map(temp,mintemp,maxtemp,0.8*height,0.2*height)
      mData.push(temp)
    }
  } 
  return mData
}

 
    
function keyPressed() {
  if( keyCode === UP_ARROW ) {
    data = weatherTable
    redraw()
  }
  if( keyCode === DOWN_ARROW ) {
    data = getMonthSubset(m)
    console.log("Month: " + m)
    redraw()
  }
  
  if( keyCode === RIGHT_ARROW ) {
    if (m>=12) {
      m=1
    }
    else {
      m++
    }
    data = getMonthSubset(m)
    console.log("Month: " + m)
    redraw()
  }
}

// Information about the data:
// https://github.com/fivethirtyeight/data/tree/master/us-weather-history

const weatherURL = "https://raw.githubusercontent.com/fivethirtyeight/data/refs/heads/master/us-weather-history/KNYC.csv"

// https://p5js.org/reference/p5/p5.Table/
let weatherTable

let currentRow = 0
let currentColumn = 1

function preload() {
  weatherTable = loadTable(weatherURL, 'csv', 'header')
}

function setup() {
  createCanvas(400, 400);
  noLoop()
  textAlign(CENTER, CENTER)
  // console.log(weatherTable.getRowCount())
}

function draw() {
  background(220);
  let dx = width/(weatherTable.getRowCount()+20)
  for(let i = 0; i < weatherTable.getRowCount(); i++ ) {
    let temp = weatherTable.getNum(i,1)
   
    let maxtemp = max(weatherTable.getColumn(1))
    let mintemp = min(weatherTable.getColumn(1))
    temp = map(temp,mintemp,maxtemp,0.8*height,0.2*height)
    const x = (i+1)*dx
    console.log(x, temp)
    fill("blue")
    noStroke()
    circle(x,temp,5)
    
  }
}

function keyPressed() {
  if( keyCode === DOWN_ARROW ) {
    currentRow++
    redraw()
  }
  if( keyCode === RIGHT_ARROW ) {
    currentColumn++
    if( currentColumn >= weatherTable.getColumnCount() ) {
      currentColumn = 1
    }
    redraw()
  }
}







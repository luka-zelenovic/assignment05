//Song credits: Janji - Heroes Tonight (feat. Johnning) [NCS Release] https://www.youtube.com/watch?v=3nQNiWdeH2Q


var mySong;
var analyzer;
var img1;
var img2;
var img3;
var a;
var fft;


function preload() {
    mySong = loadSound('assets/song.mp3');
   img1 = loadImage('assets/image2.png');
   img2 = loadImage('assets/image4.png');
   img3 = loadImage('assets/image3.png');
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    mySong.play();
    analyzer = new p5.Amplitude();
     fft = new p5.FFT();
    analyzer.setInput(mySong);
}

function draw() {
  
    background(255);
      image(img2,0,0,windowWidth, windowHeight);
      var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(3);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
  
    if (mySong.isPlaying() == true) {
      
        var volume = analyzer.getLevel();
        image(img1,windowWidth/2-windowWidth/6, windowHeight-(volume*windowHeight*2), windowWidth/3, windowHeight/3);
        if (volume>.40) {
          
          image(img3,0,0,windowWidth, windowHeight);
          a += 25;
        }
        if (volume<.15) {
          
         filter(INVERT); 
          a -= 25;
        }

    } else {
        image(img2,0,0,windowWidth, windowHeight);
        filter(INVERT);
        textSize(windowHeight/10);
        text('CLICK TO FLY AGAIN.',windowWidth/3, windowHeight/3);
    }
}

function mousePressed () {
  if (mySong.isPlaying() == false) {
    mySong.play();
    
  }
  
}


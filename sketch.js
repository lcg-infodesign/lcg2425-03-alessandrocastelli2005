let data;
let barColors = []; 

function preload() {
 
  data = loadTable("river_lengths.CSV", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240);

  let names = data.getColumn("name");
  let lengths = data.getColumn("length").map(Number);


  let maxLength = 6650; 


  let margin = 80;
  let barWidth = (width - margin * 2) / names.length;


  for (let i = 0; i < names.length; i++) {
    barColors.push(color(random(100, 255), random(100, 255), random(100, 255)));
  }

  stroke(0);
  line(margin, height - margin, width - margin, height - margin); 
  line(margin, margin / 2, margin, height - margin); 

  textAlign(RIGHT);
  textSize(12);
  fill(0);

  let step = 1000; 
  for (let i = 0; i <= maxLength; i += step) {
    let y = map(i, 0, maxLength, height - margin, margin / 2); 
    line(margin - 5, y, margin, y); 
    text(i + " km", margin - 10, y + 5); 
  }

  textAlign(CENTER);
  textSize(20);
  text("Lunghezza dei principali fiumi del mondo", width / 2, margin / 2);

  let selectedRiver = "";

  for (let i = 0; i < names.length; i++) {
    let x = margin + i * barWidth;
    let barHeight = map(lengths[i], 0, maxLength, 0, height - margin * 1.5);

    fill(barColors[i]);
    noStroke();
    rect(x, height - margin - barHeight, barWidth, barHeight);

    if (
      mouseX > x &&
      mouseX < x + barWidth &&
      mouseY > height - margin - barHeight &&
      mouseY < height - margin
    ) {
      selectedRiver = `${names[i]}: ${lengths[i]} km`;
    }
  }

  if (selectedRiver !== "") {
    fill(0);
    textSize(16);
    text(selectedRiver, width / 2, height - 30);
  }
}

function draw() {
  background(240);

  setup();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

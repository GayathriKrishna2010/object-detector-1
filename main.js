img = "";
objects = [];
status = "";

function preload() {
    img = loadImage("dog-cat.jpg");
}

function setup() {
    canvas = createCanvas(680 , 460);
    canvas.center();
    objectDetector = ml5.objectDetector('cocssd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("model Loaded");
    status = true;
    objectDetector.detect(img , gotResult);
}

function gotResult(error , results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(img , 0 , 0 , 680 , 460);

    if(status != "") {
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detcted";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" +percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y , objects[i].height , objects[i].width);
        }
    }
}
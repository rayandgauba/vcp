var song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(500,500);
    canvas.position(450,160);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("PoseNet is initilized!")
}

function gotPoses(results) {
    if(results.length>0) {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX);
        console.log("Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.leftWrist.y;
        console.log("Right Wrist X = " + rightWristX);
        console.log("Right Wrist Y = " + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Of left wrist = " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Of right wrist = " + scoreRightWrist);
}
 }

function draw() {
    image(video,0,0,500,500);
    fill("#ff0000");
    stroke("#ff0000");
    
    if (scoreRightWrist > 0.2) {
        
        circle(rightWristX,rightWristY,20);
    
    if (rightWristY > 0 && rightWristY <= 100) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }

    else if (rightWristY > 100 && rightWristY <= 200) {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }

    else if (rightWristY > 200 && rightWristY <= 300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }

    else if (rightWristY > 300 && rightWristY <= 400) {
        document.getElementById("speed").innerHTML = "Speed = 20x";
        song.rate(2);
    }

    else if (rightWristY > 400 && rightWristY <= 500) {
        document.getElementById("speed").innerHTML = "Speed 2.5x";
        song.rate(2.5);
    }
    
    }
    
    if(scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);
        inNumberLeftWristY = Number(leftWristY);
        remove_decimals = floor(inNumberLeftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML =  "Volume = " + volume;
        song.setVolume(volume);
    }
    
}

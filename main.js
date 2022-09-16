song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftwrist=0;
scorerightwrist=0;
song1status="";
song2status="";
function preload(){
    song1=loadSound("Song1.mp3");
    song2=loadSound("song2.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on("pose", gotresult);
}
function modelloaded(){
    console.log("Model is loaded")
}
function gotresult(results){
    if(results.length>0){
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
    }
}
function draw(){
    image(video,0,0,600,500);
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    fill("red");
    stroke("red");
if(scorerightwrist>0.2){
    circle(rightWristX,rightWristY,20);
    song2.stop();
    if(song1status==false){
        song1.play();
        document.getElementById("songname").innerHTML="playing Blank Space";
    }
}
if(scoreleftwrist>0.2){
    circle(leftWristX,leftWristY,20);
    song1.stop();
    if(song2status==false){
        song2.play();
        document.getElementById("songname").innerHTML="playing You Belong With Me";
    }
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
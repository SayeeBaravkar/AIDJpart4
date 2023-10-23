Maan_meri_jaan = "";
Mahiye_jinna_sona = "";
leftWrist_x = 0;
leftWrist_y =0;
rightWrist_x =0;
rightWrist_y =0;
scoreleftWrist =0;
song_Maan_meri = "";


function play()
{
    song.play();
    song.setVolume();
    song.rate(1);
}

function setup(){
    canvas = createCanvas(600,530);
    canvas.position(420,190);
    background("pink");

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video,0,0,600,530);

    fill("#ff0000");
    stroke("#ff00bf");

    song_Maan_meri = Maan_meri_jaan.isPlaying();
    console.log(song_Maan_meri);

    if(scoreleftWrist > 0.2)
    {
        circle(leftWrist_x,leftWrist_y,20);
        Mahiye_jinna_sona.stop();
        
        if(song_Maan_meri == false)
        {
            Mahiye_jinna_sona.play();
        }
        else
        {
            document.getElementById("song_id").innerHTML = "Song Name : Maan Meri Jaan"
        }
    }
}

function preload()
{
    Maan_meri_jaan = loadSound("MAAN MERI JAAN + AFTERLIFE.mp3");
    Mahiye_jinna_sona = loadSound("Mahiye Jinna Sohna(PagalWorld.com.se).mp3");
}

function modelLoaded()
{
    console.log("PoseNet Is Initialized");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);
    
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWrist_x + "leftWristY = " + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWrist_x + "rightWristY = " + rightWrist_y);
    }
}
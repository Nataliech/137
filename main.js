input_text = "";
status = "";
object = [];

function setup() 
{ 
 canvas = createCanvas(580, 450); 
 canvas.center(); 
 video = createCapture(VIDEO); 
 video.size(100, 100); 
 video.hide(); 

}



function start(){

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input_text = document.getElementById("input").value;
}

function modelLoaded(){

    console.log("Modal Loaded!");
    status = true;
 
}

function draw(){

    image(video, 125, 120, 300, 300);

    if(status != ""){

        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++){

            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + object.length;
        

    fill("#FF0000");
    percent = floor(object[i].confidence * 100);
    text(object[i].label + "" + percent + "%" , object[i].x + 5, object[i].y +5);
    noFill();
    stroke("#FF0000");
    rect(object[i].x , object[i].y , object[i].width, object[i].height);
    if(object[i].label == input_text){

        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("object_found").innerHTML = input_text + "Found";
        var synth = video.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(input_text+ "Found");
        synth.speak(utterThis);

    }

    else{

        document.getElementById("object_found").innerHTML = input_text+ "Not Found";
    }


        }

}

}

function gotResult(error, results){

    if(error){
        console.log(error);
    }
    console.log(results);
    object = results;
 }
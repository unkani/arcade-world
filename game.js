//location
startQuestions=true;
waterDirections=false;
direction = false;
leftHere=false;
treeHere=false
newHere=false;
rightHere=false;
theEnd=false;
newEnd=false;

//things to do
//direction=false;

$(document).ready(function() {
   $("form").submit(function() {
      var entered = $("#input").val();
      if (startQuestions) {
         if (entered == "drink water") {
            $("#water").slideDown(500);
            direction=true;
            startQuestions = false;
         } else if (entered =="go near trees") {
            $("#tree").slideDown(500);
            treeHere = true;
            startQuestions = false;
         } else {
            $("#start_stuck").slideDown(500);
         }
         
      } else if (treeHere) {
         if (entered == "checkout lakes") {
            $("#lakePpl").slideDown(500); 
               treeHere = false;
         } else if (entered =="checkout fields") {
            $("#fieldEnd").slideDown(500);
            treeHere = false;
         }else {
            $("#treeH_stuck").slideDown(500);
         }
      } else if (direction) {
         if (entered == "run left") {
            $("#runL").slideDown(500);  
               leftHere=true;
               direction = false;
         } else if (entered =="run right") {
            $("#runR").slideDown(500);
            rightHere=true;
            direction = false;
         }else {
            $("#direction_stuck").slideDown(500);
        }   
      } else if (leftHere) {
         if (entered ==  "go back for water") {
            $("#leftWater").slideDown(500);
            leftHere = false;
         } else if (entered =="checkout the trees") {
            $("#leftTree").slideDown(500);
            leftHere = false;
         }else {
            $("#leftH_stuck").slideDown(500);
         }   
      } else if(rightHere) {
         if (entered ==  "search same area") {
            $("#exploreSame").slideDown(500);   
            theEnd=true;
            rightHere = false;
         } else if (entered =="explore elsewhere") {
            $("#exploreNew").slideDown(500);
            newHere =true;
            rightHere = false;
         }else {
            $("#rightH_stuck").slideDown(500);
         }   
      }  else if(theEnd) {
         if (entered ==  "look for animals") {
            $("#animalsEnd").slideDown(500);   
         } else if (entered =="did well, go home"){
            $("#suicideEnd").slideDown(500);
         }else {
            $("#end_stuck").slideDown(500);
         }
         theEnd = false;
      } else if (newHere) {
         if (entered ==  "go forward") {
            $("#forward").slideDown(500); 
                newHere = false;
                newEnd=true;
         } else if (entered =="go to river"){
            $("#riverendEnd").slideDown(500);
             newHere = false;
         }else {
            $("#newH_stuck").slideDown(500);
         }
      } else if(newEnd) {
         if (entered ==  "watch deer") {
            $("#DeerEnd").slideDown(500); 
                newHere = false;
         } else if (entered =="go to marsh"){
            $("#marshEnd").slideDown(500);
             newHere = false;
         }else {
            $("#newEnd_stuck").slideDown(500);
         }
         }
      $("#input").val("");
   });
});
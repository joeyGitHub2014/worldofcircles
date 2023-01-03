/**
 * Created by Joseph on 4/5/2016.
 */

var  image2Src = null;
function getImage1Data(){
    var  image1Src;
    var xhttp = new XMLHttpRequest();
    xhttp.open("Get", 'images/eatCircles.png', false);
    xhttp.send(null);
    image1Src = xhttp.responseText; //Assume src = 'myFirstImg.png', 200x200 px
    //alert(image1Src);
}

function getImage2Data(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200)
            getSrc(xhttp.responseText);
    }
    xhttp.open("Get", 'images/eatCircles.png', true);
    xhttp.send(null);
}

function getSrc(text){
    image2Src = text; //Assume src = 'myLastImg.png', 10x10 px
   // alert(text);

}

/*Dynamically add two buttons on page load and these buttons should call
 getImage1Data and getImage2Data. Please don't use any libraries.*/
/*##########################################################################*/


window.onload = function(){
    var inner = document.getElementById("innerDiv").innerHTML +=
          "<div id ='firstButton'><button  onclick='getImage1Data()'>Button 1</button></div>" +
        "<div id ='secondButton'><button onclick='getImage2Data()'>Button 2</button></div>";

    //var firstEle = document.querySelector("#firstButton");
    //var secondEle = document.querySelector("#secondButton");
    //var thirdEle = document.querySelector("#thirdButton");
    /*...has multiple elements...*/

    //var lastEle = document.querySelector("#lastButton");
    /*  Now adding event listeners to all buttons*/
    //firstEle.addEventListener("click", clickHandler, false);
    //secondEle.addEventListener("click", clickHandler, false);
   // thirdEle.addEventListener("click", clickHandler, false);
    /*...has multiple elements...*/
    //lastEle.addEventListener("click", clickHandler, false);
    var ele = document.querySelectorAll('button');

    for (i = 0; i < ele.length; i++) {
        ele[i].addEventListener("click", clickHandler, false);
    }
};

function clickHandler(e) {
    clickedEle = e.target.id;
    alert('click hit'+clickedEle);
}



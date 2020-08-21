// chrome.browserAction.onClicked.addListener(function (tab) {
//     chrome.tabs.executeScript(null, { file: "action.js" });
// });

var searchbtnid="search_btn";
var normalbtnid="start_btn";

var click
var open=false
var chosen="该课程已经存在选课结果中"

//https://jwxk-443.webvpn.jnu.edu.cn/xsxkapp/sys/xsxkapp/

insertStartBtn(normalbtnid,switchState);
insertStartBtn(searchbtnid,searchState);




function insertStartBtn(btnid,func){
    var btn=document.createElement("button");
    btn.type="button"
    btn.id=btnid
    btn.onclick=func;
    btn.innerHTML="shua"
    document.getElementById("cvSplitSchoolCourse").getElementsByClassName("cv-course-header cv-clearfix-child")[0].appendChild(btn);
    console.log("fuck");
}

function chooseLesson(){
    document.getElementsByClassName("cv-row row-splitSchool-link")[0].getElementsByClassName("cv-choice  ")[0].click()
    document.getElementsByClassName("cv-sure cvBtnFlag")[0].click()
}

function getFirstLesson(){
    return document.getElementsByClassName("cv-row row-splitSchool-link")[0];
}

function start() {
    open=true;
    document.getElementById(normalbtnid).innerHTML="stop";
    click = setInterval(function () {
        document.getElementsByClassName("cv-row row-splitSchool-link")[0].getElementsByClassName("cv-choice  ")[0].click()
        document.getElementsByClassName("cv-sure cvBtnFlag")[0].click()
        if(document.getElementsByClassName("cv-dialog cv-danger")[0].getElementsByClassName("cv-body")[0].children[2].innerHTML==chosen){
            stop();
            console.log("chosen !");
        }
    }, 2000); 
}
function stop() {
    clearInterval(click);
    open=false;
    document.getElementById(normalbtnid).innerHTML="shua";
}

function switchState(){
    if(!open){
        start();
    }else{
        stop();
    }
} 

var searchClick
var searchOpen=false

function searchState(){
    if(!searchOpen){
        searchStart();
    }else{
        searchStop();
    }
}

function searchStart() {
    console.log("try to start.");
    searchOpen=true;
    document.getElementById(searchbtnid).innerHTML="stop";
    searchClick = setInterval(function () {
        document.getElementById("splitSearchBtn").click();
        les=getFirstLesson();
        str=les.getElementsByClassName("cv-school-capcity-col")[0].innerHTML;
        arr=str.split("/");
        // console.log("arr split:")
        // console.log(arr)
        if(arr.length>=2&&arr[0]!=arr[1]){
            console.log("chosen !");
            chooseLesson();
            searchStop();
        }
    }, 2000); 
}
function searchStop() {
    console.log("try to stop.");
    clearInterval(searchClick);
    searchOpen=false;
    document.getElementById(searchbtnid).innerHTML="shua";
}

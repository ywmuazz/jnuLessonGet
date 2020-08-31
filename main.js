// chrome.browserAction.onClicked.addListener(function (tab) {
//     chrome.tabs.executeScript(null, { file: "action.js" });
// });

var searchbtnid = "search_btn";
var normalbtnid = "start_btn";

var click
var open = false
var chosen = "该课程已经存在选课结果中"
var full = "该课程超过课容量"

//https://jwxk-443.webvpn.jnu.edu.cn/xsxkapp/sys/xsxkapp/

insertStartBtn(normalbtnid, switchState);
insertStartBtn(searchbtnid, searchState);




function insertStartBtn(btnid, func) {
    var btn = document.createElement("button");
    btn.type = "button"
    btn.id = btnid
    btn.onclick = func;
    btn.innerHTML = "shua"
    document.getElementById("cvSplitSchoolCourse").getElementsByClassName("cv-course-header cv-clearfix-child")[0].appendChild(btn);
    console.log("fuck");
}

function chooseLesson() {
    document.getElementsByClassName("cv-row row-splitSchool-link")[0].getElementsByClassName("cv-choice  ")[0].click()
    document.getElementsByClassName("cv-sure cvBtnFlag")[0].click()
}

function getFirstLesson() {
    return document.getElementsByClassName("cv-row row-splitSchool-link")[0];
}

//返回true停止刷
function normalOK() {

    var node=document.getElementsByClassName("cv-dialog cv-danger")[0].getElementsByClassName("cv-body")[0].children[2];
    if(node==null)return false;
    var res = node.innerHTML;
    if (res == full) return false;
    if (res == chosen) return true;
    return true;
}

function clickCheck() {
    if (normalOK()) {
        stop();
        console.log("chosen !");
    } else {
        var node=document.getElementsByClassName("cv-sure cvBtnFlag")[0];
        if(node!=null){
            node.click();
            console.log("click 'fail confirm'.");
        }
        
    }
}

function start() {

    open = true;
    document.getElementById(normalbtnid).innerHTML = "stop";
    click = setInterval(function () {
        document.getElementsByClassName("cv-row row-splitSchool-link")[0].getElementsByClassName("cv-choice  ")[0].click()
        console.log("click 'choose lesson'.")
        document.getElementsByClassName("cv-sure cvBtnFlag")[0].click()
        console.log("click 'choose confirm'.");
        setTimeout(clickCheck, 100);
    }, 1000);
}
function stop() {
    clearInterval(click);
    open = false;
    document.getElementById(normalbtnid).innerHTML = "shua";
}

function switchState() {
    if (!open) {
        start();
    } else {
        stop();
    }
}

var searchClick
var searchOpen = false

function searchState() {
    if (!searchOpen) {
        searchStart();
    } else {
        searchStop();
    }
}

function searchStart() {
    console.log("try to start.");
    searchOpen = true;
    document.getElementById(searchbtnid).innerHTML = "stop";
    searchClick = setInterval(function () {
        document.getElementById("splitSearchBtn").click();
        les = getFirstLesson();
        str = les.getElementsByClassName("cv-school-capcity-col")[0].innerHTML;
        arr = str.split("/");
        // console.log("arr split:")
        // console.log(arr)
        if (arr.length >= 2 && arr[0] != arr[1]) {
            console.log("chosen !");
            chooseLesson();
            searchStop();
        }
    }, 2000);
}
function searchStop() {
    console.log("try to stop.");
    clearInterval(searchClick);
    searchOpen = false;
    document.getElementById(searchbtnid).innerHTML = "shua";
}

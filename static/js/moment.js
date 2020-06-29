/*
 * @
 * @Author: Yellow
 * @Date: 2019-12-06 17:30
 * @LastEditTime : 2020-01-30 17:41
 */
(function () {
  // document.getElementById("search").focus();
  // let today = (new Date().getDate() + "")
  // document.body.style.backgroundImage = `url(static/img/bg${today}.jpg)`
  let weekText = ""
  setInterval(() => {
    var time = new Date(),
      y = time.getFullYear(),
      m = (time.getMonth() + 1 + "").padStart(2, 0),
      d = (time.getDate() + "").padStart(2, 0),
      h = (time.getHours() + "").padStart(2, 0),
      mm = (time.getMinutes() + "").padStart(2, 0),
      s = (time.getSeconds() + "").padStart(2, 0),
      ms = (Math.floor(time.getMilliseconds()) + "").padStart(2, 0),
      week = time.getDay();
    $(".hour_pre").removeClass().addClass(`digit hour_pre num_${h.substr(0, 1)}`)
    $(".hour_end").removeClass().addClass(`digit hour_end num_${h.substr(1, 1)}`)
    $(".minute_pre").removeClass().addClass(`digit minute_pre num_${mm.substr(0, 1)}`)
    $(".minute_end").removeClass().addClass(`digit minute_end num_${mm.substr(1, 1)}`)
    $(".second_pre").removeClass().addClass(`digit second_pre num_${s.substr(0, 1)}`)
    $(".second_end").removeClass().addClass(`digit second_end num_${s.substr(1, 1)}`)

    switch (week) {
      case 0: weekText = "星期日"; break;
      case 1: weekText = "星期一"; break;
      case 2: weekText = "星期二"; break;
      case 3: weekText = "星期三"; break;
      case 4: weekText = "星期四"; break;
      case 5: weekText = "星期五"; break;
      case 6: weekText = "星期六"; break;
    }
    document.getElementById("date").innerHTML = `${y}-${m}-${d}`;
    document.getElementById("week").innerHTML = weekText;
    // document.getElementById("day").innerHTML = `${h}:${mm}`;
    // document.getElementById("second").innerHTML = `:${s}`;
    // document.getElementById("millisecond").innerHTML = `${ms}`;
  }, 1)

  // setInterval(() => {
  //   var time = new Date(),
  //     mm = (time.getMinutes() + "").padStart(2, 0);
  //   if (mm == 59) {
  //     var min = 1;
  //     var max = 44;
  //     var radomNum = parseInt(Math.random() * (max - min + 1) + min, 10)
  //     document.body.style.backgroundImage = `url(static/img/bg${radomNum}.jpg)`
  //   }
  // }, 59000);
})()

function search() {
  const EVT = document.getElementById("search")
  let searchType = EVT.getAttribute("data-type")

  let searchURL = ""
  if (searchType == "google") {
    searchURL = "https://www.google.com/search?q="
  } else {
    searchURL = "https://www.baidu.com/s?wd="
  }
  window.location.href = searchURL + EVT.value
}

document.onkeyup = function (e) {
  // 兼容FF和IE和Opera
  var event = e || window.event;
  var key = event.which || event.keyCode || event.charCode;
  const typeItem = document.querySelectorAll(".type_item")
  const EVT = document.getElementById("search")
  if (EVT.value) {
    if (key == 13) {
      let selectTab = document.getElementById("selectTab")
      if (selectTab.getAttribute("data-display") == "none") {
        selectTab.style.display = "block"
        selectTab.setAttribute("data-display", "block")
      } else {
        search()
      }
    } else if (key == 38) {//38上键 40下键盘
      typeItem[0].classList.add("active")
      typeItem[1].classList.remove("active")
      EVT.setAttribute("data-type", "google")
    } else if (key == 40) {
      typeItem[0].classList.remove("active")
      typeItem[1].classList.add("active")
      EVT.setAttribute("data-type", "baidu")
    }
  }
};
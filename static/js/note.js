/*
 * @
 * @Author: Yellow
 * @Date: 2020-01-13 14:43
 * @LastEditTime: 2020-06-05 17:55
 */
/*
 * @
 * @Author: Yellow
 * @Date: 2020-01-13 14:43
 * @LastEditTime: 2020-03-02 17:25
 */
$(function () {
    //日记
    if (localStorage.getItem("noteData")) {
        $("#textarea").val(localStorage.getItem("noteData"))
    }

    var init_timer = ""
    if (localStorage.getItem("timer")) {
        init_timer = JSON.parse(localStorage.getItem("timer"))
    }

    var clock = {
        count: true,
        timer: null,
        set_clock: function (hour, minute) {
            let set_hour = parseInt(hour || init_timer.hour)
            let set_minute = parseInt(minute || init_timer.minute)
            this.timer = setInterval(() => {
                let date = new Date()
                h = parseInt(date.getHours()),
                    mm = parseInt(date.getMinutes());
                if (h == set_hour && mm == set_minute) {
                    if (localStorage.getItem("memorandum") && this.count) {
                        createNotify('备忘录', { body: localStorage.getItem("memorandum"), icon: 'static/img/clock.gif' })
                        this.count = false
                    }
                    if (h == 9) {
                        count = true
                    }
                }
            }, 1000)
        },
        clear_clock: function () {
            clearInterval(this.timer)
        }
    }

    //备忘录
    if (localStorage.getItem("memorandum")) {
        $(".memorandum_text").html(localStorage.getItem("memorandum"))
        clock.set_clock()
    } else {
        $(".memorandum_text").html("+ 添加")
    }

    //询问打开浏览器通知
    notifyMe()
    var timeout = null
    $("#textarea").on("focus", () => {
        resetSearch()
    }).bind('input propertychange', function () {

        if (timeout != null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            saveLocal()
        }, 500)

    });

    function resetSearch() {
        $("#search").val("")
        $("#selectTab").css("display", "none").attr("data-display", "none")
    }

    function saveLocal() {
        localStorage.setItem("noteData", $("#textarea").val())
    }
    $("#d_memorandum").click(() => {
        $("#d_memorandum").hide()
    })
    $(".d_textarea").click((e) => {
        e.stopPropagation();
    })
    $("#memorandum").click(() => {
        $("#d_memorandum").show()
        $("#noteTextarea").val(localStorage.getItem("memorandum"))
        var clock_timer = ""
        var is_setClock = false
        if (localStorage.getItem("timer")) {
            clock_timer = JSON.parse(localStorage.getItem("timer"))
            is_setClock = true
        }

        // $("#d_hour option[value='" + clock_timer.hour + "']").attr("selected", "selected");
        // $("#d_minute option[value='" + clock_timer.minute + "']").attr("selected", "selected");

        //时
        for (var i = 0; i < 24; i++) {
            if (i < 10) {
                if (is_setClock && clock_timer.hour == "0" + i) {
                    $("#d_hour").append(`<option value="0${i}" selected="selected">0${i}</option>`)
                } else {
                    $("#d_hour").append(`<option value="0${i}">0${i}</option>`)
                }
            } else {
                if (is_setClock && clock_timer.hour == i) {
                    $("#d_hour").append(`<option value="${i}" selected="selected">${i}</option>`)
                } else {
                    $("#d_hour").append(`<option value="${i}">${i}</option>`)
                }
            }
        }
        //分
        for (var i = 0; i < 60; i++) {
            if (i < 10) {
                if (is_setClock && clock_timer.minute == "0" + i) {
                    $("#d_minute").append(`<option value="0${i}" selected="selected">0${i}</option>`)
                } else {
                    $("#d_minute").append(`<option value="0${i}">0${i}</option>`)
                }
            } else {
                if (is_setClock && clock_timer.minute == i) {
                    $("#d_minute").append(`<option value="${i}" selected="selected">${i}</option>`)
                } else {
                    $("#d_minute").append(`<option value="${i}">${i}</option>`)
                }
            }
        }
    })
    $(".d_submit").click(() => {
        let value = $("#noteTextarea").val()
        if (value.trim()) {
            localStorage.setItem("memorandum", value)
            localStorage.setItem("timer", JSON.stringify({
                hour: $("#d_hour").val(),
                minute: $("#d_minute").val()
            }))
            $(".memorandum_text").html(value)
            $("#d_memorandum").hide()
            clock.set_clock($("#d_hour").val(), $("#d_minute").val())
        }
    })
    $(".d_clear").click(() => {
        $("#d_memorandum").hide()
        $(".memorandum_text").html("+ 添加")
        if (localStorage.getItem("memorandum")) {
            localStorage.removeItem("memorandum")
        }
        clock.clear_clock()
    })

    function notifyMe() {
        // 先检查浏览器是否支持
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }
        // 检查用户是否同意接受通知
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            // var notification = new Notification("已打开气泡消息提醒");
        }

        // 否则我们需要向用户获取权限
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                // 如果用户同意，就可以向他们发送通知
                if (permission === "granted") {
                    var notification = new Notification("已打开气泡消息提醒");
                }
            });
        }
    }

    //推送浏览器消息
    function createNotify(title, options) {
        var notify = new Notification(title, options);
        //单击消息提示框，进入浏览器页面
        notify.onclick = function () {
            window.focus();
        }
    }
})
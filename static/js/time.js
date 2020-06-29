/*
 * @
 * @Author: Yellow
 * @Date: 2020-01-30 17:37
 * @LastEditTime : 2020-01-30 17:45
 */
(function () {
    let today = (new Date().getDate() + "")
    document.body.style.backgroundImage = `url(static/img/bg${today}.jpg)`
    setInterval(() => {
        var time = new Date(),
            mm = (time.getMinutes() + "").padStart(2, 0);
        if (mm == 59) {
            var min = 1;
            var max = 44;
            var radomNum = parseInt(Math.random() * (max - min + 1) + min, 10)
            document.body.style.backgroundImage = `url(static/img/bg${radomNum}.jpg)`
        }
    }, 59000);
})()
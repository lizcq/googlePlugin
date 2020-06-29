/*
 * @
 * @Author: Yellow
 * @Date: 2020-01-30 17:38
 * @LastEditTime : 2020-01-30 17:46
 */
(function () {
    let today = (new Date().getDate() + "")
    document.body.style.backgroundImage = `url(static/img/bg-helloKity${today}.jpg)`
    setInterval(() => {
        var time = new Date(),
            mm = (time.getMinutes() + "").padStart(2, 0);
        if (mm == 59) {
            var min = 1;
            var max = 44;
            var radomNum = parseInt(Math.random() * (max - min + 1) + min, 10)
            document.body.style.backgroundImage = `url(static/img/bg-helloKity${radomNum}.jpg)`
        }
    }, 59000);
})()
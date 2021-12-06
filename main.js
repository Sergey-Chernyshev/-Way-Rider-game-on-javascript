// переменные
let bResult = 0
let achivements = [0, 0, 0, 0, 0, 0, 0]
const money = 5
const backPack = ["url(../img/pustina.jpg)", "url(../img/les.jpg)", "url(../img/taiga.jpg)", "url(../img/zima.jpg)"]
const carPack = ["url(../img/car.png)", "url(../img/car1.png)", "url(../img/car5.png)"]
const mcar = document.querySelector(".car-m")
const car_1 = document.querySelector(".car-1")
const car_2 = document.querySelector(".car-2")
const moneyBlock = document.querySelector(".money")
const polsPAckL = ["260px", "420px"]
const polsPAckR = ["600px", "770px"]

const main__window = document.querySelector(".main__window")
const but_start = document.querySelector(".m_start")


const game__window = document.querySelector(".game__window")
const back1 = document.querySelector(".bac-img1")
const back2 = document.querySelector(".bac-img2")

// game
but_start.addEventListener("click", () => {
    if (document.querySelector("#i-username").value.trim() != "") {
        startGame()
    }
});

startGame = function() {
    // РАССТАВЛЯЕМ ВСЕ ПО МЕСТАМ НАЧАЛЬНЫМ  
    back1.style.top = "0px"
    back2.style.top = "-600px"
    back1.style.backgroundImage = "url(../img/pustina.jpg)"
    back2.style.backgroundImage = "url(../img/pustina.jpg)"
    
    mcar.style.top = "400px"
    mcar.style.left = "700px"
    let rand = getRandom()[0]
    moneyBlock.style.left = rand+"px";
    moneyBlock.style.top = "-100px";
    // dr carws
    car_1.style.top = "-200px"
    car_1.style.left = polsPAckR[getRandom()[1]-1]
    car_2.style.top = "-150px"
    car_2.style.left = polsPAckL[getRandom()[1]-1]


    main__window.style.display = 'none';
    game__window.style.display = 'block';


    let moneyCount = 0
    lastAd = -10
    function goBack() {
        back2.style.top = back2.offsetTop + 2 +"px";
        back1.style.top = back1.offsetTop + 2 +"px";
        moneyBlock.style.top = moneyBlock.offsetTop + 2 +"px";
        if (parseInt(back1.style.top) >= 600) {
            back1.style.top = "-600px"
        }
        if (parseInt(back2.style.top) >= 600) {
            back2.style.top = "-600px"
        }


        // money ;check
        let xM = moneyBlock.getBoundingClientRect()
        let xC = mcar.getBoundingClientRect()
        if (xM.y+xM.height >= xC.y && xM.x+xM.width >= xC.x && !(xC.y+xC.height <= xM.y) && !(xC.x+xC.width <= xM.x)) {

            if (a - lastAd > 2) {
                moneyCount = moneyCount+money
                document.querySelector('.g-money').innerText = moneyCount
                lastAd = a
                
            }
        }
        if (parseInt(moneyBlock.style.top) == 600) {
            moneyBlock.style.top = "-100px"
            let rand = getRandom()[0]
            moneyBlock.style.left = rand+"px";
        }


        // cars
        car_1.style.top = car_1.offsetTop + getRandom()[3] +"px";
        car_2.style.top = car_2.offsetTop + getRandom()[2] +"px";
        if (parseInt(car_1.style.top) >= 600) {
            car_1.style.top = "-200px"
            car_1.style.backgroundImage = carPack[getRandom()[4]]
        }
        if (parseInt(car_2.style.top) >= 600) {
            car_2.style.top = "-150px"
            car_2.style.backgroundImage = carPack[getRandom()[4]]
        }
        cM_1 = car_1.getBoundingClientRect()
        cM_2 = car_2.getBoundingClientRect()
        if (cM_1.y+cM_1.height >= xC.y && cM_1.x+cM_1.width >= xC.x && !(xC.y+xC.height <= cM_1.y) && !(xC.x+xC.width <= cM_1.x)) {
            stop()
        }
        if (cM_2.y+cM_1.height >= xC.y && cM_2.x+cM_2.width >= xC.x && !(xC.y+xC.height <= cM_2.y) && !(xC.x+xC.width <= cM_2.x)) {
            stop()
        }
    }


    function stop() {
        clearInterval(timer)
        clearInterval(goB)
        document.removeEventListener("keydown", keyevent)
        main__window.style.display = 'block';
        game__window.style.display = 'none';
    }

    sec()
    let a = 0
    let b = 0
    let backN = 0
    function sec() {
        timer = setInterval(() => {
            a++
            let s, ch
            s = a%60
            ch = '0' + Math.round(a/60)
            if (a%60 < 10) {
                s = '0' + a%60
            }
            if (Math.round(a/60) < 10) {
                ch = '0' + Math.round(a/60)
            }
            if (s%30 == 0) {
                backN++
                if (backN>3) {
                    backN = 0
                }
                back1.style.backgroundImage = backPack[backN]
                back2.style.backgroundImage = backPack[backN]
                console.log("СМЕНА ФОНА", backN)
            }
            
            document.querySelector('.g-timer').innerText = ch+':'+s
            document.querySelector('.g-ochk').innerText = a
        }, 1000);
    }




    function getRandom() {
        // money
        const LMmax = 800;
        const LMmin = 230;

        // cars встречка
        const minP = 1
        const maxP = 2
        const maxSpeed = 4
        const minSpeed = 2.5
        // cars вмоей полосе
        const maxSpeed2 = 0.5
        const minSpeed2 = 1
        // Отбойник
        const min = 0
        const max = 2
        let rand = [Math.floor(Math.random() * (LMmax - LMmin + 1))+ LMmin,
                    Math.floor(Math.random() * (maxP - minP + 1))+ minP, 
                    Math.random() * (maxSpeed - minSpeed + 1)+ minSpeed,
                    Math.random() * (maxSpeed2 - minSpeed2 + 1) + minSpeed2,
                    Math.floor(Math.random() * (max- min + 1))+ min]
        return rand
    }


    // main controller
    var goB = setInterval(goBack, 10, back1, back2);

    // управление машиной
    let keyevent = function (e) {
        // 68 - d
        // 65 - a
        if (e.keyCode == 68 & parseInt(mcar.offsetLeft)<=820) {
            mcar.style.left = mcar.offsetLeft + 5 +"px";
        }
        if (e.keyCode == 65 & parseInt(mcar.offsetLeft)>=205) {
            mcar.style.left = mcar.offsetLeft - 5 +"px";
        }
    };
    document.addEventListener("keydown", keyevent)

    
}





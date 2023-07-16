// const colorRed = 0;
// const colorGreen = 85;
// const colorBlue = 171;
// const colorAqua = 128;
// import {drawRisovalkaa} from "./scriptrus"
import {drawRisovalkaa} from "./scriptrus"
const colorRed = [255, 0, 0];
const colorGreen = [0, 128, 0];
const colorBlue = [0, 0, 255];
const colorAqua = [0, 255, 255];

const url = 'http://192.168.1.1';
const pageContent = document.getElementById("pageContent");
const size = 16;
const slNum = 9;
const colorPointedSavedPlot = "aqua";
const  perlParam = {
    0: 8,
    1: 20,
    2: 100,
    3: 100,
    4: 65000,
    5: 65000,
    6: 8,
    7: 5000,
    8: 5000,
}
const perlVal = {
    0: 1,
    1: 3,
    2: 1,
    3: 11,
    4: 57771,
    5: 57771,
    6: 1,
    7: 331,
    8: 1111,
}
const perlMas = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
};
const valueNames = ["octaves", "hue_octaves", "hue_speed", "time_speed", "xscale", "yscale", "hue_scale", "x_speed", "y_speed"]

const data = {
    x: 0,
    y: 0,
    pole: Array.from({ length: size }, () => Array.from({ length: size }, () => {
        return "green";
    }))
};

function snakeButtons() {
    let divBut = document.createElement("div");
    divBut.id = "buttons";
    divBut.className = "buttons";
    pageContent.appendChild(divBut);
    let butL = document.createElement("button");
    butL.id = "left";
    butL.className = "button";
    butL.innerText = "Left";
    divBut.appendChild(butL);
    let divVert = document.createElement("div");
    divVert.className = "vertical";
    divBut.appendChild(divVert);
    let butUp = document.createElement("button");
    butUp.id = "up";
    butUp.className = "button";
    butUp.innerText = "Up";
    divVert.appendChild(butUp)
    let butDown = document.createElement("button");
    butDown.id = "down";
    butDown.className = "button";
    butDown.innerText = "Down";
    divVert.appendChild(butDown);
    let butRight = document.createElement("button");
    butRight.id = "right";
    butRight.className = "button";
    butRight.innerText = "Right";
    divBut.appendChild(butRight);
}

function coloringPage() {
    let divColPage = document.createElement("div");
    divColPage.class = "colPage";
    pageContent.appendChild(divColPage);
    let divIzb = document.createElement("div");
    divIzb.className = "stroka";
    divIzb.id = "izb";
    divColPage.appendChild(divIzb);
    let divDisp = document.createElement("div");
    divDisp.className = "disp";
    divDisp.id = "disp";
    divColPage.appendChild(divDisp);
    let divColBut1 = document.createElement("div");
    divColBut1.className = "colBut1";
    divColBut1.id = "colBut1";
    divColPage.appendChild(divColBut1);
    let divColBut2 = document.createElement("div");
    divColBut2.id = "colBut2";
    divColBut2.className = "colBut1";
    let divPole = document.createElement("div");
    divPole.className = "pole";
    divPole.id = "pole";
    pageContent.appendChild(divPole);
    divColPage.appendChild(divColBut2);
    let but1 = document.createElement("button");
    but1.id = "bt1";
    but1.className = "r";
    but1.innerText = "Красный +";
    divColBut1.appendChild(but1);
    let but2 = document.createElement("button");
    but2.id = "bt2";
    but2.className = "g";
    but2.innerText = "Зелёный +";
    divColBut1.appendChild(but2);
    let but3 = document.createElement("button");
    but3.id = "bt3";
    but3.className = "b";
    but3.innerText = "Синий +";
    divColBut1.appendChild(but3);
    let but4 = document.createElement("button");
    but4.id = "bt4";
    but4.innerText = "Случайный";
    divColBut1.appendChild(but4);
    let but11 = document.createElement("button");
    but11.id = "bt11";
    but11.className = "r";
    but11.innerText = "Красный -";
    divColBut2.appendChild(but11);
    let but22 = document.createElement("button");
    but22.id = "bt22";
    but22.className = "g";
    but22.innerText = "Зелёный -";
    divColBut2.appendChild(but22);
    let but33 = document.createElement("button");
    but33.id = "bt33";
    but33.className = "b";
    but33.innerText = "Синий -";
    divColBut2.appendChild(but33);
    let but44 = document.createElement("button");
    but44.id = "bt44";
    but44.innerText = "⭐";
    divColBut2.appendChild(but44);


    // console.log("aafafaf");
    // let div3 = document.createElement("div");
    // div3.id = "allSquares";
    // div3.className = "allSquares";
    // pageContent.appendChild(div3);
    // for (let j = 0; j < size; j++) {
    //     let div2 = document.createElement("div")
    //     div2.id = "squares";
    //     div2.className = "squares";
    //     div3.appendChild(div2)
    //     console.log("uwu")
    //     for (let i = 0; i < size; i++) {
    //         let div = document.createElement("div");
    //         div.id = reverseIdFromXY(i, j);
    //         div.className = "mainSquare";
    //         div.style.background = "green";
    //         div2.appendChild(div);
    //         let div1 = document.createElement("img");
    //         div1.className = "green-frog";
    //         div1.src = "./green-frog.svg";
    //         div1.style.transform = "scale(0.1)"
    //         div1.style.filter = "hue-rotate(180deg)"
    //         div.appendChild(div1);
    //     }
    // } прошлое (уже не нужно)
}

function createSliderWithValue(min, max, value, step, id, outId, inText) {
    let divInp = document.getElementById("inputs");
    let inpDiv = document.createElement("div");
    inpDiv.className = "inp+p";
    inpDiv.id = "inp+p";
    divInp.appendChild(inpDiv);
    let inp = document.createElement("input");
    inp.type = "range";
    inp.id = id;
    inp.className = "input";
    inp.value = `${value}`;
    inp.min = `${min}`;
    inp.max = `${max}`;
    inp.step = `${step}`;
    inpDiv.appendChild(inp);
    let inpPar = document.createElement("p");
    inpPar.innerText = `${inText}: `;
    inpDiv.appendChild(inpPar);
    let out = document.createElement("output");
    out.id = outId;
    inpPar.appendChild(out);
}

function sliders() {
    let divInputs = document.createElement("div");
    divInputs.id = "inputs";
    divInputs.className = "inputs";
    pageContent.appendChild(divInputs);
    for (let p = 0; p < slNum; p++) {
        createSliderWithValue(0, perlParam[p], perlVal[p], 1, valueNames[p], `out${p}`, valueNames[p]);
    }
}

function KeyChecker(e) {
    let prevX = data.x;
    let prevY = data.y;
    if (e.code === "KeyW" || e.code === "ArrowUp") {
        console.log(e);
        data.y += 1;
        if (data.y === 16) {
            data.y = 0;
        }
        ColoringThePlot(prevX, prevY);
    } else if (e.code === "KeyD" || e.code === "ArrowRight") {
        console.log(e);
        data.x += 1;
        if (data.x === 16) {
            data.x = 0;
        }
        ColoringThePlot(prevX, prevY);
    } else if (e.code === "KeyS" || e.code === "ArrowDown") {
        console.log(e);
        data.y -= 1;
        if (data.y === -1) {
            data.y = 15;
        }
        ColoringThePlot(prevX, prevY);
    } else if (e.code === "KeyA" || e.code === "ArrowLeft") {
        console.log(e);
        data.x -= 1;
        if (data.x === -1) {
            data.x = 15;
        }
        ColoringThePlot(prevX, prevY);
    }
    if (e.code === "Space") {
        colorCancelSave()
    }
    display();
}

function ColoringThePlot(prevX, prevY) {
    if (data.pole[prevY][prevX] === colorPointedSavedPlot) {
        data.pole[prevY][prevX] = "blue";
    } else if (data.pole[prevY][prevX] !== "blue") {
        data.pole[prevY][prevX] = "green";
    }
    if (data.pole[data.y][data.x] === "blue") {
        data.pole[data.y][data.x] = colorPointedSavedPlot;
    } else {
        data.pole[data.y][data.x] = "red";
    }
}

function colorCancelSave() {
    if (data.pole[data.y][data.x] === colorPointedSavedPlot) {
        data.pole[data.y][data.x] = "green";
    } else {
        data.pole[data.y][data.x] = colorPointedSavedPlot;
    }
    fetchAsyncToDos(url + "/ledNetworkColoring", { "xCords": data.y, "yCords": data.x, "color": whatColor() })
}

function idFromXY(x, y) {
    return `${x + y * 16}`;
}

function reverseIdFromXY(x, y) {
    return `${255 - (x + y * 16)}`;
}

function display() {
    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            let plot = document.getElementById(idFromXY(i, j))
            plot.style.background = data.pole[j][i]
        }
    }
    fetchAsyncToDos(url + "/ledNetworkColoring", { "xCords": data.y, "yCords": data.x, "color": whatColor() })
}

function fetchAsyncToDos(url, body) {
    console.log('started...')
    const response = fetch(url, {
        mode: "no-cors", method: "POST", body: JSON.stringify(body)
    }).then((data) => {
        console.log(data);
    })
}

function whatColor() {
    if (data.pole[data.y][data.x] === "green") {
        return colorGreen;
    } else if (data.pole[data.y][data.x] === "blue") {
        return colorBlue;
    } else if (data.pole[data.y][data.x] === "red") {
        return colorRed;
    } else if (data.pole[data.y][data.x] === "aqua") {
        return colorAqua;
    }
}

function evtListSnake() {
    document.getElementById("up").addEventListener("click", function () {
        fetchAsyncToDos(url + "/ledUpon");
    });
    document.getElementById("left").addEventListener("click", function () {
        fetchAsyncToDos(url + "/ledLefton");
    });
    document.getElementById("right").addEventListener("click", function () {
        fetchAsyncToDos(url + "/ledRighton");
    });
    document.getElementById("down").addEventListener("click", function () {
        fetchAsyncToDos(url + "/ledDownon");
    });
}

function checkKeyPressed(e) {
    if (e.code == 'KeyW' || e.code == 'ArrowUp') {
        fetchAsyncToDos(url + "/ledUpon");
    } else if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        fetchAsyncToDos(url + "/ledLefton");
    } else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        fetchAsyncToDos(url + "/ledDownon");
    } else if (e.code === "KeyD" || e.code === "ArrowRight") {
        fetchAsyncToDos(url + "/ledRighton");
    }
}

function whatMode() {
    if (selValue === "snake") {
        return 0;
    } else if (selValue === "coloring") {
        return 1;
    } else if (selValue === "perlin") {
        return 2;
    }
}

function slMode(fieldName, val) {
    fetchAsyncToDos(url + "/ledNoise", { [fieldName]: val })
}
// function modeFetch() {
//     if selValue === "snake" {
//         let
//     }
// }

// document.getElementById("Change_mode").addEventListener("click", function () {
//     fetchAsyncToDos(url + "/ledChange_mode", { 'mode': modeNum });
//     modeNum = (modeNum + 1) % 3;
// });


let selValue = "snake";

snakeButtons();
evtListSnake();
document.addEventListener("keydown", checkKeyPressed, false);

const selection = document.getElementById("changer");
const content = document.getElementById("pageContent");

selection.addEventListener("change", () => {
    selValue = selection.value;
    console.log(selValue);
    fetchAsyncToDos(url + "/ledChangeMode", { "mode": whatMode() })
    if (selValue === "coloring") {
        while (content.firstChild) {
            content.removeChild(content.lastChild);
        }
        console.log("gwngoiw")
        coloringPage();
        data.pole[0][0] = "red";
        drawRisovalkaa();
        display();
    } else if (selValue === "snake") {
        while (content.firstChild) {
            content.removeChild(content.lastChild);
        }
        snakeButtons();
        evtListSnake();
        document.addEventListener("keydown", checkKeyPressed, false);
    } else if (selValue === "perlin") {
        while (content.firstChild) {
            content.removeChild(content.lastChild);
        }
        sliders();
        for (let u = 0; u < slNum; u++) {
            let val = document.getElementById(`out${u}`);
            let inp = document.getElementById(valueNames[u]);
            val.textContent = inp.value;
            inp.addEventListener("input", (e) => {
                val.textContent = e.target.value;
                perlMas[u] = parseInt(e.target.value)
            });
            inp.addEventListener("pointerup", () => {
                slMode(valueNames[u], perlMas[u])
            });
        };
    }
});

window.addEventListener("keydown", function (e) {
    console.log("ovjnoovna")
    if (selValue === "coloring") {
        console.log("awa")
        KeyChecker(e, data.x, data.y)
    }
})

const colorRed = 0;
const colorGreen = 85;
const colorBlue = 171;
const colorAqua = 128;

const url = 'http://192.168.1.1';
const pageContent = document.getElementById("pageContent");
const size = 16;
const slNum = 9;
const colorPointedSavedPlot = "aqua";
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
    console.log("aafafaf");
    let div3 = document.createElement("div");
    div3.id = "allSquares";
    div3.className = "allSquares";
    pageContent.appendChild(div3);
    for (let j = 0; j < size; j++) {
        let div2 = document.createElement("div")
        div2.id = "squares";
        div2.className = "squares";
        div3.appendChild(div2)
        console.log("uwu")
        for (let i = 0; i < size; i++) {
            let div = document.createElement("div");
            div.id = reverseIdFromXY(i, j);
            div.className = "mainSquare";
            div.style.background = "green";
            div2.appendChild(div);
            let div1 = document.createElement("img");
            div1.className = "green-frog";
            div1.src = "./green-frog.svg";
            div1.style.transform = "scale(0.1)"
            div1.style.filter = "hue-rotate(180deg)"
            div.appendChild(div1);
        }
    }
}

function createSliderWithValue(min, max, step, id, outId) {
    let divInp = document.getElementById("inputs");
    let inpDiv = document.createElement("div");
    inpDiv.className = "inp+p";
    inpDiv.id = "inp+p";
    divInp.appendChild(inpDiv);
    let inp = document.createElement("input");
    inp.type = "range";
    inp.id = id;
    inp.className = "input";
    inp.min = `${min}`;
    inp.max = `${max}`;
    inp.step = `${step}`;
    inpDiv.appendChild(inp);
    let inpPar = document.createElement("p");
    inpPar.innerText = "Value: ";
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
        createSliderWithValue(0, 100, 1, `inp${p}`, `out${p}`);
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
    } else if (data.pole[prevY][prevX] != "blue") {
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
        return 2;
    } else if (selValue === "perlina") {
        return 1;
    }
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
console.log(selValue);

snakeButtons();
evtListSnake();
document.addEventListener("keydown", checkKeyPressed, false);

const selection = document.getElementById("changer");
const content = document.getElementById("pageContent");

changer.addEventListener("change", () => {
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
        for (let u = 0; u < slNum; u ++) {
            let val = document.getElementById(`out${u}`);
            let inp = document.getElementById(`inp${u}`);
            val.textContent = inp.value;
            inp.addEventListener("input", (e) => {
                val.textContent = e.target.value;
                fetchAsyncToDos(url + "/ledNoise", { "mode": })
            });
        }
    }   
});

window.addEventListener("keydown", function (e) {
    console.log("ovjnoovna")
    if (selValue === "coloring") {
        console.log("awa")
        KeyChecker(e, data.x, data.y)
    }
})

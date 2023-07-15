

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function summa(k, f) {
    k = k + f
    if ((k == 256) || (k == -1)) {
        k = 255
    }
    return k;
}


function drob(v, f) {
    let r = parseInt(color.substring(1, 3), 16)
    let g = parseInt(color.substring(3, 5), 16)
    let b = parseInt(color.substring(5), 16)
    if (v == "r") {
        r = summa(r, f)
    }
    if (v == "g") {
        g = summa(g, f)
    }
    if (v == "b") {
        b = summa(b, f)
    }

    color = "#" + r.toString(16) + g.toString(16) + b.toString(16);

}
const led = function () {
    const disp = document.getElementById("disp");
    disp.textContent = document.body.style.background = color;
    bt4.style.background = prevColor;
}

function addClickListener(element, q, f) {
    element.addEventListener("click", (e) => {
        drob(q, f)
        led()
    })
}
function addWheelListener(element, q, f) {
    element.addEventListener("wheel", (e) => {
        e.stopPropagation();
        e.preventDefault();
        drob(q, f)
        led()
    })
}
function displayizb() {
    const izb = document.getElementById("izb")

    while (izb.lastChild) {
        izb.removeChild(izb.firstChild);
    }

    for (let g = 0; g < izbr.length; g++) {
        let a = izbr[g]
        const iz = document.createElement("div")
        iz.style.width = "95px"
        iz.style.height = "20px"
        iz.style.margin = "4px"
        iz.style.background = a
        iz.className = "center"
        iz.style.cursor = "pointer"
        iz.textContent = a
        const btnd = document.createElement("button")
        btnd.textContent = "✖"
        iz.appendChild(btnd);
        btnd.style.borderRadius = "50px";
        btnd.style.background = "gray"
        btnd.addEventListener("click", () => {
            izbr = izbr.filter(i => i !== a);
            displayizb();

        })
        iz.addEventListener("click", (cl) => {
            color = izbr[g]
            led()
        })
        izb.appendChild(iz)
        console.log(iz)
        iz.style.borderRadius = "20px";
    }


}

function knopkiplus() {
    const bt1 = document.getElementById("bt1")
    addClickListener(bt1, "r", 1)
    addWheelListener(bt1, "r", 1)
    const bt2 = document.getElementById("bt2")
    addClickListener(bt2, "g", 1)
    addWheelListener(bt2, "g", 1)
    const bt3 = document.getElementById("bt3")
    addClickListener(bt3, "b", 1)
    addWheelListener(bt3, "b", 1)
}
function knopkiminus() {
    const bt11 = document.getElementById("bt11")
    addClickListener(bt11, "r", -1)
    addWheelListener(bt11, "r", -1)
    const bt22 = document.getElementById("bt22")
    addClickListener(bt22, "g", -1)
    addWheelListener(bt22, "g", -1)
    const bt33 = document.getElementById("bt33")
    addClickListener(bt33, "b", -1)
    addWheelListener(bt33, "b", -1)
}



function element(wh, he, backgr, i, j) {
    const divAaa = document.createElement("div")
    divAaa.style.width = wh
    divAaa.style.height = he
    divAaa.style.background = backgr
    divAaa.style.margin = "4px";
    divAaa.style.cursor = 'pointer';
    divAaa.id = `${i}|${j}`;
    divAaa.addEventListener("click", function (e) {
        const coords = e.target.id.split('|');
        const x = coords[0];
        const y = coords[1];
        let r = parseInt(color.substring(1, 3), 16)
        let g = parseInt(color.substring(3, 5), 16)
        let b = parseInt(color.substring(5), 16)

        console.log(x, y)
        fetch("http://192.168.1.1/ledNetworkColoring", { method: "POST", mode: "no-cors", body: JSON.stringify({ xCords: 15 - y, yCords: 15 - x, r, g, b }) })


        divAaa.style.background = color
    })
    return divAaa
}


function stroka(x) {
    const stroka = document.createElement("div")
    stroka.className = "stroka"
    for (let i = 0; i < 16; i++) {
        stroka.appendChild(element("20px", "20px", "white", x, i))
    }
    return stroka

}

let color = getRandomColor();
let prevColor = color;
let izbr = [];
// ################################

export function drawRisovalkaa() {
    const bt4 = document.getElementById("bt4")
    bt4.addEventListener("click", (e) => {
        prevColor = color;
        bt4.style.borderRadius = "20px";
        color = getRandomColor();
        led()
    })
    const bt44 = document.getElementById("bt44")
    bt44.addEventListener("click", (e) => {
        if (izbr.includes(color) == false) {
            izbr.push(color);
            displayizb()
        }
    })

    for (let t = 0; t < 16; t++) {
        document.getElementById("pole").appendChild(stroka(t))
    }

    knopkiplus()
    knopkiminus()
}


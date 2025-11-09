let lc = 0;
let rc = 0;
let tc = 0;
let tlc = 0;
let radioGroupCounter = 0;
const radioGroups = []

function range(text, min, max) {
    const div = document.createElement("div");

    const p = document.createElement("p")
    const t = document.createTextNode(text)
    p.appendChild(t)

    const r = document.createElement("input");
    r.type = "range";
    r.min = min;
    r.max = max;
    const rId = "range" + rc++;
    r.id = rId;

    const l = document.createElement("label");
    const lId = "label" + lc++;
    l.id = lId;
    l.for = rId

    div.appendChild(p);
    div.appendChild(r);
    div.appendChild(l);

    const body = document.querySelector("body");
    body.appendChild(div);

    document.getElementById(lId).innerText = document.getElementById(rId).value

    document.getElementById(rId).addEventListener("input", () => {
        document.getElementById(lId).innerText = document.getElementById(rId).value;
    });
}

function checkbox(text,cb) {
    const div = document.createElement("div");
    const d = document.createElement("div")

    for (let i = 0; i < cb.length; i++) {
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.value = cb[i][1]
        checkbox.id = cb[0] + i

        const label = document.createElement("label")
        const label_t = document.createTextNode(cb[i][0])
        label.appendChild(label_t)
        label.for = cb[0] + i

        d.appendChild(checkbox)
        d.appendChild(label)
        d.appendChild(document.createElement("br"))
    }

    const p = document.createElement("p");
    const t = document.createTextNode(text);
    p.appendChild(t);

    div.appendChild(p)
    div.appendChild(d)

    const body = document.querySelector("body");
    body.appendChild(div);
}

function radio(text,r) {
    const div = document.createElement("div");
    const d = document.createElement("div")

    const groupName = "radioGroup" + radioGroupCounter++;
    radioGroups.push(groupName)
    for (let i = 0; i < r.length; i++) {
        const checkbox = document.createElement("input")
        checkbox.type = "radio"
        checkbox.value = r[i][1]
        checkbox.id = r[0] + i
        checkbox.name = groupName;

        const label = document.createElement("label")
        const label_t = document.createTextNode(r[i][0])
        label.appendChild(label_t)
        label.for = r[0] + i

        d.appendChild(checkbox)
        d.appendChild(label)
        d.appendChild(document.createElement("br"))
    }

    const p = document.createElement("p");
    const t = document.createTextNode(text);
    p.appendChild(t);

    div.appendChild(p)
    div.appendChild(d)

    const body = document.querySelector("body");
    body.appendChild(div);
}

function result_button(text,percentages) {
    const div = document.createElement("div")
    const button = document.createElement("button")
    const t = document.createTextNode(text)
    button.appendChild(t)
    button.addEventListener("click",()=>{result(percentages)})
    div.appendChild(button)
    
    const body = document.querySelector("body");
    body.appendChild(div);
}

function result(percentages) {
    let value = 0
    let max_value = 0

    const ranges = document.querySelectorAll("input[type=range]")
    for (let i = 0; i < ranges.length; i++) {
        value += Number(ranges[i].value - ranges[i].min)
    }
    for (let i = 0; i < ranges.length; i++) {
        max_value += Number(ranges[i].max - ranges[i].min)
    }

    const checkboxes = document.querySelectorAll("input[type=checkbox]:checked")
    for (let i = 0; i < checkboxes.length; i++) {
        value += Number(checkboxes[i].value)
    }
    const checkboxes_all = document.querySelectorAll("input[type=checkbox]")
    for (let i = 0; i < checkboxes_all.length; i++) {
        max_value += Number(checkboxes_all[i].value)
    }

    let radios = document.querySelectorAll("input[type=radio]:checked")
    for (let i = 0; i < radios.length; i++) {
        value += Number(radios[i].value)
    }

    for (let i = 0; i < radioGroups.length;i++) {
        const radio_group = document.querySelectorAll("input[type=radio][name=" + radioGroups[i] + "]")
        let highest_radio = 0
        for (let j = 0;j < radio_group.length;j++) {
            if (Number(radio_group[j].value) > highest_radio) {
                highest_radio = Number(radio_group[j].value)
            }
        }
        max_value += highest_radio
    }

    for (let i = 0; i < percentages.length; i++) {
        percentages[i][1] = percentages[i][1] / 100
    }

    const percentage = value / max_value
    let nearest_percentage = percentages[0];
    let min_diff = Math.abs(percentage - percentages[0][0]);

    for (let i = 1; i < percentages.length; i++) {
        const diff = Math.abs(percentage - percentages[i][0]);
        if (diff < min_diff) {
            min_diff = diff;
            nearest_percentage = percentages[i];
        }
    }

    const body = document.querySelector("body");
    
    body.innerHTML = "<div class='result-container'>" + nearest_percentage[1] + "</div>"
}

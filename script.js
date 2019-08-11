const attackSlots = document.getElementById("attackSlots")
const defenseSlots = document.getElementById("defenseSlots")
const audio = new Audio("RATTLE1.wav")
var aSlots = 0
var dSlots = 0
var dices = []

function removeSlot(target) {
    reset()
    if (target == attackSlots) {
        if (aSlots > 1) {
            aSlots -= 1
            attackSlots.removeChild(attackSlots.childNodes[aSlots])
        }
        
        document.getElementById("attackPanel").childNodes[5].style.opacity = aSlots == 1 ? .5 : 1
        document.getElementById("attackPanel").childNodes[7].style.opacity = 1
    } else {
        if (dSlots > 1) {
            dSlots -= 1
            defenseSlots.removeChild(defenseSlots.childNodes[dSlots])
        }
        
        document.getElementById("defensePanel").childNodes[5].style.opacity = dSlots == 1 ? .5 : 1
        document.getElementById("defensePanel").childNodes[7].style.opacity = 1
    }
}

function addSlot(target) {
    reset()
    let slot = document.createElement("span")
    slot.className = "slot"
    
    if (target == attackSlots) {
        if (aSlots < 3) {
            aSlots += 1
            slot.id = `aSlot${aSlots}`
            attackSlots.appendChild(slot)
        }

        document.getElementById("attackPanel").childNodes[5].style.opacity = aSlots == 1 ? .5 : 1 /* necessário para ficar opaco ao carregar página */
        document.getElementById("attackPanel").childNodes[7].style.opacity = aSlots == 3 ? .5 : 1
    } else {
        if (dSlots < 3) {
            dSlots += 1
            slot.id = `dSlot${dSlots}`
            defenseSlots.appendChild(slot)
        }

        document.getElementById("defensePanel").childNodes[5].style.opacity = dSlots == 1 ? .5 : 1 /* necessário para ficar opaco ao carregar página */
        document.getElementById("defensePanel").childNodes[7].style.opacity = dSlots == 3 ? .5 : 1
    }
}

function rollDices() {
    audio.play()
    reset()
    dices = [[], []]
    let targetSlots = attackSlots

    setTimeout(() => {
        for (i = 0; i < 2; i++) {

            targetSlots.childNodes.forEach(slot => {
                dices[i].push(generateNumber())
            })
            dices[i].sort().reverse()
            
            for (j = 0; j < targetSlots.childElementCount; j++) {
                targetSlots.childNodes[j].innerText = dices[i][j]
            }
            targetSlots = defenseSlots
        }
    
        compareDices()
    }, 800)
}

function generateNumber() {
    return Math.floor(Math.random() * (7 - 1) + 1)
}

function compareDices() {
    let shorterLength = dices[0].length <= dices[1].length ? dices[0].length : dices[1].length

    for (i = 0; i < shorterLength; i++) {
        if (dices[0][i] > dices[1][i]) {
            document.getElementById(`aSlot${i+1}`).style.backgroundColor = "rgb(0, 255, 0, 0.8)"
            document.getElementById(`dSlot${i+1}`).style.backgroundColor = "rgb(255, 0, 0, 0.8)"
        } else {
            document.getElementById(`aSlot${i+1}`).style.backgroundColor = "rgb(255, 0, 0, 0.8)"
            document.getElementById(`dSlot${i+1}`).style.backgroundColor = "rgb(0, 255, 0, 0.8)"
        }
    }
}

function reset() {
    document.getElementById("attackSlots").childNodes.forEach(slot => 
        slot.style.backgroundColor = "rgb(0,0,0,0)")
    document.getElementById("defenseSlots").childNodes.forEach(slot => 
        slot.style.backgroundColor = "rgb(0,0,0,0)")
}
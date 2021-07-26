// Setup 'tick' sound
const tick = new Audio('sounds/tick.mp3');
const tock = new Audio('sounds/tock.mp3');
const kickDrumSound = new Audio('sounds/kick-drum.mp3');
const snareDrumSound = new Audio('sounds/snare-drum.mp3');
const hiHatSound = new Audio('sounds/hi-hat.mp3');
const instSelect = $('input[type="checkbox"]');
const counter = $('.counter');
const kickNums = $('.kickdrum-number input[type="radio"]');
const snareNums = $('.snaredrum-number input[type="radio"]');
const hiNums = $('.hihat-number input[type="radio"]');
const metronome = $('#metronome')

let count = 1
let kickDrum = 0
let snareDrum = 0
let hiHat = 0
let metronomeCheck = false
// This function is called every 600ms
function update() {
    // Play the 'tick' sound
    if(count <4){
        if(metronomeCheck === true){
            tick.play();
        }
        counter.text(`${count}`)
        soundPlayer(count)
        count++
    }
    // Play the 'tock' sound
    else if (count === 4){
        if(metronomeCheck === true){
            tock.play()
        }
        counter.text(`${count}`)
        soundPlayer(count)
        count = 1
        // console.log('tock')
    }
    let arrayInst = []
    for(let inst of instSelect){
        if(inst.checked){
            if(inst.value === "kickDrum"){
                let match = false
                match = arrayCheck(inst.value)
                if(match === false){
                    arrayInst.push(inst.value)
                }
                for(let kick of kickNums){
                    if(kick.checked){
                        kickDrum = Number(kick.value)
                    }
                }
            }
            if(inst.value === "snareDrum"){
                let match = false
                match = arrayCheck(inst.value)
                if(match === false){
                    arrayInst.push(inst.value)
                }
                for(let snare of snareNums){
                    if(snare.checked){
                        snareDrum = Number(snare.value)
                    }
                }
            }
            if(inst.value === "hiHat"){
                let match = false
                match = arrayCheck(inst.value)
                if(match === false){
                    arrayInst.push(inst.value)
                }
                for(let hi of hiNums){
                    if(hi.checked){
                        hiHat = Number(hi.value)
                    }
                }
            }

            function arrayCheck(val){
                for( list of arrayInst){
                    if(list === val){
                        return true
                    }
                }
                return false
            }

        }
    }
    // check for unckecks
    if(jQuery.inArray('kickDrum', arrayInst) == -1){
        kickDrum = 0
    }
    if(jQuery.inArray('snareDrum', arrayInst) == -1){
        snareDrum = 0
    }
    if(jQuery.inArray('hiHat', arrayInst) == -1){
        hiHat = 0
    }
}
metronome.on('click', function(){
    metronomeCheck = !metronomeCheck
})

function soundPlayer(n){
    if(kickDrum === n){
        kickDrumSound.play()
    }
    if(snareDrum === n){
        snareDrumSound.play()
    }
    if(hiHat === n){
        hiHatSound.play()
    }
}

// This function sets up update() to be called every 600ms
function setupUpdate() {
    setInterval(update, 600);
}

// Call setupUpdate() once after 300ms
setTimeout(setupUpdate, 300);

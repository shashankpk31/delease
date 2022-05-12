const onNext1 = () => {
    document.getElementById('ownerform').style.display = "none"
    document.getElementById('companyform').style.display = "flex"
}

const onNext2 = () => {
    document.getElementById('companyform').style.display = "none"
    document.getElementById('parcelform').style.display = "flex"
}

document.getElementById("Oaadhar").addEventListener('change',()=>{
    const fr = new FileReader()
    const file = document.getElementById("Oaadhar").files[0]
    fr.readAsArrayBuffer(file)
    fr.onload = function () {
      const blob = new Blob([fr.result])
      const url = URL.createObjectURL(blob, { type: "image/png" });
      document.getElementById("Oaadharimg").value=url
      console.log(url);
    }
})

fetch('http://localhost:3000/data/data.json')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < document.getElementsByClassName("State").length; i++) {
            let temp = "<option value='select state'>select state</option>"
            data.states.forEach(element => {
                temp += `<option value="${element.state}">${element.state}</option>`
            });
            document.getElementsByClassName("State")[i].innerHTML = temp
            document.getElementsByClassName("State")[i].addEventListener('change', () => {
                let state = document.getElementsByClassName("State")[i].value
                const index = data.states.map((e) => { return e.state; }).indexOf(state);
                temp = "<option value='select district'>select district</option>";
                data.states[index].districts.forEach(element => {
                    temp += `<option value="${element}">${element}</option>`
                });
                document.getElementsByClassName("District")[i].innerHTML = temp
            })
        }
    })
    .catch(error => console.log(error));

    var pins = [];
    const Maxpin = 20;
    let remainpin = document.getElementById("remain");
    let pinString = document.getElementById("pin");
    let removebtn = document.getElementById("remove");
    let addpin = document.getElementById("addpin");
    let pincontainer = document.getElementById("parentpin")
    remainpin.innerText = Maxpin;
    function remove(element, pin) {
        let index = pins.indexOf(pin);
        pins.splice(index,1);
        element.parentElement.remove();
        remainpin.innerText = parseInt(remainpin.innerText)+1;
        document.getElementById("allpin").value=pins;
    }
    addpin.addEventListener('click', () => {
        if (pinString.value.length >= 1) {
            temp=pinString.value.split(",").map(function(item) {
                return parseInt(item);
            });
            pins =pins.concat(temp);
            pinString.value = ""
            remainpin.innerText = Maxpin - pins.length;
            pincontainer.querySelectorAll("li").forEach((li) => li.remove());
            pins.forEach((pin) => {
                let lipin = `<li class="btn btn-info">${pin}<i class="fa fa-times" onclick="remove(this, '${pin}')"></i></li>`;
                pincontainer.insertAdjacentHTML("afterbegin", lipin);
            })
        }
        document.getElementById("allpin").value=pins;
    })
    removebtn.addEventListener('click', () => {
        pins = []
        pincontainer.querySelectorAll("li").forEach((li) => li.remove());
        remainpin.innerText = Maxpin;
    })

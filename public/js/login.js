const onMenu=(checkbox)=>{
    if(checkbox.checked == true){
        document.getElementById("navhead").style.left=0
        document.querySelectorAll(".checkbtn i")[0].classList.toggle("fa-times")
        document.querySelectorAll(".checkbtn i")[0].classList.toggle("fa-bars")
    }else{
        document.getElementById("navhead").style.left = "-100%"
        document.querySelectorAll(".checkbtn i")[0].classList.toggle("fa-bars")
        document.querySelectorAll(".checkbtn i")[0].classList.toggle("fa-times")
   }
}
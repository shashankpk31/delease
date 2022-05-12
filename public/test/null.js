const parentPincode=document.querySelector("#pincodeul")
        const Pincode=document.querySelector("#inputpincode")
        const pincodeDetail=document.querySelector(".details span");
        let pincodeArray=[]
        const maxPincode=20;
        const countPin=()=>{
          pincodeDetail.innerText=maxPincode-pincodeArray.length
        }
        const remove=(i)=>{
          console.log(i)
          //pincodeArray.splice(pincodeArray.indexOf(i), 1);
        }
        const AddPin=document.getElementById('addpin')
        AddPin.addEventListener('click',(e)=>{
          pincodeArray.push(...Pincode.value.split(','))
          parentPincode.innerHTML=`<input type="text" id="inputpincode" />`
          let lipin=""
          for(let i=0;i<pincodeArray.length;i++)
          {
            lipin+=`<li>${pincodeArray[i]} <i class="fa fa-times" onclick="remove(${pincodeArray[i]})"></i></li>`;
          }
          parentPincode.insertAdjacentHTML("afterbegin",lipin);
          console.log(lipin)
          countPin()
        })
        const RemoveAll=document.getElementById("removeall")
        RemoveAll.addEventListener('click',(e)=>{
          pincodeArray=[]
          Pincode.value=""
          parentPincode.innerHTML=`<input type="text" id="inputpincode" />`
         countPin()
        })
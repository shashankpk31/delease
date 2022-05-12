
const addOrder = () => {
  document.getElementById("addOrder").style.display = "flex"
  document.getElementById("dash").style.display = "none"
}

let items = []
let itemcontainer = document.getElementById("items")
const remove = (ele, index) => {
  items.splice(index, 1);
  ele.parentElement.remove();
  document.getElementById("OrdItems").value = JSON.stringify(items);
  console.log(JSON.stringify(items));
}
document.getElementById("addItem").addEventListener('click', () => {
  let itemName = document.getElementById("itemName").value
  let itemPhoto = document.getElementById("itemPhoto").files[0]
  let itemWeight = document.getElementById("itemWeight").value
  let itemValue = document.getElementById("itemValue").value
  console.log(items);
  items.push({
    itemName,
    itemPhoto,
    itemWeight,
    itemValue
  })
  itemcontainer.querySelectorAll(".item-cont").forEach((li) => li.remove());
  items.forEach((item) => {
    let index = items.indexOf(item);
    let liitem = `<div class="item-cont">
        <div class="item-data">
        <img src=${URL.createObjectURL(item.itemPhoto)} alt="" srcset="" >
          <div class="item-desc">
            <li>Item Name:${item.itemName}</li>
            <li>Item Amount:${item.itemValue}</li>
            <li>Item Weight:${item.itemWeight}</li>
          </div>
        </div>
        <i class='bx bx-x remove' onclick="remove(this,${index})"></i>
      </div>`;
    itemcontainer.insertAdjacentHTML("afterbegin", liitem);
  })
  document.getElementById("OrdItems").value = JSON.stringify(items);

})
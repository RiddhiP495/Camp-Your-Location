
let AllJsonData;


async function fetchJsonDataFromCampsites() {
    const response = await fetch("../campsites.json");
    return await response.json();
}

(async function() {
    let json = await fetchJsonDataFromCampsites();
    let AllEquipmentArray = [];
    let OptionLay = `<option value="All" selected>Show All</option>`;
    for (let _id in json) {
        AllEquipmentArray.push(json[_id].equipment)
    }
    let UniqueEquipmentArray = [].concat.apply([], AllEquipmentArray).filter((v, i, a) => a.indexOf(v) === i);
    for (let a = 0; a < UniqueEquipmentArray.length; a++) {
        OptionLay += `<option value="` + UniqueEquipmentArray[a] + `">` + UniqueEquipmentArray[a] + `</option>`;
        console.log(UniqueEquipmentArray[a]);
    }
    document.getElementById('equipment-type').innerHTML = OptionLay;

})();

var NextOne = () => {
    let SelectedEquipment = document.getElementById('equipment-type').value;
    let TotalNights = document.getElementById('nights').value;

    if (SelectedEquipment === "All"){
        Selectdata = "Single Tent";
    }else{
        Selectdata = SelectedEquipment;
    }
    localStorage.setItem("Equipment" , Selectdata);

    localStorage.setItem("TotalNights" , TotalNights);
    window.location = 'reserveSite.html';
}
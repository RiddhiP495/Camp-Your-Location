let SiteNumber = localStorage.getItem("SiteNumber");
let Username = localStorage.getItem('Username');
let UserEmail = localStorage.getItem('UserEmail');
let TotalNight = localStorage.getItem('TotalNight');
const reservationRandom = document.querySelector("#reservation-random")
const totalDiv = document.querySelector("#total")

console.log({SiteNumber})
document.getElementById('Name').innerHTML = Username;
document.getElementById('Email').innerHTML = UserEmail;
document.getElementById('Nights').innerHTML = TotalNight;

const generateRandom = () => {
    let random = Math.floor((Math.random() * 10000) + 1)
    reservationRandom.innerHTML = `
    <h2>Reservation #RES-${random}</h2>
    `
}

(async function () {
    let AllJsonData = await fetchJsonDataFromCampsites();
    let SelectedEquipment = localStorage.getItem('Equipment');
    let TotalNights = localStorage.getItem('TotalNights');
    console.log({SelectedEquipment, TotalNights, AllJsonData});

    let hasPower = false;
    let isPremium = false;
    let isRadioFree = false;

    for (let _id in AllJsonData) {
        console.log("this is site " + SiteNumber)

        if (AllJsonData[_id].siteNumber == SiteNumber) {
            hasPower = AllJsonData[_id].hasPower;
            isPremium = AllJsonData[_id].isPremium;
            isRadioFree = AllJsonData[_id].isRadioFree;
        }
        ;
    }

    let PerNightFare = 47.50;
    let ExtraChargePercentage = 0;
    let ExtraChargeDollor = 0;

    if (isPremium) {
        ExtraChargePercentage = 20;
    }
    if (hasPower) {
        ExtraChargeDollor = 5;
    }

    if (isPremium && hasPower) {
        ExtraChargePercentage = 20;
        ExtraChargeDollor = 5;
    }

    let SubTotal = PerNightFare * TotalNight;
    let Tax = (SubTotal / 100 * ExtraChargePercentage) + (ExtraChargeDollor*TotalNight);
    let Total = SubTotal + Tax;

    totalDiv.innerHTML = `
    <p class="detail">Subtotal:$${SubTotal.toFixed(2)}</p>
	<p class="detail">Tax:$${Tax.toFixed(2)}</p>
	<p class="detail">Total:$${Total.toFixed(2)}</p>`

})();

generateRandom()

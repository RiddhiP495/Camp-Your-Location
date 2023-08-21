const openPage = (pageName) => {
    var i, tabcontent
    tabcontent = document.getElementsByClassName("tabcontent")
    for(i=0; i< tabcontent.length; i++){
        tabcontent[i].style.display = "none"
    }
    document.getElementById(pageName).style.display = "block"
}

    openPage('choose-a-site');
    FilterByEquipment = (ele) =>{
        if (ele.value === "All"){
            Selectdata = "Single Tent";
        }else{
            Selectdata = ele.value;
        }
        localStorage.setItem("Equipment" , Selectdata);
        location.reload();
 }

    (async function () {
        let AllJsonData = await fetchJsonDataFromCampsites();
        let SelectedEquipment = localStorage.getItem('Equipment');
        let TotalNights = localStorage.getItem('TotalNights');
        let SiteNumber = localStorage.getItem("SiteNumber")
            // let hasPower = false;
            // let isPremium = false;
            // let isRadioFree = false;
      
        let DataLayout = ``;
        for (let _id in AllJsonData) {

            // if(AllJsonData[_id].siteNumber == SiteNumber){
            //     hasPower = AllJsonData[_id].hasPower
            //     isPremium = AllJsonData[_id].isPremium
            //     isRadioFree = AllJsonData[_id].isRadioFree
            // }
            
            if (AllJsonData[_id].equipment.includes(SelectedEquipment)) {

                DataLayout += `<div class="row display">

                <div class="col-4 tablesize">

                    <img class="img" src="`+AllJsonData[_id].image+`">

                </div>

                <div class="col-4 display1 tablesize">
                    <h2>Site `+AllJsonData[_id].siteNumber+`</h2>
                    <p class="detail">Equipment: `+AllJsonData[_id].equipment.toString()+`</p>
                    <p class="detail"><b>AVAILABILITY:</b>2 OF 10 DAYS</p>
                    <p class="detail">SITE FEATURES</p>
                   
                    <i class="fa-solid fa-plug">${AllJsonData[_id].hasPower}</i>
                    
                    <i class="fa-solid fa-star">${AllJsonData[_id].isPremium}
                    </i>
                  
                    <i class="fa-solid fa-radio">${AllJsonData[_id].isRadioFree}</i>
                </div>

                <div class="col-4 tablesize">
                    <button class="btn" onclick="BookSite(`+AllJsonData[_id].siteNumber+`)">Book Site</button>
                </div>

            </div>`
            ;
           
                console.log(AllJsonData[_id]);
            };
        }
       

        document.getElementById('AllSortedData').innerHTML = DataLayout;

    })();

    (async function () {
        let json = await fetchJsonDataFromCampsites();
        let AllEquipmentArray = [];
        let SelectedEquipment = localStorage.getItem('Equipment');

        let OptionLay = `<option value="All" selected>Show All</option>`;
        for (let _id in json) {
            AllEquipmentArray.push(json[_id].equipment)
        }
        let UniqueEquipmentArray = [].concat.apply([], AllEquipmentArray).filter((v, i, a) => a.indexOf(v) === i);
        for (let a = 0; a < UniqueEquipmentArray.length; a++) {
            let Selected = "";
            if (SelectedEquipment === UniqueEquipmentArray[a]){
                Selected = "selected";
            }else{
                Selected = ""
            }

            OptionLay += `<option `+Selected+` value="` + UniqueEquipmentArray[a] + `">` + UniqueEquipmentArray[a] + `</option>`;
            console.log(UniqueEquipmentArray[a]);
        }
        document.getElementById('equipment-type').innerHTML = OptionLay;

    });

    let BookSite = async(ele) => {
        localStorage.setItem("SiteNumber" , ele);
        let json = await fetchJsonDataFromCampsites();
        let ReviewLayout = ``;
        for (let _id in json) {
            if(json[_id].siteNumber === ele){
                ReviewLayout = ` <h2 class="text">1.SITE INFORMATION</h2>
        <p class="detail">Site: `+json[_id].siteNumber+`</p>
        <p class="detail">Equipment: `+json[_id].equipment.toString()+`</p>
        <p class="detail">Availability: 2 to 10 days</p>

        <h2 class="text">2.GUEST DETAILS</h2>
        <form>
            <label>Number of Nights:</label>
            <input type="number" id="TotalNight" value="0" class="fromnumber" name="number"><br>
            <input type="text" id="Username" class="fromdetail" name="name" placeholder="Enter name"><br>
            <input type="text" id="UserEmail" class="fromdetail" name="email" placeholder="Enter email"><br>

        </form>
        <a>
            <button onclick="ReserveCamp()">RESERVE</button>
        </a>`;
            }

        }
        document.getElementById('review-and-pay').innerHTML = ReviewLayout;

        openPage('review-and-pay');


    };

    ReserveCamp = () =>{

        let Username = document.getElementById('Username').value;
        let UserEmail = document.getElementById('UserEmail').value;
        let TotalNight = document.getElementById('TotalNight').value;
        localStorage.setItem("Username" , Username);
        localStorage.setItem("UserEmail" , UserEmail);
        localStorage.setItem("TotalNight" , TotalNight);

        window.location = 'reserver.html';

    }



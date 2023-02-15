
{

    //Sisältö stringit

    let pEtusivu = `<p >efefsdfdsfsdfsdfsdfsdfsdf<p>`;

    let pTietoa = `<p >efefsdfdsfsdfsdfsdfsdfsdf<p>`;

    let pTuotteet = ``;

    let pYhteystiedot = ``;

    var pHenkilot = `<button onClick="haeHenkilotiedot()">Hae henkilöt</button>`;

    // Palautettava sisältö objekti
    var pages = {
        'etusivu' : `<h2>Tervetuloa!!</h2><br/><br/> ${pEtusivu}`,
        'tietoa' : `<h2>Tietoa meistä</h2><br/><br/>`,
        'tuotteet' : `<h2>Tuotteet</h2><br/><br/>`,
        'yhteystiedot' : `<h2>Yhteystiedot</h2><br/><br/>`,
        'henkilot' : `Työntekijät<br/><br/> ${pHenkilot}`
    };

   
}

function haeHenkilotiedot() //Hakee henkilöt json tiedostosta
{

    let x = "<table><thead><th>Product name</th><th>Price</th></thead><tbody>"

    fetch('http://localhost:3300/api/henkilotiedot')
    .then(res => res.json())
    .then(data => data.Henkilotiedot.map(henk => {
        x += `<tr><td>${henk.etunimi}</td><td>${henk.sukunimi}</td><td>${henk.tyotehtava} </td></tr>`
        }
      ))

      setTimeout(() => {
        x += `</tbody></table>`
      document.getElementById("sisältö").innerHTML = pHenkilot + x}
      , 500 )
}

function getPageContent(page) //Lataa sivuston sisällön
{
    var contentToReturn;
    switch(page){
        case 'etusivu':
            contentToReturn = pages.etusivu;
            break;
        case 'tietoa':
            contentToReturn = pages.tietoa;
            break;
        case 'tuotteet':
            contentToReturn = pages.tuotteet;
            break;
        case 'yhteystiedot':
            contentToReturn = pages.yhteystiedot;
            break;
        case 'henkilot':
            contentToReturn = pages.henkilot;
            break;
        default:
            contentToReturn = pages.etusivu;
            break;				
    }
    document.getElementById('sisältö').innerHTML = contentToReturn; 
}
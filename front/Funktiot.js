
{

    //Sisältö stringit

    var pEtusivu = `<p >efefsdfdsfsdfsdfsdfsdfsdf<p>`;

    var henkilot = `<button onClick="haeHenkilotiedot()">Hae henkilöt</button>`;


    var pages = {
        'etusivu' : `Tervetuloa!!<br/><br/> ${pEtusivu}`,
        'tietoa' : `Tietoa meistä<br/><br/>`,
        'palvelut' : `Palvelut<br/><br/>`,
        'yhteystiedot' : `Yhteystiedot<br/><br/>`,
        'henkilot' : `Työntekijät<br/><br/> ${henkilot}`
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
      document.getElementById("sisältö").innerHTML = henkilot + x}
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
        case 'palvelut':
            contentToReturn = pages.palvelut;
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
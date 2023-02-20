
{

    //Sisältö stringit

    let pEtusivu = `<p>Tämä on kuvitteellisen tukkuliikkeen kotisivut<p>`;

    let pTietoa = `<p>Yritys ei ole siis todellinen joten kaikki tuotteet ja henkilot ovat keksittyjä,
     saatat löytää sivustolta random meemejä<p>`;

    var pTuotteet;
    haeTuotteet();

    let pYhteystiedot = ``;


    var pHenkilot;
    haeHenkilot();



    // Palautettavan sisällön objekti, älä lisää fetch dataa suoraan tähän!!!
    var sivut = {
        'etusivu' : `<h2>Tervetuloa!!</h2><br/><br/> ${pEtusivu}`,
        'tietoa' : `<h2>Tietoa meistä</h2><br/><br/> ${pTietoa}`,
        'tuotteet' : `<h2>Tuotteet</h2><br/><br/>`,
        'yhteystiedot' : `<h2>Yhteystiedot</h2><br/><br/>`,
        'henkilot' : `Työntekijät<br/><br/>`
    };

   
}

async function haeFetchLupaus() // Asynchronous funktio mikä hakee lupauksen serveriltä
{
    return fetch('http://localhost:3300/api/Tietokanta')
    .then((res) => {return res.json()})
    .then((data) => {return data})
}

function haeHenkilot() //Hakee, kasaa ja liittää henkilötieto taulun sivustolle
{
    haeFetchLupaus().then((data) => {
        let x = ""
        const pHenkiloAlku = "<table><thead><th>Etunimi</th><th>Sukunimi</th><th>Työtehtävä</th></thead><tbody>";
        const pHenkiloLoppu = `</tbody></table>`;
        data.Henkilotiedot.map(henk => {
            x += `<tr><td>${henk.etunimi}</td><td>${henk.sukunimi}</td><td>${henk.tyotehtava} </td></tr>`
        })
        pHenkilot = pHenkiloAlku + x + pHenkiloLoppu;
        sivut.henkilot += pHenkilot;
    } )
    .catch(() => {
        pHenkilot = "<p>Tietoja ei voitu hakea!! Palvelin yhteydessä jotain vikaa</p>";
        sivut.henkilot += pHenkilot;
    })
}

function haeTuotteet() //Hakee, kasaa ja liittää tuotetieto taulun sivustolle
{
    haeFetchLupaus().then((data) => {
        let x = ""
        const alku = "<table><thead><th>Tuote</th><th>Hinta</th></thead><tbody>";
        const loppu = `</tbody></table>`;
        data.Tuotteet.map(tuote => {
            x += `<tr><td>${tuote.nimi}</td><td>${tuote.hinta}</td></tr>`
        })
        pTuotteet = alku + x + loppu;
        sivut.tuotteet += pTuotteet;
    } )
    .catch(() => {
        pHenkilot = "<p>Tietoja ei voitu hakea!! Palvelin yhteydessä jotain vikaa</p>";
        sivut.tuotteet += pTuotteet;
    })
}

function lataaSivunSisalto(sivu) //Lataa sivuston sisällön.. DataFlow index sivustolle vain tämän funktion kautta!!
{
    let palautettavaSisalto;
    switch(sivu)
    {
        case 'etusivu':
            palautettavaSisalto = sivut.etusivu;
            break;
        case 'tietoa':
            palautettavaSisalto = sivut.tietoa;
            break;
        case 'tuotteet':
            palautettavaSisalto = sivut.tuotteet;
            break;
        case 'yhteystiedot':
            palautettavaSisalto = sivut.yhteystiedot;
            break;
        case 'henkilot':
            palautettavaSisalto = sivut.henkilot;
            break;
        default:
            palautettavaSisalto = sivut.etusivu;
            break;				
    }
    document.getElementById('sisalto').innerHTML = palautettavaSisalto; 
}
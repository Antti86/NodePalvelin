
{

    //Sisältö stringit

    let pEtusivu = `<p>Tämä on kuvitteellisen tukkuliikkeen kotisivut! Sivu on Single Page Application tyylillä tehty demo.<p>
                    <br/> <p>Sivun tekemisessä ei ole keskitytty kovin paljoa ulkoasuun vaan enemmän toiminnallisuuteen `;

    let pTietoa = `<p>Yritys ei ole todellinen joten kaikki tuotteet ja henkilot ovat keksittyjä!<p> <br/>
                    <img src="dataflowkaavio.png" alt="Kaavio">`;

     //Tuote muuttujat
    var aktSivu = 0;
    var tuoteArray;
    var elemenettejäSivulla = 20;
    haeTuotteet();

    let pYhteystiedot = `<img src="yhteystieto.jpg" alt="Meemi"> `;

    haeHenkilot();

    // Palautettavan sisällön objekti, älä lisää fetchin kautta tulevaa dataa suoraan tähän!!!
    var sivut = {
        'etusivu' : `<h2>Tervetuloa!!</h2><br/><br/> ${pEtusivu}`,
        'tietoa' : `<h2>Tietoa meistä</h2><br/><br/> ${pTietoa}`,
        'tuotteet' : `<h2>Tuotteet</h2>`,
        'yhteystiedot' : `<h2>Yhteystiedot</h2><br/><br/> ${pYhteystiedot}`,
        'henkilot' : `<h2>Työntekijät</h2>`
    };
}

async function haeFetchLupaus() // Asynchronous funktio mikä hakee ja palauttaa lupauksen serveriltä
{
    return fetch('http://localhost:3300/api/Tietokanta')
    .then((res) => {return res.json()})
    .then((data) => {return data})
}

//Tämä funktio vain kun sivu ladataan ekan kerran
function haeHenkilot() //Hakee, kasaa ja liittää henkilötieto taulun sivustolle kun fetch lupaus on palautunut
{
    haeFetchLupaus().then((data) => {
        let x = ""
        const Alku = `<div class="yhteystiedot">`;
        const Loppu = `</div>`;
        data.Henkilotiedot.map(henk => {
            x += `<div class="henkilöt">
            <h3>${henk.tyotehtava}</h3><p>${henk.etunimi} ${henk.sukunimi}</p> <p>${henk.puhelinnumero}</p>
            </div>`
        })
        sivut.henkilot += Alku + x + Loppu;
    } )
    .catch(() => {

        sivut.henkilot += `<p style="color:red;">Tietoja ei voitu hakea!! Palvelin yhteydessä jotain vikaa</p>` +
        `<img src="error.jpg" alt="Meemi"> `;
    })
}

//Tämä funktio vain kun sivu ladataan ekan kerran
function haeTuotteet() //Hakee, kasaa ja liittää tuotetieto taulun sivustolle kun fetch lupaus on palautunut
{
    haeFetchLupaus().then((data) => {
        tuoteArray = data.Tuotteet; //Tallenetaan json data omaan muuttujaan jotta voidaan käyttää sitä muuallakin
        tuoteArray.sort((a, b) => a.nimi.localeCompare(b.nimi));   
        //Tehdään muutama string muuttuja html tägejä varten
        const alku = `<table class="taulu" id="tuotetaulu"><thead><th>Tuote</th><th>Hinta</th></thead><tbody>`;
        const loppu = `</tbody></table>`;
        let x = "";
        let sivutagit = "";

        //Luodaan järjestely ominaisuutta varten html tägit jossa kutsutaan "Järjestä()" funktioita
        let jarjestely = `<label for="järjestys">Vaihda järjestystä:</label>

        <select name="järjestys" id="järjestys" onchange="Järjestä()">
          <option value="A-Ö">A-Ö</option>
          <option value="Ö-A">Ö-A</option>
          <option value="HintaLas">Halvin ensin</option>
          <option value="HintaNous">Kallein ensin</option>
        </select> `

        //Haetaan tuotteiden määrä ja lasketaan sivujen määrä
        const tuotelkm = data.Tuotteet.length;
        const sivujenmaara = tuotelkm / elemenettejäSivulla;

        //Luodaan kaikki tuotesivu navikointi buttonit sivumäärän mukaan
        for (let i = 1; i <= sivujenmaara; i++)
        {
            if (i === 1) //Laitetaan ohjelman avaus vaiheessa ensimmäinen sivu aktiiviseksi
            {
                sivutagit += `<button type="button" class="sivunapit active" onclick="haeTuoteSivu(${i - 1})">${i}</button>`;
            }
            else
            {
                sivutagit += `<button type="button" class="sivunapit" onclick="haeTuoteSivu(${i - 1})">${i}</button>`;
            }
        }

        //Luodaan tarvittava minimi määrä taulukko rivejä elementtimäärän mukaan ja asetetaan 1 sivun data oletuksena
        for (let j = 0; j < elemenettejäSivulla; j++)
        {
            x += `<tr><td>${tuoteArray[j].nimi}</td><td>${tuoteArray[j].hinta}</td></tr>`;
        }

        //Lisätään kaikki tägit ja tiedot sivut objektin tuote ominaisuuteen
        sivut.tuotteet += `<p>(${tuotelkm})</p>` + jarjestely + alku + x + loppu + sivutagit;
    })
    .catch(() => {  //Error handleri jos fetch lupausta ei tule..
        sivut.tuotteet += `<p style="color: red;">Tietoja ei voitu hakea!! Palvelin yhteydessä jotain vikaa</p>` +
        ` <img src="error.jpg" alt="Meemi"> `;
    })
}

function Järjestä() //Sortaus rutiini tuotetaululle
{
    const järj = document.getElementById("järjestys").value;
    switch(järj)
    {
        case 'A-Ö':
            tuoteArray.sort((a, b) => a.nimi.localeCompare(b.nimi));
            haeTuoteSivu(aktSivu);
            break;
        case 'Ö-A':
            tuoteArray.sort((a, b) => b.nimi.localeCompare(a.nimi));
            haeTuoteSivu(aktSivu);
            break;
        case 'HintaLas':
            tuoteArray.sort((a, b) => parseFloat(a.hinta) - parseFloat(b.hinta));
            haeTuoteSivu(aktSivu);
            break;
        case 'HintaNous':
            tuoteArray.sort((a, b) => parseFloat(b.hinta) - parseFloat(a.hinta));
            haeTuoteSivu(aktSivu);
            break;
        default:
            tuoteArray.sort((a, b) => a.nimi.localeCompare(b.nimi));
            haeTuoteSivu(aktSivu);
            break;
    }
}

function haeTuoteSivu(sNumero) //Funktio toimii "inline" eventhandlerinä tuotetaulu sivun vaihdossa
{
    //Hakee DOMista kaikki sivunapit, ottaa edellisen aktiivisen pois ja asettaa uuden aktiivisen sivunumeron
    let aktiivinenNappi = document.getElementsByClassName("sivunapit active");
    aktiivinenNappi[0].className = "sivunapit";
    let kaikkiNapit = document.getElementsByClassName("sivunapit");
    kaikkiNapit[sNumero].className = "sivunapit active";
    aktSivu = sNumero;

    //Lasketaan alku- ja loppuindexit sivunumeron ja halutun elementtimäärän mukaan, jotta sivulle tulee oikea määrä dataa
    const alkuIndexi = sNumero * elemenettejäSivulla;
    const loppuIndexi = alkuIndexi + elemenettejäSivulla;
 
    //Loopataan indexien mukaan "tietokannasta" oikeat tiedot
    for (let i = alkuIndexi, k = 1; i < loppuIndexi; i++, k++)
    {
        document.getElementById("tuotetaulu").rows[k].cells[0].innerHTML = tuoteArray[i].nimi;
        document.getElementById("tuotetaulu").rows[k].cells[1].innerHTML = tuoteArray[i].hinta;
    }
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
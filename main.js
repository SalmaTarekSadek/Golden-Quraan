let fixedNav = document.querySelector('.header'),
    scrollBtn = document.querySelector('.scrollBtn');
window.addEventListener("scroll",()=>{
    window.scrollY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active');
    if(windox.scrollY > 500){
        scrollBtn.classList.add('active');
    }
    else
    {
        scrollBtn.classList.remove('active')
    }
})
scrollBtn.addEventListener('click',() =>{
    window.scrollTo({
        top:0,
        behavior:'smooth'
    })
})
//Hadith Changer
// let hadithContainer = document.querySelector('.hadithContainer'),
//     next = document.querySelector('.buttons .next'),
//     prev = document.querySelector('.buttons .prev'),
//     number = document.querySelector('.buttons .number');
//     let hadithIndex = 0;
// HadithChanger();
// function HadithChanger() {
//     fetch(
//     "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json"
//     )
//         .then((response) => response.json())
//         .then((data) => {
//         console.log(data);
//         let Hadiths = data.data.collections;
//         hadithContainer.innerText = Hadiths[hadithIndex].arab;
//     })
//     .catch((error) => {
//         console.log(error);
//     });
//     }
// link Sections
let sections = document.querySelectorAll("section"),
    links = document.querySelectorAll('.header ul li');
    links.forEach(link => {
        link.addEventListener('click',()=>{
            document.querySelector('.header ul li.active').classList.remove('active');
            link.classList.add('active')
            let target = link.dataset.filter;
            sections.forEach(section=>{
            if(section.classList.contains(target))
            {
                section.scrollIntoView( {
                    behavior: 'smooth',
                })
            }
            })
        })
    })
    //Surah Api
    let SurahsContainer = document.querySelector('.surhasContainer')
    getSurahs()
    function getSurahs(){
        //fetch Surahs meta data {Name of Surahs}
        fetch("http://api.alquran.cloud/v1/meta")
        .then((response) => response.json())
        .then((data) => {
            let surahs = data.data.surahs.references;
            let numberOfSurahs = 114;
            SurahsContainer.innerHTML="";
            for (let i = 0; i< numberOfSurahs; i++){
                SurahsContainer.innerHTML += 
                ` 
            <div class="surah">
                <p>${surahs[i].name}</p>
                <p>${surahs[i].englishName}</p>
            </div>
            `
            }
            let SurahsTitle = document.querySelectorAll('.surah');
            let popup = document.querySelector('.surah-popup'),
            AyatContainer = document.querySelector('.ayat');
            SurahsTitle.forEach((title,index)=>{
                title.addEventListener('click',()=>{
                    fetch(`https://api.alquran.cloud/v1/surah/${index + 1}`)
                    .then(response => response.json())
                    .then((data) => {
                        AyatContainer.innerHTML="";
                        let Ayat = data.data.ayahs;
                        Ayat.forEach(aya =>{
                            popup.classList.add('active');
                        AyatContainer.innerHTML += 
                        `
                        <p>(${aya.numberInSurah}) - ${aya.text}</p>
                        `
                        })
                    })
                })
                })
                let closePopup = document.querySelector('.close-popup');
                closePopup.addEventListener('click',()=>{
                    popup.classList.remove('active');
                })
            })
        }
        //PrayTime Api
        let cards = document.querySelector('.cards')
        getPrayTimes();
        function getPrayTimes(){
            fetch("http://api.aladhan.com/v1/timingsByCity/14-05-2023?city=Cairo&country=Egypt&method=8")
            .then(response => response.json())
            .then(data =>{
                let times = data.data.timings;
                cards.innerHTML = "";
                for (let time in times){
                    console.log(time);
                    console.log(times[time]);
                    cards.innerHTML +=
                    `
                    <div class="cards">
                    <div class="card">
                        <div class="circles">
                        <svg>
                            <circle cx="100" cy="100" r="100"></circle>
                        </svg>
                        <div class="praytime">${times[time]}</div>
                        </div>
                        <p>${time}</p>
                    </div>
                </div>
                    `
                }
            })
        }
        //Active Sidebar
        let bars = document.querySelector('.bars'),
            SideBar = document.querySelector('.header ul');
        bars.addEventListener('click',()=>{
            SideBar.classList.toggle('active')
        })    
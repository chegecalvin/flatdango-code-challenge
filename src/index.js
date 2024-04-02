// Your code here
const link = "http://localhost:3000/films"
const filmContainer=document.getElementById("films")

document.addEventListener("DOMContentLoaded",()=>{
    document.getElementsByClassName("film item")[0].remove()
    firstMovie()
    movieData()
})
function movieData(){
    fetch(link)
    .then(response=>response.json())
    .then(films=>{
        films.forEach(film=>{
            displayAllMovies(film)
        })
    })
}
function firstMovie(){
    fetch(link)
    .then(response=>response.json())
    .then(films=>{
        const firstFilm=films[0]
        setMovieData(firstFilm)
})
}
function setMovieData(firstFilm){
    const displayPoster=document.getElementById("poster")
    displayPoster.src=firstFilm.poster
    const displayFilm=document.querySelector("#title")
    displayFilm.textContent=firstFilm.title
    const displayInfo=document.querySelector("#film-Info")
    displayInfo.textContent=firstFilm.description
    const filmInfo=document.querySelector("#showtime")
    filmInfo.textContent=firstFilm.showtime
    const tickets=document.querySelector("#ticket-num")
    tickets.textContent=firstFilm.capacity-firstFilm.tickets_sold
    const runTime=document.querySelector("#runtime")
    runTime.textContent=`${firstFilm.runtime} minutes`
}
function displayAllMovies(film){
    const li=document.createElement('li')
    li.style.cursor="pointer"
    li.textContent=(film.title).toUpperCase()
    filmContainer.appendChild(li)
    clickEvent()
    function clickEvent(){
        let movies=filmContainer.children
        for(let i=0; i<movies.length; i++){
            let movie=movies[i]
            console.log(movie)
            movie.addEventListener('click',() => {
                fetch(`${link}/${i+1}`)
                .then(res => res.json())
                .then(film => {
                    document.getElementById('buy-ticket').textContent = 'Buy Ticket'
                setMovieData(film)
            })

        })
    }
}
    }

    const btn = document.getElementById('buy-ticket')

        btn.addEventListener('click', function(e){
            let remTickets = document.querySelector('#ticket-num').textContent
            e.preventDefault()
            if(remTickets > 0){
                document.querySelector('#ticket-num').textContent  = remTickets-1
                
            }
            else if(parseInt(remTickets, 10)===0){
                btn.textContent = 'Sold Out'
            }
    })
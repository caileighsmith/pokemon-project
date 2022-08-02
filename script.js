

let pokemon = 'pikachu'

let pokemonNames = ''

let amount = 905;




let pokemonTeam = []
let pokemonTeamObj = {

};

let partyCounter = 0;

function renderAll(){
    fetch ('https://pokeapi.co/api/v2/pokemon?limit='+amount+'&offset=0')
    .then(response => response.json())
    .then (data =>{
        for (i in data.results){
            fetch ("https://pokeapi.co/api/v2/pokemon/"+String(data.results[i].name))
                .then (response => response.json())
                .then (data => {

                    
                    console.log(data)
                    let pokemonCard = document.createElement('div')
                    let pokemonImage = document.createElement('img')
                    pokemonCard.setAttribute('class', 'pokemon-card')
                    pokemonCard.setAttribute('id', data.name)
                    pokemonCard.setAttribute('onCLick', 'choose(this)')

                    pokemonCard.innerHTML = data.name

                    pokemonImage.setAttribute('src', data.sprites.front_default)
                    document.getElementsByClassName('pokemon-card')

                    document.getElementById('pokemon-container').appendChild(pokemonCard)
                    document.getElementById(data.name).appendChild(pokemonImage)

    })

        }
})
}


function searchType(){
    let currentType = document.getElementById('pokemon-types').value
    console.log(currentType)

}

function choose(x){
    //checking if pokemon team already has 6 in it (or under 7 that is).
    if (pokemonTeam.length < 6){
        if (confirm('Are you sure you want to add '+x.id+' to your pokemon team?')){
            pokemonTeam.push(x.id)
            alert(x.id+' has been added to your team!')
            x.style.backgroundColor = '#90EE90'
            partyCounter ++
            document.getElementById('party-counter').innerHTML = partyCounter+'/6'
            myTeam(x.id)

    
        }else{
            alert(x.id +' has NOT been added.')
        }
        console.log(x)
    }else{
        alert('you have a full team.')
    }
    
}

function showHoverCard(x){
    x.childNodes[1].style.display = 'none'
    x.childNodes[0].style.display = 'none'

    x.childNodes[2].style.display = 'block'


}


function hideHoverCard(x){
    x.childNodes[0].style.display = 'block'
    x.childNodes[1].style.display = 'block'
    x.childNodes[2].style.display = 'none'
    

}



    
function myTeam(x){

    fetch('https://pokeapi.co/api/v2/pokemon/'+x)
        .then(response => response.json())
        .then(data => {
            let teamCard = document.createElement('div')
            let teamImg = document.createElement('img')
                

            teamCard.setAttribute('class', 'team-card')
            teamCard.setAttribute('id', 'my-'+x)
            teamCard.setAttribute('onmouseover', 'showHoverCard(this)')
            teamCard.setAttribute('onmouseleave', 'hideHoverCard(this)')
            teamCard.innerHTML += "<h3>"+x+"</h3>"
            
            let hoverCard = document.createElement('div')
            hoverCard.setAttribute('class', 'hover-card')

            hoverCard.style.display = 'none'

            hoverCard.innerHTML += "<br>"
            hoverCard.innerHTML += 'Hp: '+data.stats[0].base_stat
            hoverCard.innerHTML += "<br>"
            hoverCard.innerHTML += 'Attack: '+data.stats[1].base_stat
            hoverCard.innerHTML += "<br>"
            hoverCard.innerHTML += 'Defence: '+data.stats[2].base_stat
            hoverCard.innerHTML += "<br>"
            hoverCard.innerHTML += 'Sp attk: '+data.stats[3].base_stat
            hoverCard.innerHTML += "<br>"
            hoverCard.innerHTML += 'Sp def: '+data.stats[4].base_stat
            hoverCard.innerHTML += "<br>"
            hoverCard.innerHTML += 'Speed: '+data.stats[5].base_stat


            console.log(data.stats)
            teamImg.setAttribute('src', data.sprites.front_default)
                
            document.getElementById('my-team-container').appendChild(teamCard)
            document.getElementById('my-'+x).appendChild(teamImg)
            document.getElementById('my-'+x).appendChild(hoverCard)

                

        })
}




function searchName(){

    let currentSearch = String(document.getElementById('searchName').value).toLowerCase()
    //removing all current pokemon
    const boxes = document.querySelectorAll('.pokemon-card');
    boxes.forEach(box => {
        box.remove();
    });

    if (currentSearch.length != 0){
        
        fetch ('https://pokeapi.co/api/v2/pokemon/'+currentSearch)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let pokemonCard = document.createElement('div')
            let pokemonImage = document.createElement('img')
            pokemonCard.setAttribute('class', 'pokemon-card')
            pokemonCard.setAttribute('id', data.name)
            pokemonCard.setAttribute('onCLick', 'choose(this)')

            pokemonCard.innerHTML = data.name

            pokemonImage.setAttribute('src', data.sprites.front_default)
            document.getElementsByClassName('pokemon-card')

            document.getElementById('pokemon-container').appendChild(pokemonCard)
            document.getElementById(data.name).appendChild(pokemonImage)
        })
    }else{
        renderAll()
    }
}




renderAll()
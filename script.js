let resultContainer=document.createElement('div');
let meaningtitle=document.createElement('div');
meaningtitle.setAttribute('class','meanTitle');

let bodybox=document.querySelector(".outer");
bodybox.append(resultContainer);

async function search(){
    try{
        let word=document.getElementById("searchbox").value;
    
        const fetchData=await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+word)
        const getData=await fetchData.json();
        detailBox(getData)
    }
    catch{
        resultContainer.innerHTML=``
        let error=document.createElement('h3')
        error.setAttribute('class','errormsg');
        error.innerText="Sorry no word exists.......... :(";
        resultContainer.append(error)
    }
    
}

function detailBox(letterArray){
    resultContainer.innerHTML=``;
    resultContainer.setAttribute('class','resultBox');

    let wordSpeak=document.createElement('div');
    wordSpeak.setAttribute('class','wordSpeaker');
    wordSpeak.innerHTML=`
    <h4>${letterArray[0].word} (${letterArray[0].phonetic})</h4>
    <audio controls class="audiobtn">
     <source src="${letterArray[0].phonetics[0].audio}">
    </audio>`

    resultContainer.append(wordSpeak);
    
    
    meaningtitle.innerHTML=`<h2>Meanings</h2>`
    resultContainer.append(meaningtitle)

    meaningParts(letterArray[0].meanings)

    
}

function meaningParts(array){
    for(var x of array){
        let meaning=document.createElement('div');
        meaning.setAttribute('class','meaningBox');
        meaning.innerHTML=`
        <h3>${x.partOfSpeech}</h3>
        <p>${x.definitions[0].synonyms.join(", ")}</p>
        <p>${x.definitions[0].antonyms.join(", ")}</p>
        <h5>definition: </h5><p>${x.definitions[0].definition}</p>`
        resultContainer.append(meaning)
    }
}

document.onkeydown=function enter(event){
    if(event.keyCode==13){
        search()
    }
}

let colorarr=['blue','red','green','yellow']
function colorchange(colorarr){
    let y=0;
    while(y<colorarr.length){
        meaningtitle.style.color=y;
        // if(y==2){
        //     y=0;
        // }
        y++;
    }
}
setInterval(colorchange(colorarr),2000);

// 
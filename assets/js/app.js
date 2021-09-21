//Variables
const tweetList = document.getElementById('tweet-list');





//EventListener
eventListener();



function eventListener(){
  //Forms Submission
  document.querySelector('#form').addEventListener('submit',newTweet);

  //Remove tweet from the List
tweetList.addEventListener('click', removeTweet)

//Document
document.addEventListener('DOMContentLoaded', localStorageOnLoad );
}




///Functions

function newTweet(event){
  event.preventDefault();

  //read the textarea value
  const tweet = document.getElementById('tweet').value;
  
//Create the Remove Button
const removeBtn = document.createElement('a');
removeBtn.classList = 'remove-tweet';
removeBtn.textContent = 'X';



  //Create an li elements
  const li =document.createElement('li');
  li.textContent = tweet; 
  
  //Add the remove button to each Tweet
  li.appendChild(removeBtn);

  tweetList.appendChild(li);

  //Adds Tweets To the Local Storage
  addTweetstoLocalStorage(tweet);
}

function removeTweet(e){
  if(e.target.classList.contains('remove-tweet')){
    e.target.parentElement.remove();
  }
  //Remove Tweets From the local Storage
  removeTweetLocalStorage( e.target.parentElement.textContent );
}

//Adds the tweets into the Local Storage

function addTweetstoLocalStorage(tweet){

  let tweets = getTweetsFromStorage();

  //Adding the tweet into the array
  tweets.push(tweet);

  //Add the tweet into the array
  localStorage.setItem('tweets', JSON.stringify(tweets));

}


function getTweetsFromStorage(){
let tweets;
const tweetsfromLS = localStorage.getItem('tweets');

//Get the values, if null is returned then we create an empty array
if (tweetsfromLS === null){
  tweets = [];
}else{
  tweets = JSON.parse(tweetsfromLS);
}
return tweets;
}

//prints localStorage tweets Load
function localStorageOnLoad(){
  let tweets = getTweetsFromStorage();
  
  //Loop through the storage and print the Values
  tweets.forEach(function(tweet){

    //Create the Remove Button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    //Create an li elements
      
    const li =document.createElement('li');
    li.textContent = tweet; 
      
    //Add the remove button to each Tweet
    li.appendChild(removeBtn);

    tweetList.appendChild(li);


  })
}

function removeTweetLocalStorage(tweet){
  //get the tweets from the Local storage
  let tweets =getTweetsFromStorage();
  

  //Remove the X from the tweet
  const tweetDelete = tweet.substring(0, tweet.length -1);

  //Loop through the tweets and remove the tweet that's equal
  tweets.forEach(function(tweetLS, index){
    if(tweetDelete === tweetLS){
      tweets.splice(index, 1);
    }
  });

  //save the Data
  localStorage.setItem('tweets',JSON.stringify(tweets));
}
var firebaseConfig = {
    apiKey: "AIzaSyAGqWrrGhpfyQvUz0zHZunZBheLm7NxxD0",
    authDomain: "library-ioe-project.firebaseapp.com",
    databaseURL: "https://library-ioe-project-default-rtdb.firebaseio.com",
    projectId: "library-ioe-project",
    storageBucket: "library-ioe-project.appspot.com",
    messagingSenderId: "362096986568",
    appId: "1:362096986568:web:6f0ca430f678b875c658fd",
    measurementId: "G-CQNENFF08P"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
database = firebase.database();

var ref = database.ref('/id');
var title_trend = {};
var genre_trend = {};
var author_trend = {};
let table_data = [];

ref.on('value', trends, errtrends);


function trending_title(){
    var max = 0;
    var title = "";
    var keys = Object.keys(title_trend);
    for (var i = 0; i<keys.length; i++){
        if(title_trend[keys[i]] > max){
            max = title_trend[keys[i]];
            title = keys[i];
        }
    }
    return title;
}

function trending_author(){
    var max = 0;
    var author = "";
    var keys = Object.keys(author_trend);
    for (var i = 0; i<keys.length; i++){
        if(author_trend[keys[i]] > max){
            max = author_trend[keys[i]];
            author = keys[i];
        }
    }
    return author;
}

function trending_genre(){
    var max = 0;
    var genre = "";
    var keys = Object.keys(genre_trend);
    for (var i = 0; i<keys.length; i++){
        if(genre_trend[keys[i]] > max){
            max = title_trend[keys[i]];
            genre = keys[i];
        }
    }
    return genre;
}

function trends(data){
    var ids = data.val();
    var keys = Object.keys(ids);
    var table_data = [];
    for (var i = 0; i<keys.length; i++){
        var key = keys[i];
        var temp = ids[key];
        if (books[temp][0] in title_trend){
            title_trend[books[temp][0]]++;
        }
        else{
            title_trend[books[temp][0]] = 1; 
        }

        if (books[temp][1] in author_trend){
            author_trend[books[temp][1]]++;
        }
        else{
            author_trend[books[temp][1]] = 1; 
        }

        if (books[temp][2] in genre_trend){
            genre_trend[books[temp][2]]++;
        }
        else{
            genre_trend[books[temp][2]] = 1; 
        }

    }
    var highest_title = trending_title();
    var highest_author = trending_author();
    var highest_genre = trending_genre();

    var title_tag = document.getElementById('title');
    title_tag.innerHTML = highest_title;

    var author_tag = document.getElementById('author');
    author_tag.innerHTML = highest_author;
    
    var genre_tag = document.getElementById('genre');
    genre_tag.innerHTML = highest_genre;

    for (var i = keys.length-1; i>keys.length-6; i--){
        var key = keys[i];
        var temp = ids[key];
        table_data.push({
            ID: temp,
            title: books[temp][0],
            author: books[temp][1],
            genre: books[temp][2]
        });
    }

    for (var i = 0; i<5; i++){
        var temp1 = document.getElementById('id'+(i+1));
        temp1.innerHTML = table_data[i]['ID'];

        var temp2 = document.getElementById('title'+(i+1));
        temp2.innerHTML = table_data[i]['title'];

        var temp3 = document.getElementById('author'+(i+1));
        temp3.innerHTML = table_data[i]['author'];

        var temp4 = document.getElementById('genre'+(i+1));
        temp4.innerHTML = table_data[i]['genre'];
    }
}

function errtrends(err){
    console.log('Error!');
    console.log(err);
  }

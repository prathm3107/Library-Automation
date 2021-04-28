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

var ref1 = database.ref('/Desk1');
var ref2 = database.ref('/Desk2');

ref1.on('value', desk1, errData1);

function desk1(data) {
    var status = data.val();
    console.log("Desk 1: " + status);
    if (status == 1) {
        var desk1 = document.getElementById('desk1');
        desk1.className = 'table-danger';
    } else if (status == 0) {
        var desk1 = document.getElementById('desk1');
        desk1.className = 'table-success';
    }
}

function errData1(err) {
    console.log('Error!');
    console.log(err);
}

ref2.on('value', desk2, errData2);

function desk2(data) {
    var status = data.val();
    console.log("Desk 2: " + status);
    if (status == 1) {
        var desk2 = document.getElementById('desk2');
        desk2.className = 'table-danger';
    } else if (status == 0) {
        var desk2 = document.getElementById('desk2');
        desk2.className = 'table-success';
    }
}

function errData2(err) {
    console.log('Error!');
    console.log(err);
}
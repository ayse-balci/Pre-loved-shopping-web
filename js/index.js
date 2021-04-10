
var firebaseConfig = {
    apiKey: "AIzaSyBT7-LVz_Q4z4Cev0BVQONhA2fgYZBSX7Y",
    authDomain: "keep-easy.firebaseapp.com",
    databaseURL: "https://keep-easy.firebaseio.com",
    projectId: "keep-easy",
    storageBucket: "keep-easy.appspot.com",
    messagingSenderId: "712492638291",
    appId: "1:712492638291:web:391d17851fca1f7fcf26a6",
    measurementId: "G-60Z63TQQ2N"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
/*
//firebase.auth.Auth.Persistance.LOCAL;
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
.then(() => {
  // Existing and future Auth states are now persisted in the current
  // session only. Closing the window would clear any existing state even
  // if a user forgets to sign out.
  // ...
  // New sign-in will be persisted with session persistence.
  return firebase.auth().signInWithEmailAndPassword(email, password);
})
.catch((error) => {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
});
*/

$("#btn-login").click(function() {
    var email = $("#email").val();
    var password = $("#password").val();

    if (email != "" && password != "") 
    {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                
                var user = userCredential.user;
                
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Message : " + errorMessage);
            });

        /*var result = firebase.auth().signInWithEmailAndPassword(email, password);

        result.catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
        });*/

    } else {
        window.alert("Please fill out all fields.");
    }
});

$("#btn-signup").click(function() {
    var email = $("#email").val();
    var password = $("#password").val();
    var cPassword = $("#confirmPassword").val();

    if (email != "" && password != "" && cPassword != "") 
    {
        if (password == cPassword) 
        {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                
                var user = userCredential.user;
                
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Message : " + errorMessage);
            });

        } else {
            window.alert("Password do not match with the confirm password.");
        }

    }
    else if (password.length < 6) {
        window.alert("Please use more than 6 character in password.");
    } else {
        window.alert("Please fill out all fields.");
    }
});

$("#btn-resetPassword").click(function() {
    var auth = firebase.auth();
    var email = $("#email").val();

    if (email != "") {
        auth.sendPasswordResetEmail(email).then(function() {
            window.alert("Email has been sent to you, please check and verify.");
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
        })
    }
    else {
        window.alert("Please write your email firstly.")
    }
});

$("#btn-logout").click(function() {
    firebase.auth().signOut();
});



$("#btn-update").click(function() {
    var phone = $("#phone").val();
    var address = $("#address").val();
    var bio = $("#bio").val();
    var fName = $("#firstName").val();
    var sName = $("#secondName").val();
    var gender = $("#gender").val();
    var country = $("#country").val();
    
    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if (fName != "" && sName != "" && phone != "" && address != "" && bio != "" && gender != "" && country != "") 
    {
        var userData = {
            "firstName": fName,
            "secondName": sName,
            "gender": gender,
            "country": country,
            "phone": phone,
            "address": address,
            "bio": bio,
        };

        usersRef.set(userData, function(error)
        {
            if (error) 
            {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Message : " + errorMessage);
            } else {
                window.location.href = "MainPage.html";
            }
        })
    } else {
        window.alert("Please fill out all fields.");
    }
});


function switchView(view) 
{
    $.get({
        url:view,
        cache:false,
    })
    .then(function(data)
    {
        $("#container").html(data);
        
    });
}



/*function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myMenu");
    li = ul.getElementsByTagName("li");
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }*/
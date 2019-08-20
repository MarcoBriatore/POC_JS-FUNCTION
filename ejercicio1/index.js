//----------------PRACTICO NUMERO 1--------------------

//---INPUTS---
let iptFname = document.getElementById('fname');
let iptLname = document.getElementById('lname');
let errorFandL = document.getElementById("errorFandL");

let iptAge = document.getElementById('age');
let errorAge = document.getElementById("errorAge");

let iptEmail = document.getElementById('email');
let errorEmail = document.getElementById("errorEmail");

let iptPassword = document.getElementById('password');
let errorPassword = document.getElementById("errorPassword");

let submitBtn = document.getElementById('submit')

//--FLAGS
let fAndLNameFlag = false;
let ageFlag = false;
let emailFlag = false;
let passwordFlag = false;

//---EVENT LISTENER
 iptFname.addEventListener('change',function(){
    myValidateFandL(this);
 })

 iptLname.addEventListener('change',function(){
  myValidateFandL(this);
})

iptAge.addEventListener('change',function(){
  if(!isNaN(this.value) || this.value == ''){
    ageFlag = true;
    errorAge.innerHTML = '';
  }
  else
    errorAge.innerHTML = 'La edad no puede estar con letras';
})

iptEmail.addEventListener('change',function(){
  if(this.value.indexOf("@") !== -1){
      if(this.value.indexOf("@gmail") !== -1 || this.value.indexOf("@outlook") !== -1  || this.value.indexOf("@icloud") !== -1 ){
          emailFlag = true;
          errorEmail.innerHTML = '';
      }
      else
        errorEmail.innerHTML  = 'No es un email valido';
  }
  else
    errorEmail.innerHTML  = 'No es un email';
})

iptPassword.addEventListener('input',function(){
    if(this.value.length < 20 && this.value.length > 9){
      errorPassword.innerHTML = ''
      if(findNumberAndLetters !== -1)
          passwordFlag = true;
      else
      errorPassword.innerHTML  = ' El password debe tener aunque sea una letra en minuscula,mayuscula y un numero';
    }
    else
      errorPassword.innerHTML  = ' El password debe tener mas de 9 y menos de 20 caracteres';

    if(this.value == '')
        password = '';
    password += this.value.slice(-1);
    this.value = '*'.repeat(this.value.length);
})

submitBtn.addEventListener('click', function (event) {
  event.preventDefault();
  if(fAndLNameFlag && ageFlag && emailFlag && passwordFlag){
      alert("Formulario enviado");
      document.getElementById('myForm').reset();
  }
  else
    alert("Error compruebe que no contiene errores en ningun campo")
})


//--COMPLEMENTARY FUNCTIONS
 function myValidateFandL(ob)
 {
     if(ob.value.length < 20){
         if( ob.value != ''){
             if(removeSpecialChars(ob.value) === -1)
             {
                 fAndLNameFlag = true;
                 errorFandL.innerHTML = '';
             }
             else
                errorFandL.innerHTML = ' Nombre ni Apellido puede contener caracteres especiales';
         }
         else
            errorFandL.innerHTML  = ' Nombre ni Apellido puede estar vacio';
     }
     else
        errorFandL.innerHTML  = ' Nombre ni Apellido puede contener menos de 20 caracteres';
 }

 function removeSpecialChars(str) {
  return str.search(/[!@#$%^&*(),.?":{}|<>]/g);
}

function findNumberAndLetters(str) {
  return str.search(/[0-9]|[A-z]/g);
}

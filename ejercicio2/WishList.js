let btns = document.querySelectorAll('button')
btns.forEach(element => {
  element.addEventListener('click',function()
  {
    
    if(!exist(element.value))
    {
      
      let ul = document.getElementById("wishList")
      let li = document.createElement('li')
      createButtonDelete(element.value, ul, li)
      createButtonPriorities(ul,li)
      li.classList = "list-group-item d-block p-2 bg-primary text-white my-1"
    }
    else
      alert('El elemento ya existe en su lista de deseos')
  })
});



function createButtonPriorities(ul,li){

  let buttonUp = document.createElement('button')
  let buttonDown = document.createElement('button')
              
  
  buttonUp.innerHTML = "Up"
  buttonUp.classList = "btn btn-info mx-2"
  
  buttonDown.innerHTML = "Down"
  buttonDown.classList = "btn btn-info mx-2"  

  buttonDown.onclick = () => { 
    if(li.nextElementSibling != null) 
      document.getElementById("wishList").insertBefore(li.nextElementSibling, li) 
    }
  buttonUp.onclick = () => {
    if(li.previousElementSibling != null)
      document.getElementById("wishList").insertBefore(li, li.previousElementSibling)
  }
  li.appendChild(buttonUp)
  li.appendChild(buttonDown)
  ul.appendChild(li)
}


function exist(val){
  let flag = false
  let li = document.querySelectorAll('#wishList>li>button')
  li.forEach(element => {
    if(element.value === val){
      flag = true
    }
  });
  return flag
}

function createButtonDelete(value, ul, li)
{
    //console.log(element.value)
    
    let buttonD = document.createElement('button')

    buttonD.innerHTML = "Drop"
    buttonD.classList = "btn btn-info mx-4 "
    buttonD.value = value

    buttonD.onclick = () => ul.removeChild(li) 

    li.innerHTML = value
    li.appendChild(buttonD)
    ul.appendChild(li)


}

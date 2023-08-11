var cl = console.log;

const todoForm = document.getElementById("todoForm");
const toDoitem = document.getElementById("toDoitem");
const todolist = document.getElementById("todolist");
const Addbtn = document.getElementById("Addbtn");
const updatebtn = document.getElementById("updatebtn");

let todolistarr= JSON.parse(localStorage.getItem("todolistarr"))||[];

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

const onitemEdit = (ele)=>{
    cl(ele,"editId!!!!!!!")
    let editid = ele.getAttribute ("data-id"); 
     localStorage.setItem("editid",editid)
    cl(editid);
    let getobj=todolistarr.find((todo)=>{
        return todo.skillId === editid;
    })
    cl(getobj)
  
    toDoitem.value=getobj.skillName;
    Addbtn.classList.add('d-none');
    updatebtn.classList.remove("d-none");
    
}

const teamplating=(arr=>{
    let result='';
    arr.forEach(item=>{
        result+=`
        <li class="list-group-item font-weight-bold d-flex juestify-content-between text-uppercase">
        <span>${item.skillName}</span>
        <span>

        
            <i class="fa-solid fa-pen-to-square fa-2x mr-3 edit" 
            onclick = "onitemEdit(this)"
             data-id="${item.skillId}">
            </i>
            <i class="fa-solid fa-trash fa-2x delete"
            onclick="onitemDelete(this)"
            data-deleteid ="${item.skillId}">
            </i>
        </span>
    </li>
        `
    })
   todolist.innerHTML = result
})
 teamplating(todolistarr)

const ontoAdd=(ele)=>{
    ele.preventDefault();
    let skills = toDoitem.value;
    cl(skills)

    let objskill={
        skillName:skills,
        skillId : create_UUID(),
    }
    todolistarr.push(objskill);
    cl(todolistarr)
    teamplating(todolistarr)
    ele.target.reset()
    localStorage.setItem("todolistarr",JSON.stringify(todolistarr))

    Swal.fire({
        title: 'Sucessfully Added!',
        imageUrl: 'https://i.imgflip.com/byad5.jpg?a469536',
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'Custom image',
        timer:3000,
      })


}








const onItemUpdate=(ele)=>{
    
 let updatedvalue= toDoitem.value;
 cl(updatedvalue)
 
 let updateId = localStorage.getItem("editid")

 todolistarr.forEach(item=>{
    if(item.skillId===updateId){
        item.skillName = updatedvalue
    }
 })
 
 Swal.fire({
    title: 'Sucessfully Updated!',
    imageUrl: 'https://i.imgflip.com/byad5.jpg?a469536',
    imageWidth: 100,
    imageHeight: 100,
    imageAlt: 'Custom image',
    timer:3000,
  })



 teamplating(todolistarr);
 localStorage.setItem("todolistarr",JSON.stringify(todolistarr))
 updatebtn.classList.add('d-none');
 Addbtn.classList.remove('d-none')
 todoForm.reset()
 
}

const onitemDelete=(ele)=>{
    // cl(ele)
    cl(ele.dataset.deleteid)

   todolistarr = todolistarr.filter(item=>{
        return item.skillId != ele.dataset.deleteid;
    })
    localStorage.setItem("todolistarr",JSON.stringify(todolistarr));
    teamplating(todolistarr)
     
Swal.fire({
    position: 'top-center',
    icon: 'error',
    title: 'Sucessfully Deleted ',
    showConfirmButton: false,
    timer: 1500
  })
}




todoForm.addEventListener("submit",ontoAdd);
updatebtn.addEventListener("click",onItemUpdate)
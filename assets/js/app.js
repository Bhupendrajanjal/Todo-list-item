var cl = console.log;

const todoForm = document.getElementById("todoForm");
const toDoitem = document.getElementById("toDoitem");
const todolist = document.getElementById("todolist");
const Addbtn = document.getElementById("Addbtn");
const updatebtn = document.getElementById("updatebtn");

//so firstly we have to event add on 

let todolistarr=JSON.parse (localStorage.getItem("todolistarr"))||[];

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

const onitemEdit=(eve)=>{
    cl(eve,"Edited!!!!")
    let editId = eve.getAttribute("data-id");
    cl(editId);
    localStorage.setItem("editid",editId)
    // //then find the matching the name 

    let getobj = todolistarr.find((todo)=>{
        return todo.skilId === editId
    })
    cl(getobj)
    toDoitem.value=getobj.SkillName;
    updatebtn.classList.remove('d-none')
    Addbtn.classList.add('d-none')
 
   
}

const onitemDelete=(ele)=>{
   cl(ele)



    cl(ele.dataset.deleteid)
    todolistarr = todolistarr.filter(item=>{
        return item.skilId != ele.dataset.deleteid
    })

    localStorage.setItem("todolistarr",JSON.stringify(todolistarr))
   
  teamplating(todolistarr)
  Swal.fire({
    title: 'SuccessFully Delete!',
    imageUrl: 'https://media.istockphoto.com/id/1316006857/vector/emoticon-placing-hand-on-head-emoji-with-palm-gesture-isolated-vector-illustration.jpg?s=612x612&w=0&k=20&c=eV-Wb82DzhJtTnZp1F6wbegW9h8eUo7NEo4vEB89or8=',
    imageWidth: 400,
    imageHeight: 400,
    imageAlt: 'Custom image',
    timer:3000,
  })
}

// console.log(create_UUID());

const teamplating=(arr=>{

        let result='';
        arr.forEach(item=>{
            result+=`
            <li class="list-group-item font-weight-bold d-flex juestify-content-between text-uppercase">
            <span>${item.SkillName}</span>
            <span>

            
                <i class="fa-solid fa-pen-to-square fa-2x mr-3 edit" 
                onclick = "onitemEdit(this)"
                 data-id="${item.skilId}">
                </i>
                <i class="fa-solid fa-trash fa-2x delete"
                onclick="onitemDelete(this)"
                data-deleteid ="${item.skilId}">
                </i>
            </span>
        </li>
            
            
            
            `
        })
        todolist.innerHTML=result
    
   
})
teamplating(todolistarr)

const ontoAdd=(eve)=>{
    eve.preventDefault();
    let skills=toDoitem.value;
    let todoobj={
        SkillName :skills,
        skilId: create_UUID(),
       
    }

    todolistarr.push(todoobj)
    teamplating(todolistarr);

    localStorage.setItem("todolistarr",JSON.stringify(todolistarr))
    cl(todolistarr)
    eve.target.reset();
    Swal.fire({
        title: 'SuccessFully Added',
        imageUrl:"https://previews.123rf.com/images/krisdog/krisdog1705/krisdog170500006/77394308-a-cartoon-emoji-icon-emoticon-looking-very-happy-with-his-two-thumbs-up.jpg", 
        imageWidth: 600,
        imageHeight: 400,
        timer:3000,
        imageAlt: 'Custom image',
      },8000)

   
}


const deleteid=(ele)=>{
    cl(ele,'hello')
}

const onItemUpdate=()=>{
    let updatedvalue = toDoitem.value;
    cl(updatedvalue);
    let updateid = localStorage.getItem("editid");
    cl(updateid)
    todolistarr.forEach(item=>{
        if(item.skilId === updateid){
            item.SkillName = updatedvalue
        }
    })
    
    localStorage.setItem("todolistarr",JSON.stringify(todolistarr))
    teamplating(todolistarr);
  
    Swal.fire({
        title: 'SuccessFully Update',
        imageUrl: " https://thumbs.dreamstime.com/z/cute-smiley-face-ok-like-icon-happy-smiley-character-cartoon-vector-illustration-isolated-white-background-cute-face-smiling-185517558.jpg",
        imageWidth: 400,
        imageHeight: 400,
        timer: 3000,
        imageAlt: 'Custom image',
      })
    todoForm.reset();
    updatebtn.classList.add("d-none")
    Addbtn.classList.remove("d-none")



}

todoForm.addEventListener("submit",ontoAdd);
updatebtn.addEventListener("click",onItemUpdate);

window.addEventListener('load', function (e) {
    
    document.app = new App();
});
let i = 0;
function App(){
    tasks = [];   
    
    const starting = async ()=>{
        const loginData= await TasksAxiosService.login();
        const logincheck= await TasksAxiosService.loginCheck(loginData.token);
        if (logincheck) {
            const size =  await TasksAxiosService.getSize();
            const lista =  await TasksAxiosService.get();
            
            for (i; i < size.count; i++) {

                const boxNumber = i;
                const item = lista[i];
                const box = new Box(boxNumber,item);
                tasks.push(box);
            }
            formbutton=new Form();
        }
        
    }
    starting()
}


const BASE_URL = 'http://localhost:9001/v1/tasks';
const BOX_CONTAINER_ID = 'box-container-id';
const FORM_CONTAINER_ID = 'form-creation-id';

class Box {

    /** @type {HTMLDivElement} */
    box = null;
    /** @type {HTMLSpanElement} */
    text = null;
    /** @type {number} */
    boxNumber = null;
    /** @type {HTMLButtonElement} */
    button = null;
    
    constructor(boxNumber,item) {
        this.boxNumber = boxNumber;

        /** Box container */
        const container = document.getElementById(BOX_CONTAINER_ID);

        /** Box */
        const box = document.createElement('div');
        this.box = box;
        this.box.classList.add('container__box');

        /** Text Box */
        const text = document.createElement('span');
        this.box.appendChild(text);
        this.text = text;
        this.text.classList.add('container__box__text');
        this.unpaint();
        this.text.innerHTML=`-&nbsp&nbsp&nbspNAME : <strong>${item.name} </strong>,&nbsp&nbsp&nbsp -DESCRIPTION: ${item.description},&nbsp&nbsp&nbsp  -DUE TO: ${item.dueDate},&nbsp&nbsp&nbsp-CREATED AT : ${item.creationDate}`;
        
        
        /** Remove button */
        const button =document.createElement('button');
        this.box.appendChild(button);
        this.button=button;
        this.button.classList.add('button_remove');
        this.button.innerHTML=`Delete`;
        

        // Store reference in a variable to avoid issues in diferent contexts
        const self = this;

        // Remove button on action
        button.addEventListener('click',async function(e){
            try {
                const returned= await TasksAxiosService.remove(item.taskId);
                if (!returned){
                    console.log('Item wasnt removed')
                }else{
                    //removing child to show changes
                    container.removeChild(box)
                }
            } catch (error) {
                console.error(error);
            }
        })
        

        // Adding box to its container to be rendered
        container.appendChild(box);
    }

    /**function to clean format */

    unpaint() {
        this.box.style.backgroundColor = '';
        this.box.style.color = '';
    }
}

class Form{
    /** @type {HTMLButtonElement} */
    button = null;

    constructor(){
         /** Form div */
        const formdiv = document.getElementById(FORM_CONTAINER_ID);

        /** button add creation */
        const button =document.createElement('button');
        formdiv.appendChild(button);
        this.button=button;
        this.button.classList.add('button_add');
        this.button.innerHTML=`Add Task`;

        /** In case button is clic */
        button.addEventListener('click',async function(e){
            /**removing button */
            formdiv.removeChild(button);
            /** Form creation */
            const form = document.getElementById('form-creation-id');
            form.setAttribute('id','add-task');
            /** labels and inputs creation*/
            form.innerHTML=`
                <label for="add-task-name">Name of task:</label>
                <input name="name" id="transactions-form-amount" type="text" required maxlength="40" size="20">
                <label for="add-task-description">Description:</label>
                <input name="description" id="transactions-form-amount" type="text" required maxlength="40" size="20">

                <label for="add-task-due-date">Due_date</label>
                <input name="due_date" id="add-task-due-date" type="date">
            `;
            const sendbutton=document.createElement('button');
            form.appendChild(sendbutton);
            sendbutton.classList.add('button_add');
            sendbutton.innerHTML=`Add Task`;
            sendbutton.addEventListener('click', async function(e){
                try{
                    const inputs=form.querySelectorAll('input');
                    const object={};
                    
                    for(const input of inputs){
                        const value = input.value;
                        const key = input.name;
                        object[key] = value;
                    }
                    const item= await TasksAxiosService.save(object);
                    const box = new Box(i, item);
                }catch (error) {
                    console.error(error);
                }
                
                form.innerHTML='';
                formdiv.appendChild(button);
            })

        })
        
    }
}

class Errors {
    static TaskNotFound() {
        return Error(`Task  not found`);
    }
    static Unexpected() {
        return Error('Unexpected error');
    }
}
class TasksAxiosService {

    static async get() {
        const response = await axios.get(`/`, { baseURL: BASE_URL });
        switch (response.status) {
            case 200:
                return await response.data;
            case 404:
                throw Errors.TaskNotFound();
            default:
                throw Errors.Unexpected();
        }
    }
    static async remove(taskId){
        const response= await axios.delete(`/${taskId}`, { baseURL: BASE_URL });
        switch (response.status) {
            case 200:
                return await response.data;
            case 404:
                throw Errors.TaskNotFound();
            default:
                throw Errors.Unexpected();
        }
    }
    static async getSize() {
        const response = await axios.get(`/size`, { baseURL: BASE_URL });
        switch (response.status) {
            case 200:
                return await response.data;
            case 404:
                throw Errors.TaskNotFound();
            default:
                throw Errors.Unexpected();
        }
    }
    static async save(task){
        const taskhelper={name: `${task.name}`, description: `${task.description}`, due_date: `${task.due_date}`};
        
        const response= await axios.post(BASE_URL,taskhelper);
        
        switch (response.status) {
            case 200:
                return await response.data;
            case 404:
                throw Errors.TaskNotFound();
            default:
                throw Errors.Unexpected();
        }
    }
    static async login(){
        const response=await axios.post(BASE_URL + "/login");
        switch(response.status){
            case 200:
                return await response.data;
            default:
                throw Errors.Unexpected();
        }
    }
    static async loginCheck(token){
        const response=await axios.post(BASE_URL + "/logincheck",{
            headers:{
                Authorization: 'Bearer ' + token
            }
        });
        switch (response.status) {
            case 200:
                return await response.data;
            case 403:
                window.alert("403: Forbidden ( Not logging yet)")
            default:
                throw Errors.Unexpected();
        }
    }
}

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
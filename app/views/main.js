window.addEventListener('load', function (e) {
    
    document.app = new App();
});

function App(){
    tasks = [];
    const starting = async ()=>{
        const size =  await SizeAxiosService.get();
        const lista =  await TasksAxiosService.get();
        
        for (let i = 0; i < size.count; i++) {

            const boxNumber = i;
            const item = lista[i];
            const box = new Box(boxNumber,item);
            tasks.push(box);
        }
    }
    starting()
}


const BASE_URL = 'http://localhost:9001/v1/tasks';
const BOX_CONTAINER_ID = 'box-container-id';

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
        this.text.innerHTML=`-------NAME : ${item.name},  DESCRIPTION: ${item.description},   DUE TO: ${item.due_date},   CREATED AT : ${item.creation_date}-----`;
        
        
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
                const returned= await TaskRemoveAxiosService.remove(item.task_id);
                
                if (!returned){
                    console.log('Item wasnt removed')
                }else{
                    //refresh page to show changes
                    window.location.reload();
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
                return response.data;
            case 404:
                throw Errors.TaskNotFound();
            default:
                throw Errors.Unexpected();
        }
    }
}

class TaskRemoveAxiosService{
    static async remove(taskId){
        const response= await axios.delete(`/${taskId}`, { baseURL: BASE_URL });
        switch (response.status) {
            case 200:
                return response.data;
            case 404:
                throw Errors.TaskNotFound();
            default:
                throw Errors.Unexpected();
        }
    }
}

class SizeAxiosService {

    static async get() {
        const response = await axios.get(`/size`, { baseURL: BASE_URL });
        switch (response.status) {
            case 200:
                return response.data;
            case 404:
                throw Errors.TaskNotFound();
            default:
                throw Errors.Unexpected();
        }
    }
}
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
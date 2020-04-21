<template>
  <div class="row">
      <div class="col-md-12">
        <div class="col-md-4 ">
            <section class="list">
                <header>TODO</header>
                <draggable  class="drag-area" v-if="todos.length" :list="todos" :options="{animation:200, group:'todo_type'}" :element="'article'" @add="onAddTodo($event)"  >
                    <article class="card" v-for="todo in todos" :key="todo.id" :data-id="todo.id">
                        <header>
                           <div v-if="tagEditingId == todo.id">
                                <v-text-field v-model="todo.title" :id="`todo-edit-${todo.id}`" 
                                @blur="updateTodoTitle(todo)
                                 "
                                 @keydown.enter="updateTodoTitle(todo)"
                                />
                           </div>
                            <div v-else @click="setToEditing(todo)"> 
                               {{todo.title}}
                            </div>
                            <button v-on:click="deleteTitle($event,todo.id)" class="btn btn-danger deletebutton">Delete</button>
                        </header> 
                    </article>               
                </draggable>   
                  <input type="text" class="titleinput" placeholder="input title" v-model="titles">
                    <button 
                     v-on:click="createTodo($event)"
                     class="btn btn-success buttonadd " >Add</button>
            </section>
        </div>
        <div class="col-md-4">   
            <section class="list">
                <header>DOING</header>
                <draggable class="drag-area" v-if="doings.length" :list="doings" :options="{animation:200, group:'todo_type'}" :element="'article'" @add="onAddDoing($event)"  >
                    <article class="card" v-for="todo in doings " :key="todo.id"  :data-id="todo.id" >
                      <header>
                           <div v-if="tagEditingId == todo.id">
                                <v-text-field v-model="todo.title" :id="`todo-edit-${todo.id}`" 
                                @blur="updateTodoTitle(todo)
                                 "
                                 @keydown.enter="updateTodoTitle(todo)"
                                />
                           </div>
                            <div v-else @click="setToEditing(todo)"> 
                               {{todo.title}}
                            </div>
                            <button v-on:click="deleteTitle($event,todo.id)" class="btn btn-danger deletebutton">Delete</button>
                        </header> 
                    </article>
                </draggable>  
                <input type="text" class="titleinput" placeholder="input title" v-model="titledoing">
                    <button 
                     v-on:click="createTododoing($event)"
                     class="btn btn-success buttonadd " >Add</button>
            </section>
        </div>
        <div class="col-md-4">   
            <section class="list">
                <header>DONE</header>
                <draggable  handle=".handle" class="drag-area" v-if="dones.length" :list="dones" :options="{animation:200, group:'todo_type'}" :element="'article'" @add="onAddDone($event)"   >
                    <article class="card"  v-for="todo in dones " :key="todo.id"  :data-id="todo.id" >
                        <header>
                           <div v-if="tagEditingId == todo.id">
                                <v-text-field v-model="todo.title" :id="`todo-edit-${todo.id}`" 
                                @blur="updateTodoTitle(todo)
                                 "
                                 @keydown.enter="updateTodoTitle(todo)"
                                />
                           </div>
                            <div v-else @click="setToEditing(todo)"> 
                               {{todo.title}}
                            </div>
                            <button v-on:click="deleteTitle($event,todo.id)" class="btn btn-danger deletebutton">Delete</button>
                        </header> 
                    </article>
                </draggable> 
                     <input type="text" class="titleinput" placeholder="input title" v-model="titledone">
                    <button 
                     v-on:click="createTododone($event)"
                     class="btn btn-success buttonadd">Add</button> 
            </section>
        </div>
      </div>
    </div>
</template>
<script>
Vue.use(Vuetify)
import axios from "axios";
import draggable from 'vuedraggable'
import Vue from 'vue'
import VueSwal from 'vue-swal'
import Vuetify from 'vuetify'
Vue.use(VueSwal)
const baseURL = "http://localhost:8888/api";
export default {
  name: "card",
  data() {
    return {
      tagEditingId :'',
      todos: [],
      doings: [],
      dones: [],
      titles: "",
      titledoing: "",
      titledone: ""
    };
  },
  components:{
    draggable,
    
   
  },

  async created() {
    try {
      const res = await axios.get(`${baseURL}/toto/gettype?type=todo`, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
      this.todos = res.data;
      const resdata = await axios.get(`${baseURL}/toto/gettype?type=doing`, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
      this.doings = resdata.data;
      const resdone = await axios.get(`${baseURL}/toto/gettype?type=done`, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
      this.dones = resdone.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
      setToEditing(todo){
    this.tagEditingId = todo.id;
    setTimeout(() =>{
     document.getElementById(`todo-edit-${todo.id}`).focus();
    },1)
    
   },
  updateTodoTitle(todo){
      axios.put(`${baseURL}/todo/update`,todo)
     this.tagEditingId = ''
  },
    onAddTodo(event) {
                let id = event.item.getAttribute('data-id');
               axios.patch(`${baseURL}/todo/`+ id, {
                }).then((response) => {
                    response.data.todo_type = "todo";
                    axios.put(`${baseURL}/todo/update`, {...response.data})
                    console.log(response.data);
                }).catch((error) => {
                    console.log(error);
                })
            },
    onAddDoing(event) {
                let id = event.item.getAttribute('data-id');
               axios.patch(`${baseURL}/todo/`+ id, {
                }).then((response) => {
                    response.data.todo_type = "doing";
                    axios.put(`${baseURL}/todo/update`, {...response.data})
                    console.log(response.data);
                }).catch((error) => {
                    console.log(error);
                })
            },
       onAddDone(event) {
                let idx = event.item.getAttribute('data-id');
               axios.patch(`${baseURL}/todo/`+ idx, {
                },    
                ).then((response) => {
                    response.data.todo_type = "done";
                     axios.put(`${baseURL}/todo/update`, {...response.data})
                }).catch((error) => {
                    console.log(error);
                })
            },         
    async createTodo() {
      try {
        if(this.titles == ''){
          alert("Input Title")
        }
        else
        {
           const res = await axios.post(
          `${baseURL}/todo/insert`,
          {
            title: this.titles,
            todo_type: "todo"
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
        this.todos = [...this.todos, res.data];
        this.titles = "";
        window.location.reload()
        }
       
      } catch (error) {
        console.error(error);
      }
    },
    async createTododoing() {
      try {
       if(this.titledoing == ''){
         alert("Input Title");
       }else{
        const res = await axios.post(`${baseURL}/todo/insert`, {
          title: this.titledoing,
          todo_type: "doing"
        });
        this.doings = [...this.doings, res.data];
        this.titledoing = "";
         window.location.reload()
       }
      } catch (error) {
        console.error(error);
      }
    },
    async createTododone() {
      try {
        if(this.titledone == ''){
          alert("input Title");
        }else{
              const res = await axios.post(`${baseURL}/todo/insert`, {
          title: this.titledone,
          todo_type: "done"
        });
        this.dones = [...this.dones, res.data];
        this.titledone = "";
         window.location.reload()
        }
       
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTitle(e, id) {
      e.preventDefault();
      try {
        this.$swal({
        title: "Delete this record?",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
         axios.delete(`${baseURL}/todo/delete/`+id).then(()=>{
              this.$swal({
              title: "Deleted!",
              text: "Your row has been deleted.",
              type: "success",
           });
             window.location.reload()
         }).catch(()=>{
           this.$swal("Failed!","There was something wronge","warning");
         })
         console.log(result.data);
         
    });
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.itemtodo {
  text-align: left;
}
.buttondelete {
  float: right;
  overflow: hidden;
}
.list {
      background-color: #26004d;
      border-radius: 3px;
      margin: 5px 5px;
      padding: 10px;
      width: 100%;
    }
    .list>header {
      font-weight: bold;
      color: white;
      text-align: center;
      font-size: 20px;
      line-height: 28px;
      cursor: grab;
    }
    .list article {
      border-radius: 3px;
      margin-top: 10px;
    }

    .list .card {
      background-color: #FFF;
      border-bottom: 1px solid #CCC;
      padding: 15px 10px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bolder;
      text-align: left;
       height: 75px;
    }
    .list .card:hover {
      background-color: #F0F0F0;
    }
    .drag-area{
     min-height: 10px;  
    }
    .titleinput{
      margin-top: 20px;
      width: 50%;
      border:  none;
      height: 30px;
      padding: 20px;
      background:rgb(201, 198, 189);
    }
    .deletebutton{
      float: right;
    }
    .buttonadd{
      margin-left: 20px;
      padding: 10px;
    }
</style>

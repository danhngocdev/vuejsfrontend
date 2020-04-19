<template>
  <div class="conatiner">
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Trello Clone <i class="glyphicon-glyphicon-trash"></i></h3>
          </div>
          <div class="panel-body">
            <div class="col-md-4">
              <h3>Todo</h3>
              <ul v-if="todos && todos.length" class="list-group">
                <li v-for="todo in todos" :key="todo.id" class="list-group-item itemtodo">
                  {{todo.title}}
                  
                  <span class="">
                    
                   
                   <a     
                           
                    v-on:click="deleteTitle($event,todo.id)"
                    class="btn btn-danger buttondelete"
                    href
                  ><b-icon icon="x-circle" scale="2" variant="success"></b-icon></a>
                    
                  </span>
                  
                </li>
              </ul>
              <input type="text" class="form-control" v-model="titles" placeholder="Input Title" />
              <button v-on:click="createTodo($event)" type="submit" class="btn btn-primary">Add</button>
            </div>
            <div class="col-md-4">
              <h3>Doings</h3>
              <ul v-if="doings && doings.length" class="list-group">
                <li
                  v-for="todo in doings"
                  :key="todo.id"
                  class="list-group-item itemtodo"
                >{{todo.title}}</li>
              </ul>
              <input
                type="text"
                class="form-control"
                v-model="titledoing"
                placeholder="Input Title"
              />
              <button v-on:click="createTododoing($event)" type="submit" class="btn btn-primary">Add</button>
            </div>
            <div class="col-md-4">
              <h3>Done</h3>
              <ul v-if="dones && dones.length" class="list-group">
                <li
                  v-for="todo in dones"
                  :key="todo.id"
                  class="list-group-item itemtodo"
                >{{todo.title}}</li>
              </ul>
              <input type="text" class="form-control" v-model="titledone" placeholder="Input Title" />
              <button v-on:click="createTododone($event)" type="submit" class="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BIcon } from 'bootstrap-vue'
const baseURL = "http://localhost:8888/api";
//const post = "http://localhost:8080/api/todo/insert"
export default {
  name: "card",
  data() {
    return {
      todos: [],
      doings: [],
      dones: [],
      titles: "",
      titledoing: "",
      titledone: ""
    };
  },
  components:{
    BIcon
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
    async createTodo() {
      try {
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
      } catch (error) {
        console.error(error);
      }
    },
    async createTododoing() {
      try {
        const res = await axios.post(`${baseURL}/todo/insert`, {
          title: this.titledoing,
          todo_type: "doing"
        });
        this.doings = [...this.doings, res.data];
        this.titledoing = "";

      } catch (error) {
        console.error(error);
      }
    },
    async createTododone() {
      try {
        const res = await axios.post(`${baseURL}/todo/insert`, {
          title: this.titles,
          todo_type: "done"
        });
        this.dones = [...this.dones, res.data];
        this.titledone = "";
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTitle(e, id) {
      e.preventDefault();
      try {
        // return await axios.post(`${baseURL}/todo/delete/` + id, {
        //   headers: {
        //     "Access-Control-Allow-Origin": "*"
        //   }
        // });
        axios.delete(`${baseURL}/todo/delete/`+id)
       window.location.reload()
        .then(function(res){
           console.log(res.data);
        })

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
</style>

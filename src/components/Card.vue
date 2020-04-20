<template>
  <div class="row">
      <div class="col-md-12">
           <div class="col-md-4 ">
            <section class="list">
                <header>TODO</header>
                <draggable class="drag-area" v-if="todos.length" >
                    <article class="card" v-for="todo in todos" :key="todo.id">
                        <header>
                           {{todo.title}}
                        </header>
                    </article>
                </draggable>   
            </section>
        </div>
        <div class="col-md-4">   
            <section class="list">
                <header>DOING</header>
                <draggable class="drag-area" v-if="doings.length" >
                    <article class="card" v-for="todo in doings " :key="todo.id"  >
                        <header>
                         {{todo.title}}
                        </header>
                    </article>
                </draggable>  
            </section>
        </div>
        <div class="col-md-4">   
            <section class="list">
                <header>DONE</header>
                <draggable class="drag-area" v-if="dones.length" >
                    <article class="card"  v-for="todo in dones " :key="todo.id"  >
                        <header>
                         {{todo.title}}
                        </header>
                    </article>
                </draggable>  
            </section>
        </div>
      </div>
    </div>
</template>
<script>
import axios from "axios";
import draggable from 'vuedraggable'
import $ from 'jquery'
import Vue from 'vue'
import VueSwal from 'vue-swal'
import Vuetify from "vuetify";
Vue.use(Vuetify);
Vue.config.productionTip = false;
Vue.use(VueSwal)
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
    editModal(todo){
     $('#todo').modal('show');
     console.log(todo);
     
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
          title: this.titles,
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
      text-align: left -;
    }
    .list .card:hover {
      background-color: #F0F0F0;
    }
    .drag-area{
     min-height: 10px;  
    }
</style>

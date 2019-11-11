<template>
  <div>
       <h2 class="sub-header">添加人物</h2>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">姓名</label>
            <input v-model.trim="user.name" type="text" class="form-control" id="exampleInputEmail1" placeholder="姓名">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">年龄</label>
            <input v-model.trim.number="user.age" type="text" class="form-control" id="exampleInputPassword1" placeholder="年龄">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">地址</label>
            <input v-model.trim="user.local" type="text" class="form-control" id="exampleInputPassword1" placeholder="地址">
          </div>
          <button @click.prevent="onAdd" type="submit" class="btn btn-success">添加</button>
        </form>
  </div>
</template>

<script>
export default {
    data() {
      return {
        user:{
          name:'',
          age:'',
          local:''
        }
      }
    },
    methods: {
      onAdd(){
        this.$axios.post("/users",this.user).then(()=>{
          alert("添加成功");
          this.$router.push("/figure");
        }).catch(()=>{
          alert("添加失败")
        })
      }
    },
}
</script>

<style>

</style>
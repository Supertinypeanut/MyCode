<template>
  <div>
      <h2 class="sub-header">编辑人物</h2>
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
          <button @click.prevent="onEdit" type="submit" class="btn btn-success">添加</button>
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
    created() {
      this.getData();
    },
    methods: {
      getData(){
        this.$axios.get(`/users/${this.$route.params.id}`).then(response=>{
          this.user = response.data;
        }).catch(error=>{
          alert(error);
        })
      },
      onEdit(){
        this.$axios.put(`/users/${this.$route.params.id}`,this.user).then(()=>{
          alert("修改成功");
          this.$router.push("/figure");
        }).catch(error=>{
          alert(error);
        })
      }
    }
}
</script>

<style>

</style>
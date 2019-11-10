<template>
  <div>
    <h2 class="sub-header">添加英雄</h2>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">姓名</label>
        <input
          v-model.trim="formData.name"
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          placeholder="请输入您的姓名"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">地址</label>
        <input
          v-model.trim="formData.local"
          type="text"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="请输入您的地址"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">技能</label>
        <input
          v-model.trim="formData.skill"
          type="text"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="请输入您的技能"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">年龄</label>
        <input
          v-model.trim.number="formData.age"
          type="text"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="请输入您的年龄"
        />
      </div>
      <button @click.prevent="onAddHero" class="btn btn-success">添加英雄</button>
    </form>
  </div>
</template>

<script>
export default {
data() {
  return {
    formData:{
      name:'',
      local:'',
      skill:'',
      age:''
    }
  }
},
methods: {
  onAddHero(){
    this.$axios.post("http://localhost:3000/heros",this.formData).then(response=>{
      alert("添加成功");
      this.$router.push('/heros')
    }).catch(error=>{
      alert(error)
    })
  }
},
}
</script>

<style>

</style>
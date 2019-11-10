<template>
    <div>
    <h2 class="sub-header">编辑英雄</h2>
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
      <button @click.prevent="onEditHero" class="btn btn-success">修改英雄</button>
    </form>
  </div>
</template>

<script>
export default {
    // 获取id相应数据
    created() {
        this.$axios.get(`http://localhost:3000/heros/${this.$route.params.id}`)
        .then(response=>{
            this.formData= response.data;
        }).catch(error=>{
            console.log(error);
        })
    },
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
        onEditHero(){
            this.$axios.put(`http://localhost:3000/heros/${this.$route.params.id}`,this.formData)
            .then(response=>{
                alert("编辑成功");
                this.$router.push("/heros");
            }).catch(error=>{
                alert(error)
            })
        }
    },
}
</script>

<style>

</style>
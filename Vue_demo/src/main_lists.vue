<template>
  <div >
    <h2 class="sub-header">英雄列表</h2>
    <a @click.prevent="onAdd" class="btn btn-success" href="add.html">添加</a>
    <div class="table-responsive">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>id</th>
                    <th>名字</th>
                    <th>所在地</th>
                    <th>技能</th>
                    <th>年龄</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                   <tr v-for="item in lists" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.local}}</td>
                    <td>{{item.skill}}</td>
                    <td>{{item.age}}</td>
                    <td>
                        <router-link :to="`/heros/edit/${item.id}`">编辑</router-link> &nbsp;&nbsp;
                        <a @click.prevent="onDelete(item.id)" href="javascript:window.confirm('Are you sure?')">删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            lists:[]
        }
    },
    methods: {
        // 数据渲染
        loadData(){
            this.$axios.get("http://localhost:3000/heros").then(response=>{
                this.lists = response.data;
            });
        },
        onDelete(id){
            if (confirm("真的要删我吗")) {
                this.$axios.delete(`http://localhost:3000/heros/${id}`).then(response=>{
                    alert("删除成功");
                    this.loadData();
                }).catch(error=>{
                    alert(error);
                })
            }
        },
        onAdd(){
            this.$router.push("/heros/add");
        }
    },
    created() {
        this.loadData();
    },
}
</script>

<style>

</style>
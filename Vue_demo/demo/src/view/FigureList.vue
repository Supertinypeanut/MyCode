<template>
  <div>
       <h2 class="sub-header">英雄列表</h2>
       <router-link class="btn btn-success" to="/figure/add">添加</router-link>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>地址</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in users" :key="item.id">
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.age}}</td>
                        <td>{{item.local}}</td>
                        <td>
                            <router-link :to="`/figure/edit/${item.id}`">编辑</router-link> &nbsp;&nbsp;
                            <a @click="onDelete(item.id)" href="javascript:;" >删除</a>
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
            users:[]
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        // 初始化数据
        loadData(){
            this.$axios.get("/users").then(response=>{
                this.users = response.data;
            }).catch(error=>{
                alert(error);
            })
        },
        onDelete(id){            
            if (confirm("真的要删除吗，呜呜呜")) {
                this.$axios.delete(`/users/${id}`).then(()=>{
                    alert("删除成功");
                    this.loadData();
            }).catch(error=>{
                alert(error);
            })
            }
        }
    },
}
</script>

<style>

</style>
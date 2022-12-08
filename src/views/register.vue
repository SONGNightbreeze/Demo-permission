<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <label> 注册页面 </label>
    <div>
      <label>账号</label>
      <input
        type="text"
        placeholder="请输入登录名称"
        v-model="loginForm.username"
      />
    </div>
    <div>
      <label>密码</label>
      <input
        type="password"
        placeholder="请输入密码"
        v-model="loginForm.password"
      />
    </div>
    <div>
        <span>角色权限</span>  
        <div>
            <label>用户管理</label>
            <input value="user" type="checkbox" v-model="permission" />
        </div>
        <div>
            <label>角色管理</label>
            <input value="roles" type="checkbox" v-model="permission" />
        </div>
        <div>
            <label>商品管理</label>
            <input value="goods" type="checkbox" v-model="permission" />
        </div>
        <div>
            <label>分类规则</label>
            <input value="categories" type="checkbox" v-model="permission" />
        </div>
        <span>已选的权限{{permission}}</span>
        <div>
            <button @click="registerhandle">注册</button>
        </div>
        <div>
            <h2>{{loginForm.username}}</h2>
            <h2>{{loginForm.password}}</h2>
        </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRegister } from "../stores/register";
import localCache from '@/utils/cache'

const loginForm = reactive({
  username: "",
  password: "",
});

const store = useRegister();

const permission = ref([]);

const registerhandle = () => {
  localCache.setCache("name", loginForm.username);
  localCache.setCache("password", loginForm.password);
  localCache.setCache("permission", permission.value);
  // 拼接成 JSON 字符串的形式发送给后端
  //   const str = {
  //     "username": loginForm.username,
  //     "password": loginForm.password,
  //     // ref 要使用 .value
  //     "perList": permission.value,
  //   }
  // console.log('str', str);
  // console.log('strJSON', JSON.stringify(str));
  //   输入的内容放到 vuex 里面，登录的时候从 vuex 拿账号
  store.$patch({
    username: loginForm.username,
    password: loginForm.password,
    permission: permission.value,
  })
}
</script>
<style scoped></style>

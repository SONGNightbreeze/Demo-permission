<template>
  <div>
    <label> 登录页面 </label>
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
      <button @click="loginHandle">登录</button>
    </div>
    <div>
      <h2>{{ store.username }}</h2>
      <h2>{{ store.password }}</h2>
      <h2>权限{{ store.permission }}</h2>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import { useRegister } from '../stores/register'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'
import { initDynamicRoutes } from '../router';

const store = useRegister();
const { push } = useRouter();

const loginForm = reactive({
  username: localCache.getCache("name") ?? "",
  password: localCache.getCache("password") ?? "",
})

const loginHandle = () => {
  initDynamicRoutes();
  console.log("useRouter",useRouter)
  if (
    store.username == loginForm.username &&
    store.password == loginForm.password
  ) {
    push({ name: "home" });
  } else {
    alert("账号或密码错误");
  }
}

</script>
<style scoped>
</style>
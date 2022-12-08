import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// import { useRegister } from "../stores/register.js";

// const { store } = useRegister();
// 为什么这里使用 store 来获取 pinia 类名的值就会报错
// 既然不能使用 pinia，可以尝试从 localStorage 类名获取
import localCache from '@/utils/cache'

const userRule = {
  path: "/users",
  component: () => import("../views/user.vue"),
};
const roleRule = {
  path: "/roles",
  component: () => import("../views/roles.vue"),
};
const goodRule = {
  path: "/goods",
  component: () => import("../views/goods.vue"),
};
const categoryRule = {
  path: "/categories",
  component: () => import("../views/categories.vue"),
};

// 路由规则和字符串的映射关系
const ruleMapping = {
  'user': userRule,
  'roles': roleRule,
  'goods': goodRule,
  'categories': categoryRule
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        // { path: "/home", component: HomeView },
        // 动态添加的内容
        // {
        //   path: "/user",
        //   name: "user",
        //   component: () => import("../views/user.vue"),
        // },
        // {
        //   path: "/goods",
        //   name: "goods",
        //   component: () => import("../views/goods.vue"),
        // },
        // {
        //   path: "/roles",
        //   name: "roles",
        //   component: () => import("../views/roles.vue"),
        // },
        // {
        //   path: "/categories",
        //   name: "categories",
        //   component: () => import("../views/categories.vue"),
        // },
      ],
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/register.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login.vue"),
    },
  ],
});

export default router;

export function initDynamicRoutes() {
  // console.log(router);
  const currentRoutes = router.options.routes
  // console.log("添加之前的currentRoutes", currentRoutes);
  const rightList = localCache.getCache("permission")
  // console.log("righeList", rightList)
  // rightList 获取到的是要给对象，forEach只能遍历数组
  // console.log("rightList。value", rightList._value);
  // rightList获取到了数组，但为什么 rightList.value 就是空 只能._value获取
  rightList.forEach(item => {
    // console.log('item1111', item); 可以获取到值
    // 现在没有区分是不是二级路由
    const temp = ruleMapping[item]
    console.log("temp", temp); // 已经能打印出路径
    // 现在的问题是放在 currentRoutes 哪里，
    // 还有 Home 页面展示的时候也不是全部展示，查询菜单栏里面如何展示方式更好
    // 从打印的 currentRoutes 里面找到要添加children的位置，是 home 下的children
    currentRoutes[0].children.push(temp)
  })
  console.log("添加后的currentRoutes", currentRoutes);
  router.addRoute(currentRoutes)
  // 查看router里面的内容，为什么不能匹配
  console.log(router)
}
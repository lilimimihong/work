import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

// import { getAll ,saveOrUpdate,deleteMenu, getEditMenuInfo} from "@/api/menus";
// import { ElMessage, ElMessageBox } from "element-plus";
// import type { MenuItem ,CreateOrUpdateMenu} from "@/api/menus";
// import router from "@/router/index"
const STORAGE_KEY = "MY_APP_TODO_LIST";

interface MenuItem {
  id: string;
  name: string;
  parentId: number | string;
  description: string;
  icon: string;
  shown: boolean;
  orderNum: number | string;
  status?: 'completed' | 'uncompleted';
  category?: string; 
}

export function useMenus() {
  const router = useRouter();
  const allMenus = ref<MenuItem[]>([]);
  
  const topMenu = computed(() => allMenus.value.filter(item => item.parentId === -1));

  const form = reactive<MenuItem>({
    id: "",
    name: "",
    parentId: -1,
    description: "",
    icon: "",
    shown: true,
    orderNum: 0,
    status: 'uncompleted',
    category: '学习' 
  });

  const msgText = computed(() => (form.id ? "修改" : "创建"));

  // 获取数据 
  const getAllMenus = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      allMenus.value = JSON.parse(data);
    } else {
      allMenus.value = [];
    }
  };

  // 保存数据
  const saveToLocalStorage = (data: MenuItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    allMenus.value = data;
  };

  // 回显数据
  const getMenuInfoById = (id: string) => {
    if (!id) {
      // 重置表单
      Object.assign(form, {
        id: "",
        name: "",
        parentId: -1,
        description: "",
        icon: "",
        shown: true,
        orderNum: 0,
        status: 'uncompleted',
        category: '学习'
      });
      return;
    }
    
    getAllMenus();
    const target = allMenus.value.find((item) => item.id == id);
    if (target) {
      Object.assign(form, target);
    }
  };

  // 提交
  const onSubmit = () => {
    getAllMenus();
    let newList = [...allMenus.value];

    if (form.id) {
      const index = newList.findIndex((item) => item.id == form.id);
      if (index !== -1) {
        newList[index] = { ...form };
      }
    } else {
      const newItem: MenuItem = {
        ...form,
        id: Date.now().toString(),
      };
      newList.push(newItem);
    }

    saveToLocalStorage(newList);
    ElMessage.success(form.id ? "修改成功" : "创建成功");
    router.back();
  };

  const handleDelete = (id: string) => {
    if(!confirm("确认删除吗？")) return;
    getAllMenus();
    const newList = allMenus.value.filter((item) => item.id != id);
    saveToLocalStorage(newList);
    ElMessage.success("删除成功");
  };

  const toggleStatus = (row: MenuItem, status: 'completed' | 'uncompleted') => {
    getAllMenus();
    const newList = allMenus.value.map(item => {
        if(item.id === row.id) {
            return { ...item, status: status }
        }
        return item;
    });
    saveToLocalStorage(newList);
    ElMessage.success(`状态已更新`);
  }

  return {
    allMenus,
    topMenu,
    form,
    msgText,
    getAllMenus,
    getMenuInfoById,
    onSubmit,
    handleDelete,
    toggleStatus
  };
}


// export function useMenus() {
//   //获取一级菜单
//   //1.先获取所有菜单
//   const allMenus = ref([] as MenuItem[]);
//   const getAllMenus = async () => {
//     const { data } = await getAll();
//     if (data.code === "000000") {
//       allMenus.value = data.data;
//     } else {
//       ElMessage.error("获取所有菜单失败");
//       throw new Error("获取所有菜单失败");
//     }
//   };
//   //2.再从所有菜单中过滤出一级菜单
// const topMenu = computed(()=>{return allMenus.value.filter(menu =>menu.level === 0)}) 

// //表单的响应式数据
// const form = ref({} as CreateOrUpdateMenu)

// //表单提交事件
// const onSubmit = async () =>{
//   const {data} = await saveOrUpdate(form.value)
//   if (data.code === "000000") {
//     ElMessage.success(`${msgText.value}菜单成功`);
//     router.push("/menus");
//   } else {
//     ElMessage.error(`${msgText.value}菜单失败`);
//     throw new Error(`${msgText.value}菜单失败`);
//   }
//   return
  
// }

// //删除菜单的事件处理函数
// const handleDelete =async (id:string) =>{
//   await ElMessageBox.confirm("确认删除该菜单？","提示", {
//     confirmButtonText: "确定",
//     cancelButtonText: "取消",
//   }).catch(() =>{
//     ElMessage.info("已取消删除")
//     return new Promise(() => {})//pendding
//   })

//   //调用接口函数
//   const {data} =await deleteMenu(id)
//   if(data.code === '000000' && data.data){
//     ElMessage.success("删除菜单成功")
//     //刷新菜单列表
//     getAllMenus()
//   }else{
//     ElMessage.error("删除菜单失败")
//     throw new Error("删除菜单失败")                                                      
//   }

// }

// //根据id获取菜单信息
// const getMenuInfoById =async (id:string) =>{
//   //2，根据id判断状态
//   if(!Number(id)){
//     isCreate.value = true
//   }else {
//     isCreate.value = false
//   }
// //通过接口获取信息
//   const {data} = await getEditMenuInfo(id)
//   if (data.code === "000000") {
//     form.value = data.data.menuInfo;
//   } else{
//     ElMessage.error("获取编辑菜单信息失败");
//     throw new Error("获取菜单信息失败");
//   }
// }

// //定义一个状态与提示文本
// const isCreate = ref(true)
// const msgText = computed(()=>isCreate.value? "创建菜单" : "更新菜单")

//   return {allMenus, getAllMenus, topMenu ,form, onSubmit, handleDelete,getMenuInfoById ,msgText}
  
// }

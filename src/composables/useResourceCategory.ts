//导入接口函数
import {getAll} from "@/api/resource-category"
import type { ResourceCategory } from "@/api/resource-category"
import { ElMessage, ElMessageBox } from "element-plus"
import { ref ,reactive} from "vue"
import { saveOrderUpdate } from '@/api/resource-category'
import {deleteCategory} from '@/api/resource-category'
//保存所有资源类别
export const allResourceCategory = ref([]as ResourceCategory[])
//获取所有资源类别
export const getAllResourceCategory = async () =>{
    const {data} = await getAll()
    if (data.code === "000000") {
        allResourceCategory.value = data.data
    } else {
        ElMessage.error('获取资源类别失败')
        throw new Error('获取资源类别失败')
    }
    
} 

//提交按钮事件
export const onSubmit = async() => {
    const {data} =await saveOrderUpdate(form).finally(()=>{
        dialogFormVisible.value = false
    })
    if(data.code === '000000') {
        ElMessage.success(`${msgText.value}资源类型成功`)
        getAllResourceCategory()
    } else {
        ElMessage.error(`${msgText.value}资源类型失败`)
        throw new Error(`${msgText.value}资源类型失败`)
    }
}

//删除资源类别
export const handleDelete =async (id : number ) =>{
  ElMessageBox.confirm('确认删除该资源类别吗？','提示',{
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(() =>{
    ElMessage.info('已取消删除')
    return new Promise(()=>{})
  })
  // console.log(row);
  const {data} = await deleteCategory(id)
  console.log(data);
  if (data.code === "000000") {
    ElMessage.success('删除成功')
    getAllResourceCategory()
  } else {
    ElMessage.error('删除失败')
    throw new Error('删除失败')
  }
  //
}

export const form = reactive({
  name: '',
 sort: 0,
 selected: false,
})
export const isCreate = ref(true)
export const msgText = ref('')
export const dialogFormVisible = ref(false)
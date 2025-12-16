import request from "@/utils/Request";

//定义类型
type Common<T> ={
    menuInfo: CreateOrUpdateMenu | { id?: number | undefined; parentId: number; name: string; icon: string; href: string; orderNum: number; description: string; shown: boolean; };
    code:string,
    mesg:string,
    time:string,
    data:T

}

//相当于data:T
export type MenuItem = {
    createTime:string,
    createdBy:string,
    description:string,
    icon:string,
    id:number,
    href:string,
    level:number,
    name:string,
    operatorId:number | null,
    orderNum:number,
    parentId:number,
    shown:boolean,
    updatedBy:string,
    updateTime:string,

}

//Common<MenuItem[]>
//获取所有菜单项
export const getAll = () =>{
    return request <Common<MenuItem[]>>({
        method: 'GET',
        url: '/boss/menu/getAll',
        
    })
}

//保存或新增菜单
export type CreateOrUpdateMenu = {
    id?:number,
    parentId:number,
    name:string,
    icon:string,
    href:string,
    orderNum:number,
    description:string,
    shown:boolean,
}
//写法2
/* type  CreateOrUpdateMenu = partial<MenuItem>   ------export type CreateOrUpdateMenu = pick<
             MenuItem,   
             "id" | "parentId"> & {id?:number}

**/

export const saveOrUpdate = (menuInfo:CreateOrUpdateMenu) =>{
    return request ({
        method: 'POST',
        url: '/boss/menu/saveOrUpdate',
        data: menuInfo,
    })
}

//删除惨淡
export const deleteMenu = (id:string) =>{
    return request<Common<boolean>>({
        method: 'DELETE',
        url: `/boss/menu/${id}`,
    })

}


type SubMenuList = MenuItem & {subMenuList: SubMenuList[] | null}
type EditMenuInfo = Common<{
    menuInfo: MenuItem
    parentMenuList: SubMenuList[]
}>

//获取指定id的菜单信息
export const getEditMenuInfo = (id:string) =>{
    return request<Common<EditMenuInfo>>({
        method: 'GET',
        url: "/boss/menu/getEditMenuInfo",
        params: {
            id:id,
        }
        })

}

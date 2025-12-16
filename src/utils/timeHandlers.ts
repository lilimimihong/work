import dayjs from 'dayjs';

export const timeFormatter = (row:any, column:any, value:string) =>{
    return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
}
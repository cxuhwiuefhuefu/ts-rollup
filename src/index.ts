/*
 * @Author: Sunny
 * @Date: 2022-08-24 16:09:42
 * @LastEditors: Suuny
 * @LastEditTime: 2022-08-24 18:27:03
 * @Description: 
 * @FilePath: /ts-rollup/src/index.ts
 */

const a: string = '---9900hh99999hh';
console.log(a, process.env.NODE_ENV);



if(process.env.NODE_ENV === 'development')  {
    alert('开发')
}else {
    alert('生产');
}
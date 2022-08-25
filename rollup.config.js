/*
 * @Author: Sunny
 * @Date: 2022-08-24 16:08:54
 * @LastEditors: Suuny
 * @LastEditTime: 2022-08-25 10:50:13
 * @Description: 
 * @FilePath: /ts-rollup/rollup.config.js
 */

console.log('-----', process.env.NODE_ENV)

import { nodeResolve } from '@rollup/plugin-node-resolve';
// 起来一个后端的服务
import ts from 'rollup-plugin-typescript2'
import path from 'path'
// 起来一个前端的服务
import serve from 'rollup-plugin-serve' 
// 热更新
import livereload from 'rollup-plugin-livereload';
// 代码压缩
import { terser } from "rollup-plugin-terser";
// 查找和替换的工具
import replace from 'rollup-plugin-replace'

const isDev = () => {
    return process.env.NODE_ENV === 'development'
}

export default {
    input: 'src/index.ts',
    output: {
        file: path.resolve(__dirname, 'dist/bundle.js'),
        // global: 弄个全局变量来接收
        // cjs: module.exports
        // esm: export default
        // iife: ()()
        // umd: 兼容 amd + commonjs 不支持es6导入
        format: 'iife',
        sourcemap: true, // ts中的sou rcemap也得变为true

    },
    plugins: [  // 这个插件是有执行顺序的
        terser({
            compress: {
                drop_console: true // 把 console 去掉
            }
        }),
        nodeResolve({
            extensions: ['.js', '.ts']
        }), 
        ts({
            tsconfig: path.  resolve(__dirname, 'tsconfig.json')
        }),
        isDev() && serve({
            port: 3000,
            contentBase: '', // 表示起的服务是在根目录下
            openPage: '/public/index.html', // 指定打开的是哪个文件
            open: true // 默认打开浏览器
        }),
        isDev() && livereload(), // 热更新
        replace({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        })
    ]
}
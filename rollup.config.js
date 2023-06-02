/*
 * Filename: c:\Users\檀庭稳\Desktop\webWatch\rollup.config.js
 * Path: c:\Users\檀庭稳\Desktop\webWatch
 * Created Date: Thursday, June 1st 2023, 2:28:37 pm
 * Author: lootoe-company
 *
 * Copyright (c) 2023 Your Company
 */
// 处理cjs模块
import commonjs from '@rollup/plugin-commonjs'
// 打包node_modules
import { nodeResolve } from '@rollup/plugin-node-resolve'
// 代码压缩
import terser from '@rollup/plugin-terser'

// utils的测试代码
// export default [
// {
//   input: './src/utils/errorCapture.js',
//   output: [
//     {
//       file: './test/errorCapture.js',
//       format: 'umd',
//       name: 'errorCapture',
//     },
//   ],
//   plugins: [commonjs(), nodeResolve(), terser()],
//   // 需要额外引入的包
// },
// {
//   input: './src/utils/domCapture.js',
//   output: [
//     {
//       file: './test/domCapture.js',
//       format: 'umd',
//       name: 'domCapture',
//     },
//   ],
//   plugins: [commonjs(), nodeResolve(), terser()],
//   // 需要额外引入的包
// },
// {
//   input: './src/utils/routerCapture.js',
//   output: [
//     {
//       file: './test/routerCapture.js',
//       format: 'umd',
//       name: 'routerCapture',
//     },
//   ],
//   plugins: [commonjs(), nodeResolve(), terser()],
//   // 需要额外引入的包
// },
// {
//   input: './src/utils/requestCapture.js',
//   output: [
//     {
//       file: './test/requestCapture.js',
//       format: 'umd',
//       name: 'requestCapture',
//     },
//   ],
//   plugins: [commonjs(), nodeResolve(), terser()],
//   // 需要额外引入的包
// },
// ]

export default [
  {
    input: './src/core/actionTracker.js',
    output: [
      {
        file: './test/actionTracker.js',
        format: 'umd',
        name: 'actionTracker',
      },
    ],
    plugins: [commonjs(), nodeResolve(), terser()],
  },
]

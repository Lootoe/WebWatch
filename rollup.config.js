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

export default [
  // {
  //   input: './src/core/actionTracker.js',
  //   output: [
  //     {
  //       file: './test/actionTracker/actionTracker.js',
  //       format: 'umd',
  //       name: 'actionTracker',
  //     },
  //   ],
  //   plugins: [commonjs(), nodeResolve(), terser()],
  // },
  {
    input: './src/core/ua.js',
    output: [
      {
        file: './test/ua/ua.js',
        format: 'umd',
        name: 'ua',
      },
    ],
    plugins: [commonjs(), nodeResolve(), terser()],
  },
]

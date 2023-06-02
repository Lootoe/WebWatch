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
  {
    input: './src/utils/errorCapture.js',
    output: [
      {
        file: './test/errorCapture.js',
        format: 'umd',
        name: 'errorCapture',
      },
    ],
    plugins: [commonjs(), nodeResolve(), terser()],
    // 需要额外引入的包
    // external: ['stacktracey'],
  },
]

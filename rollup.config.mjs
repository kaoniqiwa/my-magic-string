import replace from '@rollup/plugin-replace';

const plugins = [
  /**
   * replace({
   *  msg:"ANGULAR"
   * })
   * 项目中所有 msg 替换为 ANGULAR
   * console.log(msg)  => console.log(ANGULAR),ANGULAR 此处是当作变量名使用
   *
   * replace({
   *  msg:"'ANGULAR'"
   * })
   * console.log(msg) => console.log('ANGULAR')
   *
   *
   *
   */
  replace({
    DEBUG: false,
    preventAssignment: true,
  }),
];
export default [
  /**esm */
  {
    input: 'src/index.js',
    output: {
      file: 'dist/magic-string.es.mjs',
      format: 'es', // 默认 esm
      exports: 'named',
      sourcemap: true,
    },
    plugins,
  },
  /**cjs */
  {
    input: 'src/index.js',
    output: {
      file: 'dist/magic-string.cjs.js',
      format: 'cjs',
      exports: 'default', // 仅导出入口文件的 default 对象
      sourcemap: true,
    },
    plugins,
  },
  /**umd */
  {
    input: 'src/index.js',
    output: {
      file: 'dist/magic-string.umd.js',
      format: 'umd',
      exports: 'default',
      name: 'MagicString',
      sourcemap: true,
    },
    plugins,
  },
];

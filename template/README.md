{{name}}
============

关于(About)
---------
{{description}}

项目结构(Project folders & files)
---------
## 文件夹
- `bin`:启动脚本
{{#if gulp}}
- `build`:gulp构建文件夹
{{else}}
- `public`:公共资源文件夹
- `views`:模板文件夹
{{/if}}
- `common`:公共方法文件夹
- `config`:配置文件夹
- `controllers`:路由文件夹
- `enums`:枚举文件夹
- `middlewares`:中间件文件夹
- `modules`:模块列表,一般模块返回promise对象
{{#if mongoose}}
- `models`:mongodb model文件夹
- `proxy`:mongodb代理方法文件夹
{{/if}}
{{#if unit-test}}
- `test`:测试文件夹
{{/if}}

## 文件
{{#if eslint}}
- `.eslintrc.js`:eslint配置文件
{{/if}}
- `.gitignore`:git忽略文件
- `app.js`:项目启动文件
- `archive.js`:项目zip打包文件
{{#if gulp}}
- `gulpfile.js`:gulp处理文件
{{/if}}
- `router.js`:路由处理文件

命令(Command)
---------
```
//启动
npm start
{{#if gulp}}
//构建应用
npm run build
{{/if}}
//应用打包
npm run pack
{{#if unit-test}}
//单元测试
npm test
{{#if cov-test}}
//覆盖率测试
npm run test-cov
{{/if}}
{{/if}}
```
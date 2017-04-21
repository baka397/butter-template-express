Butter Cli Template for Express
============

关于(About)
---------
这是一个用于[butter-cli](https://www.npmjs.com/package/butter-cli)的模板项目  
This is a template project for [butter-cli](https://www.npmjs.com/package/butter-cli)

特性(feature)
---------
本模板通过[butter-cli](https://www.npmjs.com/package/butter-cli)帮助使用者构建完整的express项目,可选项包括:  
This template help user to build a complete express project by using [butter-cli](https://www.npmjs.com/package/butter-cli), options include:

- [redis](https://github.com/luin/ioredis)
- redis cluster
- redis session
- [mongoose](http://mongoosejs.com/)
- 外部API调用(api from other project)
- [eslint](http://eslint.org/)
- [unit-test](http://mochajs.org/)
- [cov-test](https://github.com/gotwarlost/istanbul)
- [gulp](http://gulpjs.com/)
- [less](http://lesscss.org/)

如何运行(How to work)
---------
[butter-cli](https://www.npmjs.com/package/butter-cli)通过读取`meta.js`对`./template`目录进行解析. 
[butter-cli](https://www.npmjs.com/package/butter-cli) parse files in `./template` to generate project files base on `meta.js`. 

## prompts
[butter-cli](https://www.npmjs.com/package/butter-cli)会通过`prompts`(一个数组)创建用户端的初始化选择项,遵照[Inquirer](https://github.com/SBoudrias/Inquirer.js#question)规则 
`butter-cli` will create cli options by using `prompts`(An array). You can check support `prompts` rule in [Inquirer](https://github.com/SBoudrias/Inquirer.js#question)

## filters
[butter-cli](https://www.npmjs.com/package/butter-cli)会根据`prompts`选择的结果从`filters`中筛选被过滤的文件或目录.该配置支持数组或字符串. 
[butter-cli](https://www.npmjs.com/package/butter-cli) will filter files base on `prompts` result & `filters` rule. This rule can use array or string. 

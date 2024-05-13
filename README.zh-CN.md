# Vuetify3 Plus

顾名思义，Vuetify3 Plus，不是一套全新的UI框架，而是对Vuetify 3的补充和加强。 

在我们把Vuetify从v2升级到v3的时候，Vuetify的最新版本是3.3.x，此时的组件库还不够完备，`VDataTable`、`VDatePicker`等尚在Labs积极开发中，`VTimePicker`、`VTreeView`等还不见踪影，而上述组件对To B应用来说是不可或缺的，加上部分组件不匹配我们的使用习惯，为了：

* 进一步扩大组件库；
* 补位尚在规划、开发中的组件；
* 提升组件的可用性、易用性；

我们只好自己动手寻找合适的替代品、扩展现有的组件库，最终的成果就是——Vuetify3 Plus，后期基于Vuetify 3.4.0+，部分组价（或灵感）来自于Element Plus和Quasar。

组件名称前缀——“C”，可以解释成“Core”、“Common”；

## 使用指南
### 表格
### 交互
### 表单（10）

#### 密码（CPassword）
```
<CPassword
    v-model="password"
    variant="outlined"
    density="compact"
    clearable>
</CPassword>
```
* 属性
  * 同`VTextField`；
* 事件
  * 同`VTextField`；
* 插槽
  * 无；
* 方法
  * 无；

#### 验证码（CCaptcha）
```
<CCaptcha
    v-model="captcha"
    :url="/test/captcha.png"
    variant="outlined"
    density="compact"
    clearable>
</CCaptcha>
```
* 属性 
  * 同`VTextField`；
  
  * | 名称  | 描述           | 类型     | 默认值 |
    | ----- | -------------- | -------- | ------ |
    | `url` | 验证码图片地址 | `string` | `null` |
* 事件
    * 同`VTextField`；
* 插槽
    * 无；
* 方法
    * 无；

#### 邮件（CEmail）
邮件地址输入自动补全。
```
<CEmail
    v-model="email"
    variant="outlined"
    density="compact"
    clearable>
</CEmail>
```
* 属性
    * 同`VTextField`；
    
    * | 名称      | 描述       | 类型    | 默认值                                                       |
      | --------- | ---------- | ------- | ------------------------------------------------------------ |
      | `servers` | 邮件服务器 | `array` | `['gmail.com', 'qq.com', '163.com', 'vip.163.com', '126.com', 'vip.126.com', 'outlook.com', 'hotmail.com', 'foxmail.com', '139.com', '188.com']` |
    
* 事件
    * 同`VTextField`；
    
* 插槽
    * 无；
    
* 方法
    * 无；

#### 日期选择（CDatePicker）
```
<CDatePicker
    v-model="date"
    label="日期"
    variant="outlined"
    density="compact"
    clearable>
</CDatePicker>
```
* 属性
  * 同`VTextField`；
* 事件
  * 同`VTextField`；
* 插槽
  * 无；
* 方法
  * 无；

#### 日期时间选择（CDatetimePicker）
```
<CDatetimePicker
    v-model="time"
    pick-second
    label="日期时间"
    variant="outlined"
    density="compact"
    clearable>
</CDatetimePicker>
```
* 属性
  * 同`VTextField`；
  
  * | 名称         | 描述                                                     | 类型      | 默认值       |
    | ------------ | -------------------------------------------------------- | --------- | ------------ |
    | `pickSecond` | 是否允许选择秒                                           | `boolean` | `false`      |
    | `dateFormat` | 日期格式                                                 | `string`  | `yyyy-MM-dd` |
    | `timeFormat` | 时间格式，值可由用户自定义，或者根据`pickSecond`的值变化 | `string`  | `HH:mm`      |
  
* 事件
  * 同`VTextField`；
  
* 插槽
  * 无；
  
* 方法
  * 无；

#### 级联选择（CDatetimePicker）
```
<CCascader
    v-model="productId"
    label="商品"
    url="/products.json"
    variant="outlined"
    density="compact"
    clearable>
</CCascader>
```
* 属性
  * 同`VTextField`；
  
  * | 名称           | 描述                                                    | 类型      | 默认值     |
    | -------------- | ------------------------------------------------------- | --------- | ---------- |
    | `items`        | 数据集                                                  | `array`   | `[]`       |
    | `url`          | 数据集API地址，若`items`的值不为空，则以`items`的值为主 | `string`  | `null`     |
    | `itemId`       | 数据项的值对应属性                                      | `string`  | `id`       |
    | `itemTitle`    | 数据项名称对应属性                                      | `string`  | `title`    |
    | `itemChildren` | 数据项子集对应属性                                      | `string`  | `children` |
    | `multiple`     | 是否允许多选                                            | `boolean` | `false`    |
  
* 事件
  * 同`VTextField`；
  
* 插槽
  * 无；
  
* 方法
  * 无；

#### 下拉选择（CSelect）

> 选择类的组件，如VSelect、VAutocomplete等，鉴于它们的属性、数据结构类似，并且，对它们有部分相同的扩展需求——比如通过URL加载数据，返回选中项的名称等，因此，创建了一个无渲染组件——BaseSelect来达到上述目的。

```
<CSelect
    v-model="productId"
    v-model:title="productTitle"
    label="商品"
    url="/test/products.json"
    variant="outlined"
    density="compact"
    clearable>
</CSelect>
```

* 属性 

  * 同`VSelect`；

  * | 名称        | 描述                                                    | 类型     | 默认值  |
    | ----------- | ------------------------------------------------------- | -------- | ------- |
    | `items`     | 数据集                                                  | `array`  | `[]`    |
    | `url`       | 数据集API地址，若`items`的值不为空，则以`items`的值为主 | `string` | `null`  |
    | `itemValue` | 数据项的值对应属性                                      | `string` | `id`    |
    | `itemTitle` | 数据项名称对应属性                                      | `string` | `title` |

* 事件

  * 同`VSelect`；

* 插槽

  * 无；

* 方法

  * 无；

#### 自动补全（CAutocomplete）

```
<CAutocomplete
    v-model="productId"
    v-model:title="productTitle"
    label="商品"
    url="/test/products.json"
    variant="outlined"
    density="compact"
    clearable>
</CAutocomplete>
```

* 属性 
  * 同`VSelect`和`CSelect`；
* 事件
  * 同`VAutocomplete`；
* 插槽
  * 无；
* 方法
  * 无；

#### 纸片组（CChipGroup）

```
<CAutocomplete
    v-model="productId"
    v-model:title="productTitle"
    label="商品"
    url="/test/products.json"
    variant="outlined"
    density="compact"
    clearable>
</CAutocomplete>
```

* 属性 
  * 同`VChipGroup`和`CSelect`；
  * 前缀是`chip-`的属性同`VChip`；
* 事件
  * 同`VChipGroup`；
* 插槽
  * 无；
* 方法
  * 无；

#### 上传文件（CFileUpload）

与`VFileInput`仅是一个输入框不同，`CFileUpload`能够识别文件类型，若文件是图片，则允许预览，否则支持下载。

```
<CFileUpload
    v-model="fileId"
    label="上传文件"
    upload-file-url="/api/test/files/upload"
    browse-file-url="/api/test/files/download"
    variant="outlined"
    density="compact"
    clearable>
</CFileUpload>
```

* 属性 

  * 同`VFileInput`；

  * | 名称            | 描述                                                         | 类型     | 默认值 |
    | --------------- | ------------------------------------------------------------ | -------- | ------ |
    | `uploadFileUrl` | 文件上传地址，该API需要接收参数upload，返回文件信息，文件信息包含名称、缩略图、类型等。文件类型同MIME。 | `string` | `null` |
    | `browseFileUrl` | 文件预览、下载地址，该API需要接收参数fileId（文件ID），并且支持`HEAD`方法，响应头中包含文件信息`file-info`。 | `string` | `null` |

* 事件

  * 同`VFileInput`；

* 插槽

  * 无；

* 方法

  * 无；

### 图表

### 统计
### 其他
# Vuetify3 Plus

顾名思义，Vuetify3 Plus，不是一套全新的UI框架，而是对Vuetify 3的补充和加强。

在我们把Vuetify从v2升级到v3的时候，Vuetify的最新版本是3.3.x，此时的组件库还不够完备，`VDataTable`、`VDatePicker`等尚在Labs积极开发中，`VTimePicker`、`VTreeView`等还不见踪影，而上述组件对To B应用来说是不可或缺的，加上部分组件不匹配我们的使用习惯，为了：

* 进一步扩大组件库；
* 补位尚在规划、开发中的组件；
* 提升组件的可用性、易用性；

我们只好自己动手寻找合适的替代品、扩展现有的组件库，最终的成果就是——Vuetify3 Plus，后期基于Vuetify 3.4.0+，部分组价（或灵感）来自于Element Plus和Quasar。

组件名称前缀——“C”，可以解释成“Core”、“Common”；

## 安装方法

1. 克隆Vuetify3-Plus项目源码：

   ```
   git clone https://github.com/Warnier-zhang/Vuetify3-Plus.git
   ```

2. 编译、打包项目：

   ```
   npm install && npm run build
   ```

3. 在新项目中，编辑`package.json`文件，引入Vuetify3 Plus，并安装：

   ```
   package.json
   ---
   "dependencies": {
       ...
       "vuetify3-plus": "file:../Vuetify3-Plus",
       ...
   }
   
   npm install
   ```

### 运行示例

在克隆下来的项目源码中，执行`npm run dev`脚本，然后，访问http://localhost:5173

## 使用指南
### 表格（3）

#### 增删改查表格（CCrudTable）

扩展自`VDataTableServer`组件，在保留`VDataTableServer`用法、优点的基础上，参考**EasyUI**、**miniUI**时代的`DataGrid`，进一步封装查询、新增、更新、删除、过滤、刷新、导出Excel等操作逻辑。

```
<CCrudTable
    title="文件资源管理器"
    :columns="columns"
    fixed-index
    load-items-url="/api/file-explorer/files/search"
    add-item-url="/api/file-explorer/files/save"
    update-item-url="/api/file-explorer/files/save"
    remove-item-url="/api/file-explorer/files/delete"
    show-refresh-btn
    show-export-btn
    show-icon-btn
    row-key="id"
    row-title="name">
	...

    <template v-slot:filter="{ conditions }">
		...
    </template>
    
    ...
    
    <template v-slot:editor="{ editedItem, type }">
		...
    </template>
    
    ...
</CCrudTable>
```

[完整的示例参考Table1.vue](./src/demos/Table1.vue)

效果图：

![CCrudTable](./images/c-crud-table1.png)

![CCrudTable](./images/c-crud-table2.png)

![CCrudTable](./images/c-crud-table3.png)

![CCrudTable](./images/c-crud-table4.png)

* 属性

  * | 名称                 | 描述                                                         | 类型      | 默认值   |
    | -------------------- | ------------------------------------------------------------ | --------- | -------- |
    | `title`              | 标题                                                         | `string`  | `null`   |
    | `columns`            | 表头列，同`VDataTableServer`的`headers`属性                  | `array`   | `[]`     |
    | `total`              | 数据集总数，同`VDataTableServer`的`items-length`属性         | `array`   | `0`      |
    | `data`               | 数据集记录，同`VDataTableServer`的`items`属性                | `array`   | `[]`     |
    | `showIndex`          | 是否显示序号列                                               | `boolean` | `true`   |
    | `fixedIndex`         | 是否固定序号列                                               | `boolean` | `false`  |
    | `showOperation`      | 是否显示操作列                                               | `boolean` | `true`   |
    | `showIconBtn`        | 是否显示图标按钮                                             | `boolean` | `false`  |
    | `showAddBtn`         | 是否显示新增按钮                                             | `boolean` | `true`   |
    | `showRefreshBtn`     | 是否显示刷新按钮                                             | `boolean` | `false`  |
    | `showFilterBtn`      | 是否显示过滤按钮                                             | `boolean` | `true`   |
    | `showExportBtn`      | 是否显示导出按钮                                             | `boolean` | `false`  |
    | `exportExcel`        | 是否以Excel形式导出                                          | `boolean` | `true`   |
    | `showUpdateBtn`      | 是否显示更新按钮                                             | `boolean` | `true`   |
    | `showDeleteBtn`      | 是否显示删除按钮                                             | `boolean` | `true`   |
    | `loadItemsUrl`       | 加载记录API地址，返回值必须包含`total`、`items`属性，例如：`{total: 10, items: [{...}, ...]}` | `string`  | `null`   |
    | `loadItemsImmediate` | 是否立即加载                                                 | `boolean` | `true`   |
    | `filterCondition`    | 默认的过滤条件                                               | `object`  | `{}`     |
    | `addItemUrl`         | 新增记录API地址                                              | `string`  | `null`   |
    | `updateItemUrl`      | 更新记录API地址                                              | `string`  | `null`   |
    | `removeItemUrl`      | 删除记录API地址                                              | `string`  | `null`   |
    | `rowKey`             | 记录ID对应的属性                                             | `string`  | `null`   |
    | `rowTitle`           | 记录名称对应的属性                                           | `string`  | `null`   |
    | `sortMode`           | 排序模式，可选值有`client`、`server`，支持客户端、服务端排序 | `string`  | `server` |
    | `sortKey`            | 默认的排序属性                                               | `string`  | `null`   |
    | `sortOrder`          | 默认的排序顺序                                               | `string`  | `null`   |
    | `disablePagination`  | 是否禁用分页                                                 | `boolean` | `false`  |
    | `widthPadding`       | 多余的宽度，用于计算表格宽度，实现宽度自适应                 | `number`  | `-1`     |
    | `heightPadding`      | 多余的高度，用于计算表格高度，实现高度自适应                 | `number`  | `-1`     |
    
  * 其中，`columns`属性：

    * 同`VDataTableServer`的`headers`属性；

    * | 名称         | 描述                                                         | 类型       | 默认值      |
      | ------------ | ------------------------------------------------------------ | ---------- | ----------- |
      | `type`       | 列类型，若值为`code`，则是代码类型，代码列的最终显示由`codes`，或`url`加载到代码集确定 | `string`   | `null`      |
      | `codes`      | 代码集                                                       | `array`    | `[]`        |
      | `url`        | 代码集API地址，若`codes`的值不为空，则以`codes`的值为主      | `string`   | `null`      |
      | `codesRef`   | 与其他代码列共享代码集，值同属性`key`                        | `string`   | `null`      |
      | `codeName`   | 代码名称对应的属性                                           | `string`   | `null`      |
      | `codeValue`  | 代码值对应的属性                                             | `string`   | `null`      |
      | `renderable` | 是否允许自定义列显示效果，需要配合`item.${string}`插槽一起使用 | `boolean`  | `false`     |
      | `hidden`     | 列是否隐藏                                                   | `boolean`  | `false`     |
      | `editable`   | 列是否允许编辑                                               | `boolean`  | `true`      |
      | `default`    | 列的默认值，**用于新增**                                     | `function` | `undefined` |
      | `converter`  | 列的值转换器，**用于新增、更新**                             | `function` | `undefined` |
      | `exportable` | 列是否允许导出                                               | `boolean`  | `true`      |
      | `excelValue` | 列的值转换器，**用于导出**                                   | `function` | `undefined` |

* 事件

  * | 名称           | 描述                 | 参数                                                         |
    | -------------- | -------------------- | ------------------------------------------------------------ |
    | `load`         | 在加载记录**时**触发 | `{conditions: 过滤条件, sortState: 排序方式, page: 页码, size: 每页条数}` |
    | `after-load`   | 在加载记录**后**触发 | `{total: 总数, items: 记录，conditions: 过滤条件, sortState: 排序方式, page: 页码, size: 每页条数}` |
    | `add`          | 在新增记录**时**触发 | `{editedItem: 编辑的记录, conditions: 过滤条件, sortState: 排序方式}` |
    | `after-add`    | 在新增记录**后**触发 |                                                              |
    | `update`       | 在更新记录**时**触发 | `{editedItem: 编辑的记录, conditions: 过滤条件, sortState: 排序方式}` |
    | `after-update` | 在更新记录**后**触发 |                                                              |
    | `remove`       | 在删除记录**时**触发 | `{id: 记录ID, conditions: 过滤条件, sortState: 排序方式}`    |
    | `after-remove` | 在删除记录**后**触发 |                                                              |
    | `export`       | 在导出记录**时**触发 | `{items: 记录，conditions: 过滤条件}`                        |

* 插槽

  * | 名称                   | 描述                                       | 作用域                                                       |
    | ---------------------- | ------------------------------------------ | ------------------------------------------------------------ |
    | `title`                | 表格名称                                   |                                                              |
    | `more-operations`      | 标题栏除了新增、刷新、导出额外的操作       | `{items: 记录}`                                              |
    | `top`                  | 表格上方区域                               |                                                              |
    | `item.${string}`       | 同`VDataTableServer`的插槽`item.${string}` | `{item: 当前记录, value: 值}`                                |
    | `item.more-operations` | 记录行除了更新、删除额外的操作             | `{item: 当前记录}`                                           |
    | `filter`               | 过滤表单                                   | `{conditions: 过滤条件}`                                     |
    | `editor`               | 编辑表单                                   | `{editorType: add（新增） / update（更新）, editedItem: 编辑的记录}` |
    | `bottom`               | 表格下方区域                               | `{total: 总数, items: 记录, page: 页数, size: 每页数目}`     |

* 方法

  * | 名称            | 描述         | 参数                                  | 返回值 |
    | --------------- | ------------ | ------------------------------------- | ------ |
    | `reload`        | 重新加载记录 |                                       |        |
    | `onAddClick`    | 打开新增弹窗 | `title: 标题`                         |        |
    | `onUpdateClick` | 打开编辑弹窗 | `item: 编辑的记录`<br />`title: 标题` |        |

#### （虚拟滚动）增删改查表格（CCrudTableV2）

扩展自`VDataTableVirtual`组件，扩展内容同`CCrudTable`。

```
<CCrudTableV2
    title="文件资源管理器"
    :columns="columns"
    fixed-index
    load-items-url="/api/file-explorer/files/search"
    add-item-url="/api/file-explorer/files/save"
    update-item-url="/api/file-explorer/files/save"
    remove-item-url="/api/file-explorer/files/delete"
    show-refresh-btn
    show-export-btn
    show-icon-btn
    row-key="id"
    row-title="name">
    ...
</CCrudTableV2>
```

[完整的示例参考Table2.vue](./src/demos/Table2.vue)

* 属性
  * 同`CCrudTable`；
* 事件

  * 同`CCrudTable`；
* 插槽

  * 同`CCrudTable`；
* 方法
  * 同`CCrudTable`；


### 交互（3）

#### 消息框（CMessage）

```
import {CMessage} from 'vuetify3-plus';

CMessage.success('Hello, World');
CMessage.info('Hello, World');
CMessage.warning('Hello, World');
CMessage.error('Hello, World');
```

* 属性

  * 无；

* 事件

  * 无；

* 插槽

  * 无；

* 方法

  | 名称      | 描述                  | 参数       | 返回值 |
  | --------- | --------------------- | ---------- | ------ |
  | `success` | 显示`success`类型消息 | `[string]` | 无     |
  | `info`    | 显示`info`类型消息    | `[string]` | 无     |
  | `warning` | 显示`warning`类型消息 | `[string]` | 无     |
  | `error`   | 显示`error`类型消息   | `[string]` | 无     |

#### 弹出框（CModal）

用于替代`window.alert`、`window.confirm`和`window.prompt`。

```
import {CModal} from 'vuetify3-plus';

CModal.alert({
    title: 'Alert',
    message: 'Hello, World',
});

CModal.confirm({
    title: 'Confirm',
    message: 'Are you OK?',
    onOkClick() {
    	CMessage.success('Yes');
    },
    onCancelClick() {
    	CMessage.error('No');
    },
});

CModal.prompt({
    title: 'Prompt',
    message: 'Please input numbers:',
    onOkClick(input) {
    	CMessage.success(`Numbers are ${input}`);
    },
    onCancelClick() {
    	CMessage.error('Cancel');
    },
});
```

* 属性

  * 无；

* 事件

  * 无；

* 插槽

  * 无；

* 方法

  | 名称      | 描述                             | 参数          | 返回值 |
  | --------- |-------------| ---------- | ------ |
  | `alert`   | 显示警告弹窗，并等待用户关闭     | `[object]`  | 无     |
  | `confirm` | 显示确认弹窗，并等待用户确定     | `[object]`  | 无     |
  | `prompt`  | 显示输入弹窗，并返回用户输入结果 | `[object]`  | 无     |
  
  参数说明：
  
  ```
  {
      title: 标题,
      message: 消息,
      onOkClick: 回调函数，当用户点击确定按钮时触发,
      onCancelClick: 回调函数，当用户点击取消按钮时触发,
  }
  ```

#### 加载（CLoading）

```
import {CLoading} from 'vuetify3-plus';

CLoading.open();
CLoading.close();
```

* 属性

  * 无；

* 事件

  * 无；

* 插槽

  * 无；

* 方法

  | 名称    | 描述     | 参数 | 返回值 |
  | ------- | -------- | ---- | ------ |
  | `open`  | 显示加载 | 无   | 无     |
  | `close` | 关闭加载 | 无   | 无     |

### 表单（11）

#### 密码（CPassword）

```
<CPassword
    v-model="password"
    variant="outlined"
    density="compact"
    clearable>
</CPassword>
```
效果图：

![CPassword](./images/c-password.png)

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
    url="/demos/captcha.jpg"
    variant="outlined"
    density="compact"
    clearable>
</CCaptcha>
```
效果图：

![CCaptcha](./images/c-captcha.png)

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
效果图：

![CEmail](./images/c-email.png)

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
效果图：

![CDatePicker](./images/c-datepicker.png)

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
效果图：

![CDatetimePicker](./images/c-datetimepicker.png)

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

#### 级联选择（CCascader）
```
<CCascader
    v-model="productId1"
    label="商品"
    url="/demos/products1.json"
    variant="outlined"
    density="compact"
    multiple
    clearable>
</CCascader>
```
效果图：

![CCascader](./images/c-cascader.png)

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

#### 树形选择（CTree）

```
<CTree
    v-model="productId"
    label="商品"
    url="/demos/products1.json"
    variant="outlined"
    density="compact"
    multiple
    clearable>
</CTree>
```

效果图：

![CTree](./images/c-tree.png)

* 属性

  * 同`CCascader`；

  * | 名称         | 描述                                                         | 类型      | 默认值  |
    | ------------ | ------------------------------------------------------------ | --------- | ------- |
    | `simple`     | 是否支持简单数据格式，例如：`[{id: 1, title: "蔬菜"}, {id: 11, pid: 1, title: "白菜"}...]` | `boolean` | `false` |
    | `itemParent` | 数据项父记录对应属性                                         | `string`  | `pid`   |

* 事件

  * 同`CCascader`；

* 插槽

  * 无；

* 方法

  * 无；

#### 下拉选择（CSelect）

> 选择类的组件，如VSelect、VAutocomplete等，鉴于它们的属性、数据结构类似，并且，对它们有部分相同的扩展需求——比如通过URL加载数据，返回选中项的名称等，因此，创建了一个无渲染组件——BaseSelect来达到上述目的。

```
<CSelect
    v-model="productId2"
    v-model:title="productTitle2"
    label="商品"
    url="/demos/products2.json"
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
      | `itemValue` | 数据项的值对应属性                                      | `string` | `value` |
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
    v-model="productId2"
    v-model:title="productTitle2"
    label="商品"
    url="/demos/products2.json"
    variant="outlined"
    density="compact"
    clearable>
</CAutocomplete>
```

* 属性
    * 同`VAutocomplete`和`CSelect`；
* 事件
    * 同`VAutocomplete`；
* 插槽
    * 无；
* 方法
    * 无；

#### 纸片组（CChipGroup）

```
<CChipGroup
    v-model="productId2"
    url="/demos/products2.json"
    selected-class="text-warning"
    column
    chip-size="small"
    chip-variant="outlined"
    chip-filter>
</CChipGroup>
```

效果图：

![CChipGroup](./images/c-chipgroup.png)

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
    upload-file-url="/api/file-explorer/files/upload"
    browse-file-url="/api/file-explorer/files/download"
    variant="outlined"
    density="compact"
    clearable>
</CFileUpload>
```

效果图：

![CFileUpload](./images/c-fileupload1.png)

![CFileUpload](./images/c-fileupload2.png)

![CFileUpload](./images/c-fileupload3.png)

* 属性

    * 同`VFileInput`；

    * | 名称            | 描述                                                         | 类型     | 默认值 |
      | --------------- | ------------------------------------------------------------ | -------- | ------ |
      | `uploadFileUrl` | 文件上传地址，该API需要接收参数`upload`，返回文件信息，文件信息包含名称、缩略图、类型等。文件类型同MIME。 | `string` | `null` |
      | `browseFileUrl` | 文件预览、下载地址，该API需要接收参数`id`（文件ID），并且支持`HEAD`方法，响应头中包含文件信息`file-info`。 | `string` | `null` |

* 事件

    * 同`VFileInput`；

* 插槽

    * 无；

* 方法

    * 无；

### 图表（8）

> 图表类的组件，如CLineChart、CPieChart等，鉴于它们的属性、数据结构类似，并且，对它们有部分相同的扩展需求——比如通过URL加载数据，锁定宽高比、本地化等，因此，创建了一个公共的组件——BaseChart来达到上述目的。

#### 折线图（CLineChart）

```
<CLineChart
    url="/demos/chart-data1.json"
    title="浏览器份额排行榜"
    subtitle="2024"
    x-axis-title="浏览器"
    y-axis-title="市占率"
    y-axis-unit="%"
    :smooth="true"
    :steped="false"
    :aspect-ratio="1">
</CLineChart>

<CLineChart
    url="/demos/chart-data2.json"
    title="2014、2024年浏览器份额排行榜"
    subtitle="近十年"
    x-axis-title="浏览器"
    y-axis-title="市占率"
    y-axis-unit="%"
    show-legend
    :show-point="false"
    multiple
    :aspect-ratio="1">
</CLineChart>
```

效果图：

![CLineChart](./images/c-line-chart.png)

* 属性

  * | 名称            | 描述                                                         | 类型               | 默认值      |
    | --------------- | ------------------------------------------------------------ | ------------------ | ----------- |
    | `title`         | 标题                                                         | `string`           | `null`      |
    | `subtitle`      | 副标题                                                       | `string`           | `null`      |
    | `xAxisType`     | X轴类型，值同ECharts的`xAxis. type`属性                      | `string`           | `category`  |
    | `xAxisTitle`    | X轴名称                                                      | `string`           | `null`      |
    | `xAxisScale`    | X轴是否不从0开始                                             | `boolean`          | `false`     |
    | `yAxisType`     | Y轴类型，值同ECharts的`yAxis. type`属性                      | `string`           | `value`     |
    | `yAxisTitle`    | Y轴名称                                                      | `string`           | `null`      |
    | `yAxisScale`    | Y轴是否不从0开始                                             | `boolean`          | `false`     |
    | `yAxisUnit`     | Y轴单位                                                      | `string`           | `null`      |
    | `yAxisMin`      | Y轴最小值                                                    | `string`、`number` | `null`      |
    | `yAxisMax`      | Y轴最大值                                                    | `string`、`number` | `null`      |
    | `series`        | 数据集，`key-value`方式                                      | `array`            | `[]`        |
    | `url`           | 数据集API访问地址，若`series`的值不为空，则以`series`的值为主 | `string`           | `null`      |
    | `itemSerieName` | 序列名称对应的属性                                           | `string`           | `serieName` |
    | `itemName`      | 点名称对应的属性                                             | `string`           | `name`      |
    | `nameTitle`     | 点名称的标题，**适用于气泡图**                               | `string`           | `''`        |
    | `itemX`         | X轴对应的属性                                                | `string`           | `x`         |
    | `itemY`         | Y轴对应的属性                                                | `string`           | `y`         |
    | `itemZ`         | Z轴对应的属性，配合`pointSize`属性，用于确定气泡大小，**适用于气泡图** | `string`           | `null`      |
    | `pointSize`     | 气泡大小                                                     | `number`           | `10`        |
    | `aspectRatio`   | 宽高比                                                       | `string`、`number` | `auto`      |
    | `multiple`      | 是否支持多个序列                                             | `boolean`          | `false`     |
    | `showPoint`     | 是否显示点                                                   | `boolean`          | `true`      |
    | `showLegend`    | 是否显示图例                                                 | `boolean`          | `false`     |
    | `lines`         | 划线                                                         | `array`            | `[]`        |
    | `smooth`        | 是否显示平滑曲线，**适用于折线图、面积图**                   | `boolean`          | `false`     |
    | `steped`        | 是否显示梯形折线，**适用于折线图、面积图**                   | `boolean`          | `false`     |
    | `stacked`       | 是否折叠，**适用于柱形图**                                   | `boolean`          | `false`     |
    | `exponent`      | 数量级，**适用于气泡图**。气泡图中气泡的大小由`itemY`的值决定，`10^exponent`用于缩放 | `string`、`number` | `1`         |

* 事件

  * 无；

* 插槽

  * 无；

* 方法

  * 无；

#### 面积图（CAreaChart）

```
<CAreaChart
    url="/demos/chart-data1.json"
    title="浏览器份额排行榜"
    subtitle="2024"
    x-axis-title="浏览器"
    y-axis-title="市占率"
    y-axis-unit="%"
    :aspect-ratio="1">
</CAreaChart>

<CAreaChart
    url="/demos/chart-data2.json"
    title="2014、2024年浏览器份额排行榜"
    subtitle="近十年"
    x-axis-title="浏览器"
    y-axis-title="市占率"
    y-axis-unit="%"
    show-legend
    multiple
    :aspect-ratio="1">
</CAreaChart>
```

效果图：

![CAreaChart](./images/c-area-chart.png)

* 属性

  * 同`CLineChart`；
* 事件

  * 无；
* 插槽

  * 无；
* 方法

  * 无；

#### 柱形图（CColumnChart）

```
<CColumnChart
    url="/demos/chart-data1.json"
    title="浏览器份额排行榜"
    subtitle="2024"
    x-axis-title="浏览器"
    y-axis-title="市占率"
    y-axis-unit="%"
    :aspect-ratio="1">
</CColumnChart>

<CColumnChart
    url="/demos/chart-data2.json"
    title="2014、2024年浏览器份额排行榜"
    subtitle="近十年"
    x-axis-title="浏览器"
    y-axis-title="市占率"
    y-axis-unit="%"
    show-legend
    multiple
    :stacked="false"
    :aspect-ratio="1">
</CColumnChart>
```

效果图：

![CColumnChart](./images/c-column-chart.png)

* 属性

  * 同`CLineChart`；
* 事件

  * 无；
* 插槽

  * 无；
* 方法

  * 无；

#### 气泡图（CBubbleChart）

```
<CBubbleChart
    url="/demos/chart-data1.json"
    title="浏览器份额排行榜"
    subtitle="2024"
    x-axis-title="浏览器"
    y-axis-title="市占率"
    y-axis-unit="%"
    :exponent="0.1"
    :aspect-ratio="1">
</CBubbleChart>

<CBubbleChart
    url="/demos/chart-data2.json"
    title="2014、2024年浏览器份额排行榜"
    subtitle="近十年"
    x-axis-title="浏览器"
    y-axis-title="市占率"
    y-axis-unit="%"
    :exponent="0.1"
    show-legend
    multiple
    :aspect-ratio="1">
</CBubbleChart>
```

效果图：

![CBubbleChart](./images/c-bubble-chart.png)

* 属性

  * 同`CLineChart`；
* 事件

  * 无；
* 插槽

  * 无；
* 方法

  * 无；

#### 饼图（CPieChart）

```
<CPieChart
    url="/demos/chart-data1.json"
    title="浏览器份额排行榜"
    subtitle="2024"
    item-value="y"
    value-unit="%"
    :aspect-ratio="1">
</CPieChart>
```

效果图：

![CPieChart](./images/c-pie-chart.png)

* 属性

  * | 名称          | 描述                                                         | 类型               | 默认值  |
    | ------------- | ------------------------------------------------------------ | ------------------ | ------- |
    | `title`       | 标题                                                         | `string`           | `null`  |
    | `subtitle`    | 副标题                                                       | `string`           | `null`  |
    | `series`      | 数据集，`key-value`方式                                      | `array`            | `[]`    |
    | `url`         | 数据集API访问地址，若`series`的值不为空，则以`series`的值为主 | `string`           | `null`  |
    | `itemName`    | 名称对应的属性                                               | `string`           | `name`  |
    | `itemValue`   | 值对应的属性                                                 | `string`           | `value` |
    | `valueUnit`   | 值的单位                                                     | `string`           | `''`    |
    | `aspectRatio` | 宽高比                                                       | `string`、`number` | `auto`  |
    | `showLegend`  | 是否显示图例                                                 | `boolean`          | `false` |
    | `rounded`     | 是否显示圆角分割                                             | `boolean`          | `false` |

* 事件

  * 无；

* 插槽

  * 无；

* 方法

  * 无；

#### 环形图（CDonutChart）

```
<CDonutChart
    url="/demos/chart-data1.json"
    title="浏览器份额排行榜"
    subtitle="2024"
    item-value="y"
    value-unit="%"
    :rounded="false"
    :aspect-ratio="1">
</CDonutChart>
```

效果图：

![CDonutChart](./images/c-donut-chart.png)

* 属性

  * 同`CPieChart`；
* 事件

  * 无；
* 插槽

  * 无；
* 方法

  * 无；

#### 半环形图（CHalfDonutChart）

```
<CHalfDonutChart
    url="/demos/chart-data1.json"
    title="浏览器份额排行榜"
    subtitle="2024"
    item-value="y"
    value-unit="%"
    :aspect-ratio="1">
</CHalfDonutChart>
```

效果图：

![CHalfDonutChart](./images/c-half-donut-chart.png)

* 属性

  * 同`CPieChart`；
* 事件

  * 无；
* 插槽

  * 无；
* 方法

  * 无；

#### 鸡冠花图（CCoxcombChart）

```
<CCoxcombChart
    url="/demos/chart-data1.json"
    title="浏览器份额排行榜"
    subtitle="2024"
    item-value="y"
    value-unit="%"
    :aspect-ratio="1">
</CCoxcombChart>
```

效果图：

![CCoxcombChart](./images/c-coxcomb-chart.png)

* 属性

  * 同`CPieChart`；
* 事件

  * 无；
* 插槽

  * 无；
* 方法

  * 无；

### 统计（7）

#### v1（CStat1）

```
<CStat1
    title="245k"
    subtitle="Sales"
    text="Calculated in last 7 days"
    color="red"
    variant="text">
</CStat1>
```

效果图：

![CStat1](./images/c-stat1.png)

* 属性

  * | 名称       | 描述   | 类型     | 默认值 |
    | ---------- | ------ | -------- | ------ |
    | `title`    | 标题   | `string` | `null` |
    | `subtitle` | 副标题 | `string` | `null` |
    | `text`     | 文本   | `string` | `null` |

* 事件

  * 无；

* 插槽

  * | 名称       | 描述   | 作用域 |
    | ---------- | ------ | ------ |
    | `title`    | 标题   | 无     |
    | `subtitle` | 副标题 | 无     |
    | `text`     | 文本   | 无     |

* 方法

  * 无；

#### v2（CStat2）

```
<CStat2
    title="245k"
    subtitle="Sales"
    icon="mdi-trending-up"
    color="red"
    text="Calculated in last 7 days">
</CStat2>
```

效果图：

![CStat2](./images/c-stat2.png)

* 属性

  * | 名称       | 描述         | 类型     | 默认值 |
    | ---------- | ------------ | -------- | ------ |
    | `title`    | 标题         | `string` | `null` |
    | `subtitle` | 副标题       | `string` | `null` |
    | `text`     | 文本         | `string` | `null` |
    | `icon`     | 图标         | `string` | `null` |
    | `color`    | 颜色（图标） | `string` | `null` |

* 事件

  * 无；

* 插槽

  * | 名称    | 描述 | 作用域 |
    | ------- | ---- | ------ |
    | `title` | 标题 | 无     |
    | `icon`  | 图标 | 无     |
    | `text`  | 文本 | 无     |

* 方法

  * 无；

#### v3（CStat3）

```
<CStat3
    title="245k"
    subtitle="Sales"
    color="red"
    expected="999"
    actual="245">
</CStat3>
```

效果图：

![CStat3](./images/c-stat3.png)

* 属性

  * | 名称       | 描述           | 类型               | 默认值 |
    | ---------- | -------------- | ------------------ | ------ |
    | `title`    | 标题           | `string`           | `null` |
    | `subtitle` | 副标题         | `string`           | `null` |
    | `color`    | 颜色（进度条） | `string`           | `null` |
    | `actual`   | 实际值         | `string`、`number` | `null` |
    | `expected` | 预期值         | `string`、`number` | `null` |

* 事件

  * 无；

* 插槽

  * | 名称       | 描述   | 作用域 |
    | ---------- | ------ | ------ |
    | `title`    | 标题   | 无     |
    | `subtitle` | 副标题 | 无     |

* 方法

  * 无；

#### v4（CStat4）

```
<CStat4
    title="245k"
    subtitle="Sales"
    text="Calculated in last 7 days"
    emphasis="+15%"
    color="red">
</CStat4>
```

效果图：

![CStat4](./images/c-stat4.png)

* 属性

  * | 名称       | 描述               | 类型     | 默认值 |
    | ---------- | ------------------ | -------- | ------ |
    | `title`    | 标题               | `string` | `null` |
    | `subtitle` | 副标题             | `string` | `null` |
    | `text`     | 文本               | `string` | `null` |
    | `emphasis` | 强调               | `string` | `null` |
    | `color`    | 颜色（标记、强调） | `string` | `null` |

* 事件

  * 无；

* 插槽

  * | 名称       | 描述   | 作用域 |
    | ---------- | ------ | ------ |
    | `title`    | 标题   | 无     |
    | `subtitle` | 副标题 | 无     |
    | `text`     | 文本   | 无     |
    | `emphasis` | 强调   | 无     |

* 方法

  * 无；

#### v5（CStat5）

```
<CStat5
    title="245k"
    subtitle="Sales"
    text="Calculated in last 7 days"
    icon="mdi-trending-up"
    color="red">
</CStat5>
```

效果图：

![CStat5](./images/c-stat5.png)

* 属性

  * | 名称       | 描述         | 类型     | 默认值 |
    | ---------- | ------------ | -------- | ------ |
    | `title`    | 标题         | `string` | `null` |
    | `subtitle` | 副标题       | `string` | `null` |
    | `text`     | 文本         | `string` | `null` |
    | `icon`     | 图标         | `string` | `null` |
    | `color`    | 颜色（图标） | `string` | `null` |

* 事件

  * 无；

* 插槽

  * 暂无；

* 方法

  * 无；

#### v6（CStat6）

```
<CStat6
    title="245k"
    subtitle="Sales"
    icon="mdi-trending-up"
    color="red">
</CStat6>
```

效果图：

![CStat6](./images/c-stat6.png)

* 属性

  * | 名称       | 描述                                                         | 类型      | 默认值     |
    | ---------- | ------------------------------------------------------------ | --------- | ---------- |
    | `title`    | 标题                                                         | `string`  | `null`     |
    | `subtitle` | 副标题                                                       | `string`  | `null`     |
    | `icon`     | 图标                                                         | `string`  | `null`     |
    | `color`    | 颜色（图标）                                                 | `string`  | `null`     |
    | `rounded`  | 形状是否是圆角矩形，默认圆形                                 | `boolean` | `true`     |
    | `variant`  | 变体，可选值有`flat`、`text`、`elevated`、`tonal`、`outlined`、`plain`等 | `string`  | `elevated` |

* 事件

  * 无；

* 插槽

  * | 名称       | 描述   | 作用域 |
    | ---------- | ------ | ------ |
    | `title`    | 标题   | 无     |
    | `subtitle` | 副标题 | 无     |
    | `icon`     | 图标   | 无     |

* 方法

  * 无；

#### v7（CStat7）

```
<CStat7
    title="Google Drive"
    subtitle="Automate your file upload workflow"
    icon="mdi-google-drive"
    avatar
    color="grey"
    btn-text="Connected"
    btn-color="red">
</CStat7>
```

效果图：

![CStat7](./images/c-stat7.png)

* 属性

  * | 名称       | 描述               | 类型      | 默认值  |
    | ---------- | ------------------ | --------- | ------- |
    | `title`    | 标题               | `string`  | `null`  |
    | `subtitle` | 副标题             | `string`  | `null`  |
    | `avatar`   | 是否显示头像       | `boolean` | `false` |
    | `icon`     | 图标               | `string`  | `null`  |
    | `color`    | 颜色（头像、图标） | `string`  | `null`  |
    | `btnText`  | 按钮文本           | `string`  | `null`  |
    | `btnColor` | 按钮颜色           | `string`  | `null`  |

* 事件

  * 无；

* 插槽

  * 暂无；

* 方法

  * 无；

### 其他（5）

#### 图片（CImg）

结合`VImg`和`v-viewer`，支持放大缩小、旋转、翻转图片等。

```
<CImg src="/demos/bear.jpg"></CImg>
```

效果图：

![CImg](./images/c-img1.png)

![CPassword](./images/c-img2.png)

* 属性
  * 同`VImg`；
* 事件
  * 同`VImg`；
* 插槽
  * 无；
* 方法
  * 无；

#### 链接（CAnchor）

```
<CAnchor
    text="百度"
    href="https://www.baidu.com/"
    hint="百度一下，你就知道"
    show-hint>
</CAnchor>
```

* 属性

  * | 名称       | 描述     | 类型      | 默认值  |
    | ---------- | -------- | --------- | ------- |
    | `text`     | 名称     | `string`  | `null`  |
    | `href`     | 链接     | `string`  | `null`  |
    | `disabled` | 是否禁用 | `boolean` | `false` |
    | `hint`     | 提示     | `string`  | `null`  |
  
* 事件

  * 无；

* 插槽

  * 无；

* 方法

  * 无；

#### 标签（CLabel）

```
<CLabel
    :value="21"
    url="/demos/products2.json">
</CLabel>
```

* 属性

  * | 名称        | 描述                                                    | 类型     | 默认值  |
    | ----------- | ------------------------------------------------------- | -------- | ------- |
    | `value`     | 值                                                      | `any`    | `null`  |
    | `items`     | 数据集                                                  | `array`  | `[]`    |
    | `url`       | 数据集API地址，若`items`的值不为空，则以`items`的值为主 | `string` | `null`  |
    | `itemTitle` | 数据项的值对应属性                                      | `string` | `title` |
    | `itemValue` | 数据项名称对应属性                                      | `string` | `value` |

* 事件

  * 无；

* 插槽

  * 无；

* 方法

  * 无；

#### 旋转器（CSpinner）

参考Quasar框架实现。

```
<CSpinner 
    class="ml-2" 
    size="2em" 
    :thickness="2">
 </CSpinner>
```

效果图：

![CSpinner](./images/c-spinner.png)

* 属性

  * | 名称        | 描述     | 类型               | 默认值    |
    | ----------- | -------- | ------------------ | --------- |
    | `color`     | 颜色     | `string`           | `primary` |
    | `size`      | 尺寸大小 | `string`、`number` | `1em`     |
    | `thickness` | 粗细程度 | `number`           | `5`       |

* 事件

  * 无；

* 插槽

  * 无；

* 方法

  * 无；

#### 富文本编辑器（CCKEditor5）

```
<CCKEditor5
    ref="ckeditor"
    v-model="html"
    upload-file-url="/api/file-explorer/files/upload"
    browse-file-url="/api/file-explorer/files/download">
</CCKEditor5>
```

效果图：

![CCKEditor5](./images/c-ckeditor5.png)

* 属性

  * | 名称            | 描述                                                         | 类型     | 默认值      |
    | --------------- | ------------------------------------------------------------ | -------- | ----------- |
    | `modelValue`    | 值                                                           | `string` | `null`      |
    | `adapter`       | 文件上传适配器，可选的值有`simple`，`ckeditor5`。若值为`simple`时，则使用CKEditor 5内置的`SimpleUploadAdapter`。 | `string` | `ckeditor5` |
    | `uploadFileUrl` | 文件上传地址，当`adapter`的值为`ckeditor5`时，该API需要接收参数`upload`，返回文件信息。 | `string` | `null`      |
    | `browseFileUrl` | 文件预览、下载地址，当`adapter`的值为`ckeditor5`时，该API需要接收参数`id`（文件ID）。 | `string` | `null`      |

* 事件

  * 无；

* 插槽

  * 无；

* 方法

  * | 名称      | 描述                           | 参数 | 返回值   |
    | --------- | ------------------------------ | ---- | -------- |
    | `getHtml` | 获取HTML，同属性`modelValue`。 | 无   | `string` |
    | `getText` | 获取纯文本。                   | 无   | `string` |

    
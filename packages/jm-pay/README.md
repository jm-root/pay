# jm-pay

支付系统，只关注数据及消息，不实现具体的支付逻辑。

## 定义

- 用户 user

- 支付渠道 channel

例如微信支付，支付宝支付等

- 付款单 pay

每次支付，会产生一个付款单

- 退款单 refund

每次退款，会产生一个退款单

## use:

```javascript
let s = require('jm-pay')();
```

## run:

```javascript
npm start
```

## 配置参数

基本配置 请参考 [jm-server] (https://github.com/jm-root/jm-server)

db [] mongodb服务器Uri

table_name_prefix [''] 表名称前缀

disable_mq [] 禁用MQ插件

disable_mqtt [] 禁用MQTT插件

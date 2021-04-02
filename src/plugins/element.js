import Vue from 'vue';
import Element from 'element-ui';
// import {
//     Form, 
//     FormItem,
//     Button, 
//     Input, 
//     Icon,
//     Image, 
//     Avatar,
//     Aside, 
//     Header, 
//     Main,
//     Footer,
//     Container,
//     Table, 
//     TableColumn,
//     Tag,
//     PageHeader,
//     Tree,
//     Breadcrumb,
//     Select,
//     Option,
//     DatePicker,
//     Message,
//     Popover,
//     MessageBox,
//     Row,
//     Col,
//     Checkbox,
//     CheckboxGroup,
//     Divider,
//     Pagination,
//     Drawer
// } from 'element-ui';

import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition);
Vue.use(Element);
Vue.prototype.$confirm = Element.MessageBox.confirm;
Vue.prototype.$message = Element.Message;
Vue.prototype.$loading = Element.Loading.service;


// Vue.use(Footer);
// Vue.use(Form);
// Vue.use(FormItem);
// Vue.use(Button);
// Vue.use(Input);
// Vue.use(Image);
// Vue.use(Avatar);
// Vue.use(Icon);
// Vue.use(Aside);
// Vue.use(Header);
// Vue.use(Main);
// Vue.use(Table);
// Vue.use(TableColumn);
// Vue.use(Tag);
// Vue.use(Container);
// Vue.use(PageHeader);
// Vue.use(Tree);
// Vue.use(Breadcrumb);
// Vue.use(Select);
// Vue.use(Option);
// Vue.use(DatePicker);
// Vue.use(Popover);
// Vue.use(Row);
// Vue.use(Col);
// Vue.use(Checkbox);
// Vue.use(CheckboxGroup);
// Vue.use(Divider);
// Vue.use(Pagination);
// Vue.use(Drawer);


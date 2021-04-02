<template>
	<div class="main-container">
		<Header :userInfo="userInfo"></Header>
		<el-container class="container">

			<!-- 左侧地址菜单 -->
			<el-aside class="aside" :width="asideToggle?'260px':'40px'">
				<!-- 输入关键字进行过滤 -->
				<div class="filter" v-show="asideToggle">
					<el-input size="mini" prefix-icon="el-icon-search" v-model="filterText" placeholder="输入关键字进行过滤" />
				</div>

				<!-- 树形控件 -->
				<div class="screen-area-box" v-if="asideToggle">
						<el-tree
						:highlight-current="true"
						class="area-tree"
						:data="areaData"
						:props="defaultProps"
						accordion
						:filter-node-method="filterNode"
						ref="tree"
						@node-click="handleNodeClick">
					</el-tree>
				</div>

				<!-- 侧边栏收缩后的纵向栏 -->
				<div class="column-area-box" v-else>
					<el-icon class="el-icon-location-information icon"></el-icon>
					<div class="province">{{curProvice}}</div>
					<div class="city">{{curCity}}</div>
					<div class="area">{{curArea}}</div>
				</div>

				<!-- 侧边切换按钮 -->
				<div class="aside-toggle-button" @click="asideToggle=!asideToggle">
					<el-icon :class="[ asideToggle?'el-icon-s-fold':'el-icon-s-unfold']"></el-icon>
				</div>
			</el-aside>

			<!-- 主功能面板 -->
			<el-main class="main">
				<div class="content-box">
					<!-- echars数据表容器 -->
					<div class="chart-box">
						<div id="totalWaterConsumption"></div>
					</div>
					<!-- 底部功能按钮区 -->
					<div class="bottom-box">
						<div class="function-box">
							<el-form class="function-form" :inline="true">
								<el-form-item label="数据来源" label-width="80px">
									<el-select v-model="area" filterable placeholder="--全部--" @change="optionDisabled=area">
										<el-option v-for="(item, i) in dataFormSelectList" :key="i" :value="item.value" :label="item.label"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="日期范围" label-width="80px">
									<el-date-picker
										v-model="time"
										type="daterange"
										range-separator="至"
										start-placeholder="开始日期"
										end-placeholder="结束日期">
									</el-date-picker>
								</el-form-item>
								<el-form-item class="buttons">
									<el-popover v-model="visible" trigger="manual">
										<div class="contrast-form">
											<div class="title"><span>{{area}}</span>与：</div>
											<el-form-item>
												<el-select v-model="contrastVal">
													<el-option v-for="(item, i) in dataFormSelectList" :key="i" :label="item.label" :value="item.value" :disabled="optionDisabled==item.value?true:false"></el-option>
												</el-select>
											</el-form-item>
											<div class="text">对比</div>
										</div>
										<el-button icon="el-icon-document" slot="reference" type="info" @click="contrast" round>对比</el-button>
									</el-popover>

									<el-button class="browse" @click="submit" type="success" icon="el-icon-pie-chart" round>查看</el-button>
								</el-form-item>
							</el-form>
						</div>
						<el-button class="enterDataPlatform" type="primary" @click="enterDataPlatform" round>进入数据监控中心<i class="el-icon-caret-right"></i></el-button>
					</div>
				</div>
			</el-main>
			
		</el-container>
	</div>
</template>

<script>
import TableData from "../../../global/record_data.json";
import Header from "@/components/header.vue";
import optionsList1 from '@/global/area_data.json';
import areaData from '@/global/area.json';

export default {
	name: 'ChartManagement',
	components: {
		Header
	},
	data() {
		return {
			avatarUrl:
				"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
			userInfo:{},
			tableData: TableData,
			options: {}, // echarts 图表参数配置对象
			curData: "2021-02",
			areaName: "山东烟台", // 图表筛选区域
			dataFormSelectList: optionsList1,
			area: '',
			time: '',
			contrastVal:'',
			visible: false,
			optionDisabled: '',
			asideToggle: false,
			areaData: {},
			filterText: '',
			defaultProps:{
          children: 'children',
          label: 'label',
					value:'value'
			},
			curProvice:'山东省',
			curCity: '烟台市',
			curArea: '芝罘区'
		};
	},
	watch: {
		filterText(val) {
			this.$refs.tree.filter(val);
		}
	},
	created() {
		this.areaData = areaData;
		this.userInfo = { ...this.$route.query };
	},
	methods: {
		// 树形控件参数过滤
		filterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		// 树形控件节点点击
		handleNodeClick(data, node){
			// console.log(data);
			if (node.level == 1){
				this.curProvice = data.label;
				this.curCity = '';
				this.curArea = '';
			} else if (node.level == 2) {
				this.curCity = data.label;
				this.curArea = '';
			} else {
				this.curArea = data.label;
			}
		},
		totalChartsInit() {
			const echarts = this.echarts.init(
				document.getElementById("totalWaterConsumption")
			);
			let option = {
				title: {
					text: this.areaName + "用水量汇总",
					subtext: this.curData,
					textStyle: {
						// color: "#fff",
					},
					subtextStyle: {
						color: "#666",
					},
					left: "1	0",
				},
				tooltip: {
					trigger: "axis",
				},
				legend: {
					data: ["上月流量", "本月流量"],
					textStyle: {
						// color: "#fff",
					},
				},
				toolbox: {
					iconStyle: {
						// color: "#fff",
					},
					show: true,
					feature: {
						dataView: { show: true, readOnly: false },
						magicType: { show: true, type: ["line", "bar"] },
						restore: { show: true },
						saveAsImage: { show: true },
					},
				},
				calculable: true,
				xAxis: [
					{
						nameTextStyle: {
							color: "#fff",
						},
						type: "category",
						data: [
							"1月",
							"2月",
							"3月",
							"4月",
							"5月",
							"6月",
							"7月",
							"8月",
							"9月",
							"10月",
							"11月",
							"12月",
						],
					},
				],
				yAxis: [
					{
						type: "value",
					},
				],
				series: [
					{
						name: "上月流量",
						type: "bar",
						data: [
							2.0,
							4.9,
							7.0,
							23.2,
							25.6,
							76.7,
							135.6,
							162.2,
							32.6,
							20.0,
							6.4,
							3.3,
						],
						markPoint: {
							data: [
								{ type: "max", name: "最大值" },
								{ type: "min", name: "最小值" },
							],
						},
					},
					{
						name: "本月流量",
						type: "bar",
						data: [
							2.6,
							5.9,
							9.0,
							26.4,
							28.7,
							70.7,
							175.6,
							182.2,
							48.7,
							18.8,
							6.0,
							2.3,
						],
						markPoint: {
							data: [
								{ name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
								{ name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 },
							],
						},
					},
				],
			};

			echarts.setOption(option);
		},
		// 小区对比
		contrast () {
			if(!this.area){
				this.$message({
          dangerouslyUseHTMLString: true,
					message: '对请选择数据来源的<b style="color:red">一个</b>小区进行对比！',
					duration: 2000
				});
				return;
			}
			this.visible = !this.visible;
		},
		// 提交筛选数据
		submit () {
			if(!this.time){
				this.$message({
					message: '请选择日期范围',
					duration: 1000
				});
			}
		},
		// 进入数据监控平台
		enterDataPlatform(){
			this.$router.push('/dataPlatform');
		}
	},
	mounted() {
		this.totalChartsInit();
	},
};
</script>

<style lang="less" scoped>
.main-container {
	width: 100%;
	height: 100%;
	background-color: #f9f9f9;
	display: flex;
	flex-direction: column;
	.container{
		flex: 1;
	}
	.aside{
		flex-direction: column;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.336);
		display: flex;
		height: 100%;
		.filter{
			padding: 10px 20px 5px 10px;
			height: 30px;
		}
		.screen-area-box {
			flex:1;
			padding: 5px 0 5px 5px;
			display: flex;
			.area-tree{
				overflow: auto;
				height: 550px;
				flex: 1;
			}
		}
		.column-area-box{
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-weight: 600;
			.icon{
				height: 30px;
				display: flex;
				width: 100%;
				align-items: center;
				justify-content: center;
				font-size: 28px;
				font-weight: 700;
				color: #fff;
				height: 100px;
				background-color: #f1cd00;
			}
			.province{
				height: 50px;				
				padding: 10px 12px 0;
				height: 100px;
			}
			.city{
				height: 50px;
				height: 100px;
				padding: 10px 12px 0;
			}
			.area{
				height: 50px;			
				padding: 10px 12px 0;
				height: 100px;
			}
		}
		.aside-toggle-button{
			height: 35px;
			background-color: #E6A23C;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24px;
			color: #fff;
		}
	}
	.main{
		padding: 20px 50px;
		display: flex;
		.content-box{
			height: 100%;
			flex: 1;
			display: flex;
			flex-direction: column;
			.chart-box{
				flex: 1;
				display: flex;
				padding: 10px;
				justify-content: center;
				#totalWaterConsumption{
					width: 1000px;
					height: 100%;
				}
			}
			.bottom-box{
				display: flex;
				padding: 5px 0;
				.function-box{
					flex: 1;
					.function-form{
						.el-form-item{
							margin: 0;
						}
						.buttons{
							margin-left: 10px;
							.browse{
								margin-left: 5px;
							}
						}
					}
				}
				.enterDataPlatform{
					text-align: center;
					
				}
			}
		}
	}
}

.contrast-form{
	.title{
		padding-left: 5px;
		span{
			color:red;
			font-weight: 600;
		}
	}
	.el-form-item{
		margin: 5px 0;
	}
	.text{
		padding-left: 5px;
	}
}
::-webkit-scrollbar{
	width: 3px !important;
}
</style>

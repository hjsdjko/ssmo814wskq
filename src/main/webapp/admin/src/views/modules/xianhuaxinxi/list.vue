<template>
	<div class="main-content" :style='{"padding":"10px 30px 30px","background":"url(http://codegen.caihongy.cn/20230228/47752d6be3a94e8892a83ec2a70c8443.png)"}'>
		<!-- 列表页 -->
		<template v-if="showFlag">
			<el-form class="center-form-pv" :style='{"margin":"0 0 30px"}' :inline="true" :model="searchForm">
				<el-row :style='{"padding":"10px","borderRadius":"3px","background":"#fff","display":"block"}' >
					<div :style='{"margin":"0 10px 0 0","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#666","display":"inline-block","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">鲜花名称</label>
						<el-input v-model="searchForm.xianhuamingcheng" placeholder="鲜花名称" clearable></el-input>
					</div>
					<div :style='{"margin":"0 10px 0 0","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#666","display":"inline-block","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">鲜花产地</label>
						<el-input v-model="searchForm.xianhuachandi" placeholder="鲜花产地" clearable></el-input>
					</div>
					<div :style='{"margin":"0 10px 0 0","display":"inline-block"}' class="select" label="适用场景" prop="shiyongchangjing">
						<label :style='{"margin":"0 10px 0 0","color":"#666","display":"inline-block","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">适用场景</label>
						<el-select  @change="shiyongchangjingChange" clearable v-model="searchForm.shiyongchangjing" placeholder="请选择适用场景">
							<el-option v-for="(item,index) in shiyongchangjingOptions" v-bind:key="index" :label="item" :value="item"></el-option>
						</el-select>
					</div>
					<div :style='{"margin":"0 10px 0 0","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#666","display":"inline-block","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">送礼对象</label>
						<el-input v-model="searchForm.songliduixiang" placeholder="送礼对象" clearable></el-input>
					</div>
					<div :style='{"margin":"0 10px 0 0","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#666","display":"inline-block","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">价格</label>
						<el-input v-model="searchForm.pricestart" placeholder="最小价格" clearable></el-input>
					</div>
					<div :style='{"margin":"0 10px 0 0","display":"inline-block"}' :label="'至'">
						<el-input v-model="searchForm.priceend" placeholder="最大价格" clearable></el-input>
					</div>
					<el-button :style='{"border":"1px solid #5494cb","cursor":"pointer","padding":"0 34px","outline":"none","margin":"0 0px 0 10px","color":"#fff","borderRadius":"4px","background":"-webkit-linear-gradient(top,#66a4d8,#337ab7)","width":"auto","fontSize":"16px","height":"40px"}' type="success" @click="search()">查询</el-button>
				</el-row>

				<el-row :style='{"margin":"20px 0 20px 0","display":"flex"}'>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 0 0","outline":"none","color":"#fff","borderRadius":"4px","background":"rgba(64, 158, 255, 1)","width":"auto","fontSize":"14px","height":"40px"}' v-if="isAuth('xianhuaxinxi','新增')" type="success" @click="addOrUpdateHandler()">新增</el-button>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 0 0","outline":"none","color":"#fff","borderRadius":"4px","background":"rgba(255, 0, 0, 1)","width":"auto","fontSize":"14px","height":"40px"}' v-if="isAuth('xianhuaxinxi','删除')" :disabled="dataListSelections.length <= 0" type="danger" @click="deleteHandler()">删除</el-button>




					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 0 0","outline":"none","color":"#fff","borderRadius":"4px","background":"rgba(255, 128, 0, 1)","width":"auto","fontSize":"14px","height":"40px"}' v-if="isAuth('xianhuaxinxi','商品库存统计')" type="warning" @click="chartDialog1()">商品库存统计</el-button>
				</el-row>
			</el-form>
			
			<!-- <div> -->
				<el-table class="tables"
					:stripe='false'
					:style='{"padding":"0","borderColor":"#eee","borderRadius":"5px","borderWidth":"1px 0 0 1px","background":"#fff","width":"100%","borderStyle":"solid"}' 
					v-if="isAuth('xianhuaxinxi','查看')"
					:data="dataList"
					v-loading="dataListLoading"
				@selection-change="selectionChangeHandler">
					<el-table-column :resizable='true' type="selection" align="center" width="50"></el-table-column>
					<el-table-column :resizable='true' :sortable='true' label="序号" type="index" width="50" />
					<el-table-column :resizable='true' :sortable='true'  
						prop="xianhuamingcheng"
					label="鲜花名称">
						<template slot-scope="scope">
							{{scope.row.xianhuamingcheng}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="xianhuafenlei"
					label="鲜花分类">
						<template slot-scope="scope">
							{{scope.row.xianhuafenlei}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true' prop="xianhuatupian" width="200" label="鲜花图片">
						<template slot-scope="scope">
							<div v-if="scope.row.xianhuatupian">
								<img v-if="scope.row.xianhuatupian.substring(0,4)=='http'" :src="scope.row.xianhuatupian.split(',')[0]" width="100" height="100">
								<img v-else :src="$base.url+scope.row.xianhuatupian.split(',')[0]" width="100" height="100">
							</div>
							<div v-else>无图片</div>
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="xianhuaguige"
					label="鲜花规格">
						<template slot-scope="scope">
							{{scope.row.xianhuaguige}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="xianhuachandi"
					label="鲜花产地">
						<template slot-scope="scope">
							{{scope.row.xianhuachandi}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="xianhuahuayu"
					label="鲜花花语">
						<template slot-scope="scope">
							{{scope.row.xianhuahuayu}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="shiyongchangjing"
					label="适用场景">
						<template slot-scope="scope">
							{{scope.row.shiyongchangjing}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="songliduixiang"
					label="送礼对象">
						<template slot-scope="scope">
							{{scope.row.songliduixiang}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="onelimittimes"
					label="单次限购">
						<template slot-scope="scope">
							{{scope.row.onelimittimes}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="alllimittimes"
					label="鲜花库存">
						<template slot-scope="scope">
							{{scope.row.alllimittimes}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="shangshiriqi"
					label="上市日期">
						<template slot-scope="scope">
							{{scope.row.shangshiriqi}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="jf"
					label="积分">
						<template slot-scope="scope">
							{{scope.row.jf}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="price"
					label="价格">
						<template slot-scope="scope">
							{{scope.row.price}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="vipprice"
					label="会员价">
						<template slot-scope="scope">
							{{scope.row.vipprice}}
						</template>
					</el-table-column>
					<el-table-column width="300" label="操作">
						<template slot-scope="scope">
							<el-button :style='{"border":"1px solid #3ca512","cursor":"pointer","padding":"0 10px 0 24px","margin":"3px 6px 3px 0","outline":"none","color":"#fff","borderRadius":"4px","background":"url(http://codegen.caihongy.cn/20221011/ca1c191554d24b108bc94f4a2046d636.png) #41b314 no-repeat 5px 8px","width":"auto","fontSize":"14px","height":"32px"}' v-if=" isAuth('xianhuaxinxi','查看')" type="success" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
							<el-button :style='{"border":"1px solid #3ca512","cursor":"pointer","padding":"0 10px 0 24px","margin":"3px 6px 3px 0","outline":"none","color":"#fff","borderRadius":"4px","background":"url(http://codegen.caihongy.cn/20221011/ca1c191554d24b108bc94f4a2046d636.png) #41b314 no-repeat 5px 8px","width":"auto","fontSize":"14px","height":"32px"}' v-if="isAuth('xianhuaxinxi','采购入库')" type="success" size="mini" @click="rukuxinxiCrossAddOrUpdateHandler(scope.row,'cross','','','')">采购入库</el-button>
							<el-button :style='{"border":"1px solid #00a0f0","cursor":"pointer","padding":"0 10px 0 24px","margin":"3px 6px 3px 0","outline":"none","color":"#fff","borderRadius":"4px","background":"url(http://codegen.caihongy.cn/20221011/161eb7a46f5d4cd19d68a1386174d662.png) #00aaff no-repeat 5px 8px","width":"auto","fontSize":"14px","height":"32px"}' v-if=" isAuth('xianhuaxinxi','修改')" type="primary" size="mini" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>


							<el-button :style='{"border":"1px solid #3ca512","cursor":"pointer","padding":"0 10px 0 24px","margin":"3px 6px 3px 0","outline":"none","color":"#fff","borderRadius":"4px","background":"url(http://codegen.caihongy.cn/20221011/ca1c191554d24b108bc94f4a2046d636.png) #41b314 no-repeat 5px 8px","width":"auto","fontSize":"14px","height":"32px"}' v-if="isAuth('xianhuaxinxi','查看评论')" type="primary" size="mini" @click="disscussListHandler(scope.row.id)">查看评论</el-button>



							<el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px 0 24px","margin":"3px 6px 3px 0","outline":"none","color":"#fff","borderRadius":"4px","background":"url(http://codegen.caihongy.cn/20221011/68bd264a8e4341c6aa5409f871d590d0.png) #d9534f no-repeat 5px 8px","width":"auto","fontSize":"14px","height":"32px"}' v-if="isAuth('xianhuaxinxi','删除') " type="danger" size="mini" @click="deleteHandler(scope.row.id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					@size-change="sizeChangeHandle"
					@current-change="currentChangeHandle"
					:current-page="pageIndex"
					background
					:page-sizes="[10, 20, 30, 50]"
					:page-size="pageSize"
					:layout="layouts.join()"
					:total="totalPage"
					prev-text=" "
					next-text="》"
					:hide-on-single-page="true"
					:style='{"width":"100%","padding":"0","margin":"20px 0 0","whiteSpace":"nowrap","color":"#333","fontWeight":"500"}'
				></el-pagination>
			<!-- </div> -->
		</template>
		
		<!-- 添加/修改页面  将父组件的search方法传递给子组件-->
		<add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>

		<rukuxinxi-cross-add-or-update v-if="rukuxinxiCrossAddOrUpdateFlag" :parent="this" ref="rukuxinxiCrossaddOrUpdate"></rukuxinxi-cross-add-or-update>




		<el-dialog
		  :visible.sync="chartVisiable1"
		  width="800">
			<div id="alllimittimesChart1" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="chartDialog1">返回</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
//竖
//商品库存统计
//[]
import * as echarts from 'echarts'
import axios from 'axios'
import AddOrUpdate from "./add-or-update";
import rukuxinxiCrossAddOrUpdate from "../rukuxinxi/add-or-update";
export default {
  data() {
    return {
      searchForm: {
        key: ""
      },
      form:{},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: true,
      sfshVisiable: false,
      shForm: {},
      chartVisiable: false,
      chartVisiable1: false,
      chartVisiable2: false,
      chartVisiable3: false,
      chartVisiable4: false,
      chartVisiable5: false,
      addOrUpdateFlag:false,
      rukuxinxiCrossAddOrUpdateFlag: false,
      layouts: ["total","prev","pager","next","sizes","jumper"],

    };
  },
  created() {
    this.init();
    this.getDataList();
    this.contentStyleChange()
  },
  mounted() {
  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
    }
  },
  components: {
    AddOrUpdate,
    rukuxinxiCrossAddOrUpdate,
  },
  methods: {

    contentStyleChange() {
      this.contentPageStyleChange()
    },
    // 分页
    contentPageStyleChange(){
      let arr = []

      // if(this.contents.pageTotal) arr.push('total')
      // if(this.contents.pageSizes) arr.push('sizes')
      // if(this.contents.pagePrevNext){
      //   arr.push('prev')
      //   if(this.contents.pagePager) arr.push('pager')
      //   arr.push('next')
      // }
      // if(this.contents.pageJumper) arr.push('jumper')
      // this.layouts = arr.join()
      // this.contents.pageEachNum = 10
    },

    rukuxinxiCrossAddOrUpdateHandler(row,type,crossOptAudit,statusColumnName,tips,statusColumnValue){
      this.showFlag = false;
      this.addOrUpdateFlag = false;
      this.rukuxinxiCrossAddOrUpdateFlag = true;
      this.$storage.set('crossObj',row);
      this.$storage.set('crossTable','xianhuaxinxi');
      this.$storage.set('statusColumnName',statusColumnName);
      this.$storage.set('statusColumnValue',statusColumnValue);
      this.$storage.set('tips',tips);
	if(statusColumnName!=''&&!statusColumnName.startsWith("[")) {
		var obj = this.$storage.getObj('crossObj');
		for (var o in obj){
		  if(o==statusColumnName && obj[o]==statusColumnValue){
		    this.$message({
		      message: tips,
		      type: "success",
		      duration: 1500,
		      onClose: () => {
			this.getDataList();
		      }
		    });
		      this.showFlag = true;
		      this.rukuxinxiCrossAddOrUpdateFlag = false;
			return;
		  }
		}
	}
      this.$nextTick(() => {
      this.$refs.rukuxinxiCrossaddOrUpdate.init(row.id,type);
      });
    },


//统计接口
    chartDialog1() {
      this.chartVisiable1 = !this.chartVisiable1;
      this.$nextTick(()=>{

        var alllimittimesChart1 = echarts.init(document.getElementById("alllimittimesChart1"),'macarons');
        this.$http({
            url: `xianhuaxinxi/value/xianhuamingcheng/alllimittimes`,
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].xianhuamingcheng);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].xianhuamingcheng
                    })
                }
                var option = {};
                option = {
                    title: {
                        text: '商品库存统计',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis,
                        axisLabel : {
                            rotate:70
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'bar'
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                alllimittimesChart1.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    alllimittimesChart1.resize();
                };
            }
        });
      })
    },





    init () {
          this.shiyongchangjingOptions = "送恋人,送长辈,送朋友,生日祝福,表白祝福,开业商务,其它场景".split(',')
    },
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: 'id',
        order: 'desc',
      }
           if(this.searchForm.xianhuamingcheng!='' && this.searchForm.xianhuamingcheng!=undefined){
            params['xianhuamingcheng'] = '%' + this.searchForm.xianhuamingcheng + '%'
          }
           if(this.searchForm.xianhuachandi!='' && this.searchForm.xianhuachandi!=undefined){
            params['xianhuachandi'] = '%' + this.searchForm.xianhuachandi + '%'
          }
           if(this.searchForm.shiyongchangjing!='' && this.searchForm.shiyongchangjing!=undefined){
            params['shiyongchangjing'] = this.searchForm.shiyongchangjing
          }
           if(this.searchForm.songliduixiang!='' && this.searchForm.songliduixiang!=undefined){
            params['songliduixiang'] = '%' + this.searchForm.songliduixiang + '%'
          }
    params['sort'] = 'shangshiriqi';
    params['order'] = 'desc';
           if(this.searchForm.pricestart!='' && this.searchForm.pricestart!=undefined ){
            params['pricestart'] = this.searchForm.pricestart
          }
          if(this.searchForm.priceend!='' && this.searchForm.priceend!=undefined){
            params['priceend'] = this.searchForm.priceend
          }
      this.$http({
        url: "xianhuaxinxi/page",
        method: "get",
        params: params
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list;
          this.totalPage = data.data.total;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id,type) {
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
      if(type!='info'){
        type = 'else';
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,type);
      });
    },
    // 查看评论
    disscussListHandler(id,type) {
	this.$router.push({path:'/discussxianhuaxinxi',query:{refid:id}});
    },
    // 下载
    download(file){
      window.open(`${file}`)
    },
    // 删除
    deleteHandler(id) {
      var ids = id
        ? [Number(id)]
        : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "xianhuaxinxi/delete",
          method: "post",
          data: ids
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },


  }

};
</script>
<style lang="scss" scoped>
	
	.center-form-pv {
	  .el-date-editor.el-input {
	    width: auto;
	  }
	}
	
	.el-input {
	  width: auto;
	}
	
	// form
	.center-form-pv .el-input /deep/ .el-input__inner {
				border: 1px solid #ccc;
				border-radius: 4px;
				padding: 0 12px;
				box-shadow: 0 0px 3px #ccc;
				outline: none;
				color: #999;
				width: 170px;
				font-size: 14px;
				height: 38px;
			}
	
	.center-form-pv .el-select /deep/ .el-input__inner {
				border: 1px solid #ccc;
				border-radius: 4px;
				padding: 0 10px;
				box-shadow: 0 0px 3px #ccc;
				outline: none;
				color: #999;
				width: 170px;
				font-size: 14px;
				line-height: 30px;
				height: 38px;
			}
	
	.center-form-pv .el-date-editor /deep/ .el-input__inner {
				border: 1px solid #ccc;
				border-radius: 4px;
				padding: 0 10px 0 30px;
				box-shadow: 0 0px 3px #ccc;
				outline: none;
				color: rgba(64, 158, 255, 1);
				width: 170px;
				font-size: 14px;
				height: 38px;
			}
	
	// table
	.el-table /deep/ .el-table__header-wrapper thead {
				color: #999;
				font-weight: 500;
				width: 100%;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr {
				background: #fff;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr th {
				padding: 12px 0;
				color: #fff;
				background: #337ab7;
				border-color: #eee;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: left;
			}

	.el-table /deep/ .el-table__header-wrapper thead tr th .cell {
				padding: 0 10px;
				word-wrap: normal;
				word-break: break-all;
				white-space: normal;
				font-weight: bold;
				display: inline-block;
				vertical-align: middle;
				width: 100%;
				line-height: 24px;
				position: relative;
				text-overflow: ellipsis;
			}

	
	.el-table /deep/ .el-table__body-wrapper tbody {
				width: 100%;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr {
				background: #fff;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 8px 0;
				color: #222;
				background: #fff;
				border-color: #eee;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: left;
			}
	
		
	.el-table /deep/ .el-table__body-wrapper tbody tr:hover td {
				padding: 8px 0;
				color: #222;
				background: #f6f6f6;
				border-color: #eee;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: left;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 8px 0;
				color: #222;
				background: #fff;
				border-color: #eee;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: left;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr td .cell {
				padding: 0 10px;
				overflow: hidden;
				word-break: break-all;
				white-space: normal;
				line-height: 24px;
				text-overflow: ellipsis;
			}
	
	// pagination
	.main-content .el-pagination /deep/ .el-pagination__total {
				margin: 0 10px 0 0;
				color: #666;
				font-weight: 400;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev {
				border: none;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #666;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next {
				border: none;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #666;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #C0C4CC;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #C0C4CC;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}

	.main-content .el-pagination /deep/ .el-pager {
				padding: 0;
				margin: 0;
				display: inline-block;
				vertical-align: top;
			}

	.main-content .el-pagination /deep/ .el-pager .number {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #666;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #f4f4f5;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number:hover {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #fff;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #337ab7;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number.active {
				cursor: default;
				padding: 0 4px;
				margin: 0 5px;
				color: #FFF;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #337ab7;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes {
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input {
				margin: 0 5px;
				width: 100px;
				position: relative;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
				border: 1px solid #DCDFE6;
				cursor: pointer;
				padding: 0 25px 0 8px;
				color: #606266;
				display: inline-block;
				font-size: 13px;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: #FFF;
				width: 100%;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
				top: 0;
				position: absolute;
				right: 0;
				height: 100%;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
				cursor: pointer;
				color: #C0C4CC;
				width: 25px;
				font-size: 14px;
				line-height: 28px;
				text-align: center;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump {
				margin: 0 0 0 24px;
				color: #606266;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input {
				border-radius: 3px;
				padding: 0 2px;
				margin: 0 2px;
				display: inline-block;
				width: 50px;
				font-size: 14px;
				line-height: 18px;
				position: relative;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
				border: 1px solid #DCDFE6;
				cursor: pointer;
				padding: 0 3px;
				color: #606266;
				display: inline-block;
				font-size: 14px;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: #FFF;
				width: 100%;
				text-align: center;
				height: 28px;
			}
</style>

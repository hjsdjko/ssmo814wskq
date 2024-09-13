<template>
<div class="center-preview" :style='{"width":"1200px","margin":"10px auto","position":"relative","background":"none"}'>
	<div class="title" :style='{"padding":"20px 0","margin":"0px 0 10px","borderColor":"#cbc9ea","color":"#333","borderRadius":"8px","textAlign":"center","background":"radial-gradient(circle, rgba(231,230,244,1) 0%, rgba(219,217,244,1) 100%)","borderWidth":"1px 2px 4px 2px","fontSize":"20px","lineHeight":"24px","borderStyle":"solid"}'>{{ title }}</div>

    <el-tabs tab-position="left" :style='{"border":"2px solid #dbd9f4","padding":"20px","margin":"8px 4px 4px 4px","borderRadius":"16px","background":"#fff"}' @tab-click="handleClick">
      <el-tab-pane label="个人中心">
        <el-form class="center-preview-pv" ref="sessionForm" :model="sessionForm" :rules="rules" label-width="80px">
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='yonghu'" label="用户名" prop="yonghuming">
            <el-input v-model="sessionForm.yonghuming" placeholder="用户名" readonly></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='yonghu'" label="密码" prop="mima">
            <el-input type="password" v-model="sessionForm.mima" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='yonghu'" label="姓名" prop="xingming">
            <el-input v-model="sessionForm.xingming" placeholder="姓名" ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='yonghu'" label="性别">
            <el-select v-model="sessionForm.xingbie" placeholder="请选择性别" >
              <el-option v-for="(item, index) in dynamicProp.xingbie" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='yonghu'" label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="headers"
              :show-file-list="false"
              :on-success="yonghutouxiangHandleAvatarSuccess">
              <img :style='{"border":"1px solid #dbd9f4","cursor":"pointer","color":"#b3aeea","borderRadius":"30px","textAlign":"center","width":"200px","fontSize":"32px","lineHeight":"120px"}' v-if="sessionForm.touxiang" :src="baseUrl + sessionForm.touxiang" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='yonghu'" label="手机" prop="shouji">
            <el-input v-model="sessionForm.shouji" placeholder="手机" ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='yonghu'" label="生日">
            <el-date-picker
              v-model="sessionForm.shengri"
              type="date"
              placeholder="生日" >
            </el-date-picker>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='yonghu'" label="积分">
            <el-input v-model="sessionForm.jf" placeholder="积分" readonly></el-input>
          </el-form-item>
          <el-form-item class="balance" :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='yonghu'" label="余额">
            <div :style='{"flexWrap":"wrap","display":"flex"}'>
				<el-input v-model="sessionForm.money" placeholder="余额" readonly></el-input>
				<div @click="dialogFormVisibleMoney = true" :style='{"border":"0","cursor":"pointer","padding":"0 15px","margin":"0 20px 0 0","color":"#fff","display":"inline-block","outline":"none","borderRadius":"0 20px 20px 0","background":"rgba(203, 187, 233, 1)","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}'>点我充值</div>
			</div>
		  </el-form-item>
          <el-form-item class="balance" :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='yonghu'" label="会员">
            <div :style='{"flexWrap":"wrap","display":"flex"}'>
				<el-input v-model="sessionForm.vip" placeholder="会员" readonly></el-input>
				<div @click="dialogFormVisibleVip = true" :style='{"border":"0","cursor":"pointer","padding":"0 15px","margin":"0 20px 0 0","color":"#fff","display":"inline-block","outline":"none","borderRadius":"0 20px 20px 0","background":"rgba(203, 187, 233, 1)","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}'>会员购买</div>
			</div>
		  </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='kefu'" label="账号" prop="zhanghao">
            <el-input v-model="sessionForm.zhanghao" placeholder="账号" readonly></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='kefu'" label="密码" prop="mima">
            <el-input type="password" v-model="sessionForm.mima" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='kefu'" label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="headers"
              :show-file-list="false"
              :on-success="kefutouxiangHandleAvatarSuccess">
              <img :style='{"border":"1px solid #dbd9f4","cursor":"pointer","color":"#b3aeea","borderRadius":"30px","textAlign":"center","width":"200px","fontSize":"32px","lineHeight":"120px"}' v-if="sessionForm.touxiang" :src="baseUrl + sessionForm.touxiang" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='kefu'" label="姓名" prop="xingming">
            <el-input v-model="sessionForm.xingming" placeholder="姓名" ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='kefu'" label="性别">
            <el-select v-model="sessionForm.xingbie" placeholder="请选择性别" >
              <el-option v-for="(item, index) in dynamicProp.xingbie" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='kefu'" label="年龄" prop="nianling">
            <el-input v-model="sessionForm.nianling" placeholder="年龄" ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='kefu'" label="电话" prop="dianhua">
            <el-input v-model="sessionForm.dianhua" placeholder="电话" ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='kefu'" label="积分">
            <el-input v-model="sessionForm.jf" placeholder="积分" readonly></el-input>
          </el-form-item>
          <el-form-item class="balance" :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='kefu'" label="余额">
            <div :style='{"flexWrap":"wrap","display":"flex"}'>
				<el-input v-model="sessionForm.money" placeholder="余额" readonly></el-input>
				<div @click="dialogFormVisibleMoney = true" :style='{"border":"0","cursor":"pointer","padding":"0 15px","margin":"0 20px 0 0","color":"#fff","display":"inline-block","outline":"none","borderRadius":"0 20px 20px 0","background":"rgba(203, 187, 233, 1)","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}'>点我充值</div>
			</div>
		  </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='caigou'" label="采购工号" prop="caigougonghao">
            <el-input v-model="sessionForm.caigougonghao" placeholder="采购工号" readonly></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='caigou'" label="密码" prop="mima">
            <el-input type="password" v-model="sessionForm.mima" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='caigou'" label="采购姓名" prop="caigouxingming">
            <el-input v-model="sessionForm.caigouxingming" placeholder="采购姓名" ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='caigou'" label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="headers"
              :show-file-list="false"
              :on-success="caigoutouxiangHandleAvatarSuccess">
              <img :style='{"border":"1px solid #dbd9f4","cursor":"pointer","color":"#b3aeea","borderRadius":"30px","textAlign":"center","width":"200px","fontSize":"32px","lineHeight":"120px"}' v-if="sessionForm.touxiang" :src="baseUrl + sessionForm.touxiang" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='caigou'" label="性别">
            <el-select v-model="sessionForm.xingbie" placeholder="请选择性别" >
              <el-option v-for="(item, index) in dynamicProp.xingbie" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='caigou'" label="联系电话" prop="lianxidianhua">
            <el-input v-model="sessionForm.lianxidianhua" placeholder="联系电话" ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='caigou'" label="积分">
            <el-input v-model="sessionForm.jf" placeholder="积分" readonly></el-input>
          </el-form-item>
          <el-form-item class="balance" :style='{"width":"80%","padding":"10px","margin":"4px auto","background":"none"}' v-if="userTableName=='caigou'" label="余额">
            <div :style='{"flexWrap":"wrap","display":"flex"}'>
				<el-input v-model="sessionForm.money" placeholder="余额" readonly></el-input>
				<div @click="dialogFormVisibleMoney = true" :style='{"border":"0","cursor":"pointer","padding":"0 15px","margin":"0 20px 0 0","color":"#fff","display":"inline-block","outline":"none","borderRadius":"0 20px 20px 0","background":"rgba(203, 187, 233, 1)","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}'>点我充值</div>
			</div>
		  </el-form-item>
          <el-form-item :style='{"padding":"0","margin":"16px 0 0 0","justifyContent":"center","display":"flex"}'>
            <el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 10px","outline":"none","color":"#000","borderRadius":"10px","background":"linear-gradient(90deg, rgba(255,233,100,1) 0%, rgba(194,248,126,1) 29%, rgba(181,233,252,1) 61%, rgba(246,172,218,1) 100%)","width":"120px","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="primary" @click="onSubmit('sessionForm')">更新信息</el-button>
            <el-button :style='{"border":"1px solid #ab85d3","cursor":"pointer","padding":"0","margin":"0 10px","outline":"none","color":"#666","borderRadius":"10px","background":"0","width":"120px","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="danger" @click="logout">退出登录</el-button>
          </el-form-item>
        </el-form>
		
        <el-dialog title="用户充值" :visible.sync="dialogFormVisibleMoney" width="726px" center>
          <el-form :model="chongzhiForm">
            <el-form-item label="充值金额" label-width="120px">
              <el-input type="number" v-model="chongzhiForm.money" autocomplete="off" placeholder="充值金额"></el-input>
            </el-form-item>
            <el-form-item label-width="120px">
              <el-radio-group v-model="chongzhiForm.radio">
                <el-radio style="margin-bottom: 30px" label="微信支付">
                  <el-image
                    style="width: 60px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/weixin.png')"
                    fit="fill"></el-image>
                    <span style="display: inline-block;margin-left: 10px">微信支付</span>
                </el-radio>
                <el-radio label="支付宝支付">
                  <el-image
                    style="width: 60px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/zhifubao.png')"
                    fit="fill"></el-image>
                    <span style="display: inline-block;margin-left: 10px">支付宝支付</span>
                </el-radio>
                <el-radio label="中国建设银行支付">
                  <el-image
                    style="width: 120px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/jianshe.png')"
                    fit="fill"></el-image>
                </el-radio>
                <el-radio label="中国农业银行支付">
                  <el-image
                    style="width: 126px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/nongye.png')"
                    fit="fill"></el-image>
                </el-radio>
                <el-radio label="中国银行支付">
                  <el-image
                    style="width: 140px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/zhongguo.png')"
                    fit="fill"></el-image>
                </el-radio>
                <el-radio label="交通银行支付">
                  <el-image
                    style="width: 120px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/jiaotong.png')"
                    fit="fill"></el-image>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleMoney = false">取 消</el-button>
            <el-button type="primary" @click="chongzhi">确认充值</el-button>
          </div>
        </el-dialog>
        <el-dialog title="会员购买" :visible.sync="dialogFormVisibleVip" width="726px" center>
          <el-form :model="chongzhiForm">
            <el-form-item label="会员卡" label-width="120px">
              <el-input readonly autocomplete="off" value="￥199/年"></el-input>
            </el-form-item>
            <el-form-item label-width="120px">
              <el-radio-group v-model="chongzhiForm.radio">
                <el-radio style="margin-bottom: 30px" label="微信支付">
                  <el-image
                    style="width: 60px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/weixin.png')"
                    fit="fill"></el-image>
                    <span style="display: inline-block;margin-left: 10px">微信支付</span>
                </el-radio>
                <el-radio label="支付宝支付">
                  <el-image
                    style="width: 60px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/zhifubao.png')"
                    fit="fill"></el-image>
                    <span style="display: inline-block;margin-left: 10px">支付宝支付</span>
                </el-radio>
                <el-radio label="中国建设银行支付">
                  <el-image
                    style="width: 120px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/jianshe.png')"
                    fit="fill"></el-image>
                </el-radio>
                <el-radio label="中国农业银行支付">
                  <el-image
                    style="width: 126px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/nongye.png')"
                    fit="fill"></el-image>
                </el-radio>
                <el-radio label="中国银行支付">
                  <el-image
                    style="width: 140px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/zhongguo.png')"
                    fit="fill"></el-image>
                </el-radio>
                <el-radio label="交通银行支付">
                  <el-image
                    style="width: 120px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/jiaotong.png')"
                    fit="fill"></el-image>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleVip = false">取 消</el-button>
            <el-button type="primary" @click="chongzhivip">确认支付</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="我的订单"></el-tab-pane>
      <el-tab-pane label="我的地址" name="MyAddress">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="我的收藏"></el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
  import config from '@/config/config'
  import Vue from 'vue'
  export default {
    //数据集合
    data() {
      return {
        title: '个人中心',
        baseUrl: config.baseUrl,
        sessionForm: {},
        rules: {},
        chongzhiForm: {
          money: '',
          radio: ''
        },
        disabled: false,
        dialogFormVisibleMoney: false,
        dialogFormVisibleVip: false,
        uploadUrl: config.baseUrl + 'file/upload',
        imageUrl: '',
        headers: {Token: localStorage.getItem('Token')},
        userTableName: localStorage.getItem('UserTableName'),
        dynamicProp: {}
      }
    },
    created() {
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'yonghuming', null);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'mima', null);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'xingming', null);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'xingbie', null);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'touxiang', null);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'shouji', null);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'shengri', null);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'jf', null);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'money', null);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'vip', null);
      }
      if ('kefu' == this.userTableName) {
        this.$set(this.sessionForm, 'zhanghao', null);
      }
      if ('kefu' == this.userTableName) {
        this.$set(this.sessionForm, 'mima', null);
      }
      if ('kefu' == this.userTableName) {
        this.$set(this.sessionForm, 'touxiang', null);
      }
      if ('kefu' == this.userTableName) {
        this.$set(this.sessionForm, 'xingming', null);
      }
      if ('kefu' == this.userTableName) {
        this.$set(this.sessionForm, 'xingbie', null);
      }
      if ('kefu' == this.userTableName) {
        this.$set(this.sessionForm, 'nianling', null);
      }
      if ('kefu' == this.userTableName) {
        this.$set(this.sessionForm, 'dianhua', null);
      }
      if ('kefu' == this.userTableName) {
        this.$set(this.sessionForm, 'jf', null);
      }
      if ('kefu' == this.userTableName) {
        this.$set(this.sessionForm, 'money', null);
      }
      if ('caigou' == this.userTableName) {
        this.$set(this.sessionForm, 'caigougonghao', null);
      }
      if ('caigou' == this.userTableName) {
        this.$set(this.sessionForm, 'mima', null);
      }
      if ('caigou' == this.userTableName) {
        this.$set(this.sessionForm, 'caigouxingming', null);
      }
      if ('caigou' == this.userTableName) {
        this.$set(this.sessionForm, 'touxiang', null);
      }
      if ('caigou' == this.userTableName) {
        this.$set(this.sessionForm, 'xingbie', null);
      }
      if ('caigou' == this.userTableName) {
        this.$set(this.sessionForm, 'lianxidianhua', null);
      }
      if ('caigou' == this.userTableName) {
        this.$set(this.sessionForm, 'jf', null);
      }
      if ('caigou' == this.userTableName) {
        this.$set(this.sessionForm, 'money', null);
      }

      if ('yonghu' == this.userTableName) {
        this.$set(this.rules, 'yonghuming', [{ required: true, message: '请输入用户名', trigger: 'blur' }]);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.rules, 'mima', [{ required: true, message: '请输入密码', trigger: 'blur' }]);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.rules, 'xingming', [{ required: true, message: '请输入姓名', trigger: 'blur' }]);
      }
			if ('yonghu' == this.userTableName) {
        this.$set(this.rules, 'shouji', [{ required: false, validator: this.$validate.isMobile, trigger: 'blur' }]);
      }
			if ('yonghu' == this.userTableName) {
        this.$set(this.rules, 'jf', [{ required: false, validator: this.$validate.isNumber, trigger: 'blur' }]);
      }
			if ('yonghu' == this.userTableName) {
        this.$set(this.rules, 'money', [{ required: false, validator: this.$validate.isNumber, trigger: 'blur' }]);
      }
      if ('kefu' == this.userTableName) {
        this.$set(this.rules, 'zhanghao', [{ required: true, message: '请输入账号', trigger: 'blur' }]);
      }
      if ('kefu' == this.userTableName) {
        this.$set(this.rules, 'mima', [{ required: true, message: '请输入密码', trigger: 'blur' }]);
      }
			if ('kefu' == this.userTableName) {
        this.$set(this.rules, 'nianling', [{ required: false, validator: this.$validate.isIntNumer, trigger: 'blur' }]);
      }
			if ('kefu' == this.userTableName) {
        this.$set(this.rules, 'dianhua', [{ required: false, validator: this.$validate.isMobile, trigger: 'blur' }]);
      }
			if ('kefu' == this.userTableName) {
        this.$set(this.rules, 'jf', [{ required: false, validator: this.$validate.isNumber, trigger: 'blur' }]);
      }
			if ('kefu' == this.userTableName) {
        this.$set(this.rules, 'money', [{ required: false, validator: this.$validate.isNumber, trigger: 'blur' }]);
      }
      if ('caigou' == this.userTableName) {
        this.$set(this.rules, 'caigougonghao', [{ required: true, message: '请输入采购工号', trigger: 'blur' }]);
      }
      if ('caigou' == this.userTableName) {
        this.$set(this.rules, 'mima', [{ required: true, message: '请输入密码', trigger: 'blur' }]);
      }
			if ('caigou' == this.userTableName) {
        this.$set(this.rules, 'lianxidianhua', [{ required: false, validator: this.$validate.isMobile, trigger: 'blur' }]);
      }
			if ('caigou' == this.userTableName) {
        this.$set(this.rules, 'jf', [{ required: false, validator: this.$validate.isNumber, trigger: 'blur' }]);
      }
			if ('caigou' == this.userTableName) {
        this.$set(this.rules, 'money', [{ required: false, validator: this.$validate.isNumber, trigger: 'blur' }]);
      }

      this.init();
      this.getSession();
    },
    //方法集合
    methods: {
      init() {
        if ('yonghu' == this.userTableName) {
          this.dynamicProp.xingbie = '男,女'.split(',');
        }
        if ('yonghu' == this.userTableName) {
          this.dynamicProp.vip = '是,否'.split(',');
        }
        if ('kefu' == this.userTableName) {
          this.dynamicProp.xingbie = '男,女'.split(',');
        }
        if ('caigou' == this.userTableName) {
          this.dynamicProp.xingbie = '男,女'.split(',');
        }
      },
      getSession() {
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.sessionForm = res.data.data;
            localStorage.setItem('userid', res.data.data.id);
            if(res.data.data.vip) {
                localStorage.setItem('vip', res.data.data.vip);
            }
            if(res.data.data.touxiang) {
                localStorage.setItem('headportrait', res.data.data.touxiang);
            } else if(res.data.data.headportrait) {
                localStorage.setItem('headportrait', res.data.data.headportrait);
            }
          }
        });
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.userTableName + '/update', this.sessionForm).then(res => {
              if (res.data.code == 0) {
                this.$message({
                  message: '更新成功',
                  type: 'success',
                  duration: 1500
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      yonghutouxiangHandleAvatarSuccess(res, file) {
        if (res.code == 0) {
          if ('yonghu' == this.userTableName) {
            this.sessionForm.touxiang = 'upload/' + res.file;
          }
        }
      },
      kefutouxiangHandleAvatarSuccess(res, file) {
        if (res.code == 0) {
          if ('kefu' == this.userTableName) {
            this.sessionForm.touxiang = 'upload/' + res.file;
          }
        }
      },
      caigoutouxiangHandleAvatarSuccess(res, file) {
        if (res.code == 0) {
          if ('caigou' == this.userTableName) {
            this.sessionForm.touxiang = 'upload/' + res.file;
          }
        }
      },
      chongzhi() {
        if (this.chongzhiForm.money == '') {
          this.$message({
            message: '请输入充值金额',
            type: 'error',
            duration: 1500
          });
          return;
        }
        if (this.chongzhiForm.money <= 0) {
          this.$message({
            message: '请输入正确的充值金额',
            type: 'error',
            duration: 1500
          });
          return;
        }
        if (this.chongzhiForm.radio == '') {
          this.$message({
            message: '请选择充值方式',
            type: 'error',
            duration: 1500
          });
          return;
        }
        this.sessionForm.money = parseFloat(this.sessionForm.money) + parseFloat(this.chongzhiForm.money);
        this.$http.post(this.userTableName + '/update', this.sessionForm).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: '充值成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.dialogFormVisibleMoney = false;
              }
            });
          }
        });
      },
      chongzhivip() {
        this.chongzhiForm.money == 199;
        if (this.chongzhiForm.radio == '') {
          this.$message({
            message: '请选择支付方式',
            type: 'error',
            duration: 1500
          });
          return;
        }
        if(this.sessionForm.vip == '是') {
          this.$message({
            message: '您已是我们的尊贵会员。',
            type: 'success',
            duration: 1500
          });
          return;
        }
        
        this.sessionForm.vip = "是"
        this.$http.post(this.userTableName + '/update', this.sessionForm).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: '会员购买成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                localStorage.setItem('vip', this.sessionForm.vip);
                this.dialogFormVisibleVip = false;
              }
            });
          }
        });
      },
      handleClick(tab, event) {
        switch(event.target.outerText) {
          case '个人中心':
            tab.$router.push('/index/center');
            break;
          case '我的订单':
            tab.$router.push('/index/shop-order/order');
            break;
          case '我的地址':
            tab.$router.push('/index/shop-address/list');
            break;
          case '我的收藏':
            localStorage.setItem('storeupType', 1);
            tab.$router.push('/index/storeup');
            break;
        }

        this.title = event.target.outerText;
      },
      logout() {
        localStorage.clear();
        Vue.http.headers.common['Token'] = "";
        this.$router.push('/index/home');
        this.activeIndex = '0'
        localStorage.setItem('keyPath', this.activeIndex)
        this.$forceUpdate()
        this.$message({
            message: '登出成功',
            type: 'success',
            duration: 1500,
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .center-preview {
  
    .el-tabs {
      & /deep/ .el-tabs__header {
        .el-tabs__nav-wrap {
          margin: 0;
  
          &::after {
            content: none;
          }
        }
  
        .el-tabs__active-bar {
          display: none !important;
        }
      }
  
      .center-preview-pv {
        .el-date-editor.el-input {
          width: auto;
        }
  
        .balance {
          .el-input {
            width: auto;
          }
        }
      }
    }
  }
  
  .center-preview .el-tabs /deep/ .el-tabs__header {
	padding: 0;
	margin: 0;
	background: none;
	width: 180px;
	border-width: 0;
	position: relative;
	float: left;
  }
  
  .center-preview .el-tabs /deep/ .el-tabs__header .el-tabs__item {
  	border: 1px solid #ab85d3;
  	border-radius: 30px;
  	padding: 0 10px;
  	margin: 10px 0;
  	color: #666;
  	background: none;
  	font-weight: 500;
  	font-size: 14px;
  	line-height: 40px;
  	position: relative;
  	text-align: center;
  	height: 40px;
  }
  
  .center-preview .el-tabs /deep/ .el-tabs__header .el-tabs__item:hover {
  	border: 0;
  	border-radius: 30px;
  	padding: 0 10px;
  	color: #fff;
  	background: rgba(171, 133, 211,.5);
  	font-weight: 500;
  	font-size: 14px;
  	line-height: 40px;
  	position: relative;
  	text-align: center;
  	height: 40px;
  }
  
  .center-preview .el-tabs /deep/ .el-tabs__header .el-tabs__item.is-active {
  	border-radius: 30px;
  	padding: 0 10px;
  	color: #ffff;
  	background: rgba(171, 133, 211,.8);
  	font-weight: 500;
  	font-size: 14px;
  	line-height: 40px;
  	position: relative;
  	text-align: center;
  	height: 40px;
  }
  
  .center-preview .el-tabs /deep/ .el-tabs__content .el-tab-pane {
  	border-radius: 8px;
  	padding: 10px 10px 30px;
  	background: #f8f8fc;
  	width: calc(100% - 40px);
  	float: right;
  }
  
  .center-preview-pv .el-form-item /deep/ .el-form-item__label {
  	padding: 0 10px 0 0;
  	color: #666;
  	font-weight: 500;
  	width: 80px;
  	font-size: 14px;
  	line-height: 40px;
  	text-align: right;
  }
  
  .center-preview-pv .el-form-item .el-form-item__content {
    margin-left: 80px;
  }
  
  .center-preview-pv .el-input /deep/ .el-input__inner {
  	border: 1px solid #dbd9f4;
  	border-radius: 20px;
  	padding: 0 12px;
  	outline: none;
  	color: #999;
  	width: 400px;
  	font-size: 14px;
  	height: 40px;
  }
  
  .center-preview-pv .el-select /deep/ .el-input__inner {
  	border: 1px solid #dbd9f4;
  	border-radius: 20px;
  	padding: 0 12px;
  	outline: none;
  	color: #999;
  	width: 400px;
  	font-size: 14px;
  	height: 40px;
  }
  
  .center-preview-pv .el-date-editor /deep/ .el-input__inner {
  	border: 1px solid #dbd9f4;
  	border-radius: 20px;
  	padding: 0 10px 0 30px;
  	outline: none;
  	color: #999;
  	width: 200px;
  	font-size: 14px;
  	height: 40px;
  }
  
  .center-preview-pv /deep/ .avatar-uploader-icon {
  	border: 1px solid #dbd9f4;
  	cursor: pointer;
  	border-radius: 30px;
  	color: #b3aeea;
  	width: 200px;
  	font-size: 32px;
  	line-height: 120px;
  	text-align: center;
  }
  
  .center-preview-pv .el-form-item.balance /deep/ .el-input__inner {
  	border: 1px solid #dbd9f4;
  	border-radius: 20px 0 0 20px;
  	padding: 0 12px;
  	outline: none;
  	color: #999;
  	display: inline-block;
  	width: 200px;
  	font-size: 14px;
  	height: 40px;
  }
</style>

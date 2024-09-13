const base = {
    get() {
        return {
            url : "http://localhost:8080/ssmo814wskq/",
            name: "ssmo814wskq",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/ssmo814wskq/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于SSM的网上鲜花销售系统 "
        } 
    }
}
export default base

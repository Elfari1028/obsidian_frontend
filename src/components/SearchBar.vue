<template>
    <div :inline="true" class="search_block">
        <el-form :inline="true" class="search_block">
            <el-form-item>
                <el-input v-model="searchKeywords" placeholder="输入关键词" id="search_input"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="submitSearch" size="mini">搜索</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        name: "SearchBar",
        data() {
            return {
                searchKeywords: "",
                blogData: {

                }
            }
        },
        methods: {
            toLoginPage: function () {
                /**
                 * 需要其他页面路由设置
                 */
                //this.$router.push(name:"");
            },
            submitSearch:function() {
                console.log('submit!');
                console.log(this.searchKeywords);
                if(this.searchKeywords === "")
                {
                    this.$router.push({name:'Search'});
                }
                else
                {
                    /**
                     * @Interface 给keywords获取结果集，我根据你的结果集写解析代码
                     * 解析不在这个页面，这个页面缺一个接口地址，get请求给了个keywords参数
                     */
                    this.$router.push({name: "SearchResult", params:{ newkeywords: this.searchKeywords }});
                }
            },
        }
    }
</script>

<style scoped>
    #search_input {
        margin-right: 5px;
    }
    .search_block
    {
        float: left;
        height: 44px;
    }

</style>
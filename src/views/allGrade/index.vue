<template>
  <div class="all-grade">
    <div v-for="(item,inde) in list" :key="inde">
      <p class="grade-name">{{item.type}}</p>
      <div class="grade-card" v-for="(item1,inde1) in item.content" :key="inde1">
        <p class="card-name">{{item1.type}}</p>
        <div class="card-bottom" v-for="(item2,inde2) in item1.content" :key="inde2">
          <img  
            :src="`/image-service/common/image_get?systemId=saas&secret=46f869eea8b31d14&key=${item2.achievedIcon}`"
          />
          <div class="card-p">
            <p>{{item2.name}}</p>
            <p class="card-deb">{{item2.requirement}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QueryAllGrade, QueryMyGrade } from "@/api/gold.js";
var moment = require("moment");
import "moment/locale/zh-cn";
export default {
  components: {},
  data() {
    return {
      list: []
    };
  },
  computed: {},
  mounted() {
    this.setTitle("所有成就和获取要求");
    this.query();
  },

  methods: {
    setTitle(title) {
      if (window.webkit != undefined) {
        window.webkit.messageHandlers.setTitle.postMessage(title);
      } else {
        window.android.setTitle(title);
      }
    },
    showAll() {
      this.$router.push("allGrade");
    },
    query() {
      let params = {};
      QueryAllGrade(params).then(res => {
        console.log(res);
        this.list = res.data;
      });
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.all-grade {
  background: #fff;
  .grade-name {
    font-weight: bold;
    font-size: 28px;
    color: #272727;
    background: #f7f7f7;
    line-height: 80px;
    padding-left: 32px;
  }
  .grade-card {
    padding-left: 32px;
    padding-bottom: 32px;
    .card-name {
      font-size: 28px;
      color: #666666;
      padding-top: 32px;
    }
    .card-bottom {
      margin: 32px 0;
      img {
        float: left;
        width: 78px;
        height: 78px;
      }
      .card-p {
        display: inline-block;
        padding-left: 24px;
        font-size: 24px;
        color: #272727;
        .card-deb {
          color: #a6a6a6;
        }
      }
    }
  }
}
</style>




<template>
  <div class="grade">
    <div class="grade-title">
      <p v-if="count>0">
        您已获得
        <span>{{count}}</span>个成绩！再接再厉！
      </p>
      <p v-else>您还没有获得成就</p>
      <button @click="showAll">查看所有成就和获取要求 ></button>
    </div>
    <div class="status-icon" v-if="list.length == 0">
      <div>
        <img src="../../../static/img/金币为空.png" />
        <p class="text">您尚未获得成就，请多多加油！</p>
      </div>
    </div>
    <div v-else v-for="(item,index) in list" :key="index">
      <p class="grade-name">{{item.type}}</p>
      <div class="grade-card" v-for="(item1,inde1) in item.content" :key="inde1">
        <p class="card-name">{{item1.type}}</p>
        <div v-for="(item2,inde) in item1.content" :key="inde">
          <img
            :src="`/image-service/common/image_get?systemId=saas&secret=46f869eea8b31d14&key=${item2.achievedIcon}`"
          />
          <p>{{item2.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QueryMyGrade } from "@/api/gold.js";
var moment = require("moment");
import "moment/locale/zh-cn";
export default {
  components: {},
  data() {
    return {
      personId: "RY8dd7277c61ae45aba6e4095ee83fffde",
      count: 0,
      list: [],
      projectId:""
    };
  },
  computed: {},
  mounted() {
    this.projectId = this.$route.query.projectId;
    // this.personId = this.$route.query.personId;
    this.setTitle("我的成就");
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
      let params = {
        postParams: {
          criteria: {
            personId: this.personId,
            achieved: true
          }
        }
      };
      QueryMyGrade(params).then(res => {
        console.log(res);
        this.count = res.count;
        this.list = res.content;
      });
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.grade {
  background: #fff;
  height: 1450px;
  .grade-title {
    background: #303b8a;
    box-shadow: 0 3px 6px 0 rgba(0, 6, 55, 0.1);
    color: #fff;
    p {
      font-size: 28px;
      padding-left: 32px;
      padding-top: 66px;
      span {
        font-size: 48px;
        color: #fdc015;
      }
    }
    button {
      padding: 5px 20px;
      font-size: 24px;
      text-align: center;
      background: #262f6e;
      color: #fff;
      border-radius: 18px;
      margin: 27px 0 51px 32px;
    }
  }
  .status-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 310px;
    div {
      text-align: center;
      img {
        width: 164px;
        height: 132px;
      }
      .text {
        font-size: 36px;
        color: #262626;
        padding-top: 40px;
      }
    }
  }
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
    background: #fff;
    .card-name {
      font-size: 28px;
      color: #666666;
      padding-top: 32px;
    }
    img {
      width: 145px;
      height: 145px;
    }
    div {
      margin: 32px;
      display: inline-block;
      p {
        font-size: 24px;
        color: #272727;
        padding-top: 13px;
        text-align: center;
      }
    }
  }
}
</style>




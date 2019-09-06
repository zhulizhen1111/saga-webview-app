<template>
  <div class="emergePlan">
    <div class="status-icon" v-if="lists.length == 0">
      <div>
        <img src="../../../static/img/页面内容为空.png" />
        <p class="text">您还没有参加应急预案考试</p>
      </div>
    </div>
    <div class="my-card" v-else v-for="(item,index) in lists" :key="index">
      <p>
        <span class="my-title">{{item.plan.planName}}</span>
        <button :class="!item.isPass?'fail':'card-grade'">{{item.isPass?"通过":"不通过"}}</button>
      </p>
      <div class="em-crd">
        <div class="every-card">
          <div class="crd-img">
            <img src="../../../static/img/笔试.png" />
            <p class="crd-p">笔试</p>
          </div>
          <div class="crd-div">
            <p>是否通过</p>
            <p>考试日期</p>
            <p>下次考试日期</p>
          </div>
          <div class="crd-div" v-if="item.master">
            <p :class="item.master.writtenState == 1?'card-grade1':'fail1'">{{item.master.writtenState == 1?"通过":"不通过"}}</p>
            <p>{{formatDate(item.master.writtenPassTime)}}</p>
            <p>{{formatDate(item.master.writtenNextTime)}}</p>
          </div>
        </div>
        <div class="every-card">
          <div class="crd-img">
            <img src="../../../static/img/线下实操.png" />
            <p class="crd-p">线下实操</p>
          </div>
          <div class="crd-div">
            <p>是否通过</p>
            <p>考试日期</p>
            <p>下次考试日期</p>
          </div>
          <div class="crd-div" v-if="item.master">
            <p :class="item.master.operationState == 1?'card-grade1':'fail1'">{{item.master.operationState == 1?"通过":"不通过"}}</p>
            <p>{{formatDate(item.master.operationNextTime)}}</p>
            <p>{{formatDate(item.master.operationNextTime)}}</p>
          </div>
        </div>
        <div class="every-card">
          <div class="crd-img">
            <img src="../../../static/img/应急演练.png" />
            <p class="crd-p">应急演练</p>
          </div>
          <div class="crd-div">
            <p>是否通过</p>
            <p>考试日期</p>
            <p>下次考试日期</p>
          </div>
          <div class="crd-div" v-if="item.master">
            <p :class="item.master.emergencyState == 1?'card-grade1':'fail1'">{{item.master.emergencyState == 1?"通过":"不通过"}}</p>
            <p>{{formatDate(item.master.emergencyPassTime)}}</p>
            <p>{{formatDate(item.master.emergencyNextTime)}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QueryIncident } from "@/api/gold.js";
var moment = require("moment");
import "moment/locale/zh-cn";
export default {
  components: {},
  data() {
    return {
      projectId: "Pj1101080002",
      personId: "RY8b1c29cb378e45dab049b2c607bcc88e",
      lists: []
    };
  },
  computed: {},
  mounted() {
    this.projectId = this.$route.query.projectId;
    this.personId = this.$route.query.personId;
    this.setTitle("我的应急预案");
    this.getQuery();
  },

  methods: {
    setTitle(title) {
      if (window.webkit != undefined) {
        window.webkit.messageHandlers.setTitle.postMessage(title);
      } else {
        window.android.setTitle(title);
      }
    },
    formatDate(date) {
      if (date) {
        let time = moment.unix(date / 1000).format("YYYY.MM.DD");
        return time;
      }
    },
    getQuery() {
      let params = {
        postParams: {
          criteria: {
            projectId: this.projectId,
            personId: this.personId
          }
        }
      };
      QueryIncident(params).then(res => {
        console.log(res);
        this.lists = res.content;
      });
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.emergePlan {
  height: 100%;
  .my-card {
    padding: 40px 0 32px 32px;
    margin: 32px;
    width: 686px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
    .my-title {
      font-size: 32px;
      color: #2f3775;
    }
    .em-crd {
      margin-top: 32px;
    }
    .card-grade {
      float: right;
      padding: 0 30px;
      height: 48px;
      line-height: 48px;
      border-radius: 24px;
      text-align: center;
      color: #36a4aa;
      background: #dff2f3;
      font-size: 28px;
      margin-right: 32px;
    }
    .fail {
      color: #e65959;
      background: #fbe4e4;
      float: right;
      padding: 0 30px;
      height: 48px;
      line-height: 48px;
      border-radius: 24px;
      text-align: center;
      font-size: 28px;
      margin-right: 32px;
    }
    .every-card {
      width: 622px;
      height: 174px;
      background: #f2f3f6;
      border-radius: 12px;
      margin: 12px 0;
      padding: 32px 80px;
      display: flex;
      justify-content: space-between;
      .crd-img {
        float: left;
        img {
          width: 64px;
          height: 64px;
        }
        .crd-p {
          font-size: 24px;
          color: #272727;
        }
      }
      .crd-div {
        color: #666;
        font-size: 24px;
        width: 240px;
        margin-left: 50px;
        .card-grade1 {
           color: #666;
        }
        .fail1{
          color: #e65959;
        }
        p {
          line-height: 34px;
          span {
            // padding-left:48px;
          }
        }
      }
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
}
</style>




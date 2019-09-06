<template>
  <div class="advance">
    <div class="my-card" v-for="(item,index) in lists" :key="index">
      <div class="my-left">
        <a
          class="my-name"
          :href="`/image-service/common/file_get?systemId=saas&secret=46f869eea8b31d14&key=${item.fileName}`"
          :download="`${item.fileName}`"
        >{{item.planName}}</a>
        <p class="my-time">
          <span>{{formatDate(item.updateTime)}}更新</span>
        </p>
      </div>
      <button class="my-btn" @click="selectPhone(item.planAddressBooks)">联系负责人</button>
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
      <staff :planAddressBooks="planAddressBooks"></staff>
    </mt-popup>
  </div>
</template>

<script>
var moment = require("moment");
import "moment/locale/zh-cn";
import staff from "../staff";
import { QueryEventReport, QueryIncident } from "@/api/gold.js";
import { mapGetters } from "vuex";
export default {
  components: {
    staff
  },
  data() {
    return {
      projectId: "Pj1101080002",
      lists: [],
      popupVisible: false,
      planAddressBooks: []
    };
  },
  computed: {
    // ...mapGetters(["projectId"])
  },
  mounted() {
    this.projectId = this.$route.query.projectId;
    this.setTitle("应急预案");
    this.query();
  },

  methods: {
    selectPhone(planAddressBooks) {
      this.popupVisible = true;
      this.planAddressBooks = planAddressBooks;
    },
    query() {
      let params = {
        postParams: {
          criteria: {
            projectId: this.projectId
          }
        }
      };
      QueryEventReport(params).then(res => {
        this.lists = res.content;
      });
    },
    formatDate(date) {
      const now = +new Date();
      const toDay = moment.unix(now / 1000).format("YYYY.MM.DD");

      // 计算出今天00:00时刻的时间戳
      const oneDay = 24 * 60 * 60 * 1000;
      const todayStart = +new Date(toDay);
      let time = null;
      if (date < todayStart + oneDay && date >= todayStart) {
        time = "今天";
      } else if (date < todayStart && date >= todayStart - oneDay) {
        time = "昨天";
      } else if (
        date < todayStart - oneDay &&
        date >= todayStart - 2 * oneDay
      ) {
        time = "前天";
      } else {
        time = moment.unix(date / 1000).format("YYYY.MM.DD");
      }
      return time;
    },
    setTitle(title) {
      if (window.webkit != undefined) {
        window.webkit.messageHandlers.setTitle.postMessage(title);
      } else {
        window.android.setTitle(title);
      }
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.advance {
  margin: 20px;
  .my-card {
    height: 152px;
    width: 686px;
    padding: 32px;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
    margin-bottom: 20px;
    .my-left {
      float: left;
      .my-name {
        font-size: 32px;
        color: #2f3775;
      }
      .my-time {
        padding-top: 16px;
        font-size: 24px;
        color: #a6a6a6;
      }
    }
  }
  .my-btn {
    float: right;
    margin-right: 32px;
    // width: 188px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    background: #3bacb2;
    border-radius: 30px;
    font-size: 28px;
    margin-top: 24px;
  }
}
</style>

<style lang="less" style="text/less">
.advance {
  .mint-popup {
    width: 100%;
    height: 328px;
    overflow: scroll;
  }
}
</style>



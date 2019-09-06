<template>
  <div class="gold">
    <div class="my-gold">
      <p class="my-title">
        我的金币
        <span class="total">累计获得{{total}}金币</span>
      </p>
      <p class="gold-num">{{balance}}</p>
      <p class="gold-name">当前剩余金币</p>
    </div>
    <div class="my-grade">
      <p class="my-title">我的级别和积分</p>
      <div id="radar" style="width:330px;height:388px"></div>
      <div class="gold-card" v-if="list.length > 0" v-for="(item,ind) in list" :key="ind">
        <div class="card-title">{{formatMajor(item.level.major)}}</div>
        <div>
          <p class="card-grade">
            <img
              class="level-img"
              v-if="item.level.name.slice(0,2)=='黄金'"
              src="../../../static/img/黄金.png"
              style="border:1px solid orange"
            />
            <img
              class="level-img"
              v-if="item.level.name.slice(0,2)=='青铜'"
              src="../../../static/img/青铜.png"
            />
            <img
              class="level-img"
              v-if="item.level.name.slice(0,2)=='白银'"
              src="../../../static/img/白银.png"
            />
            <span
              class="level-name"
            >{{item.level.name.slice(0,2)}}工程师{{item.level.name.slice(item.level.name.length-1,item.level.name.length)}}</span>
            <span class="card-right">积分获取系数 {{item.level.weight.toFixed(1)}}</span>
          </p>
          <p v-if="item.level.name.slice(0,2)=='黄金'" class="p1">
            <mt-progress :value="item.point" :bar-height="5"></mt-progress>
          </p>
          <p v-if="item.level.name.slice(0,2)=='青铜'" class="p2">
            <mt-progress :value="item.point" :bar-height="5"></mt-progress>
          </p>
          <p v-if="item.level.name.slice(0,2)=='白银'" class="p3">
            <mt-progress :value="item.point" :bar-height="5"></mt-progress>
          </p>
          <p class="card-p">
            当前积分
            <span v-if="item.level.name.slice(0,2)=='黄金'" class="card-num1">{{item.point}}</span>
            <span v-if="item.level.name.slice(0,2)=='青铜'" class="card-num3">{{item.point}}</span>
            <span v-if="item.level.name.slice(0,2)=='白银'" class="card-num2">{{item.point}}</span>
            <span class="card-remain">距下一级还差{{item.gapPoint}}积分</span>
          </p>
        </div>
      </div>
      <div class="status-icon" v-if="list.length == 0">
        <div>
          <img src="../../../static/img/金币为空.png" />
          <p class="text">您尚未获得积分，请多多加油！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QueryGold, QueryLevel, major } from "@/api/gold.js";
import echarts from "echarts";
export default {
  data() {
    return {
      personId: "RY8dd7277c61ae45aba6e4095ee83fffde",
      majorList: [], //积分类型列表
      total: 0, //累计获得金币
      balance: 0, //当前剩余金币
      percentage: 50,
      customColor: "#409eff",
      list: [], //积分和等级列表
      indicator: [], // 雷达图的指标数组
      points: [] //雷达图的数据
    };
  },
  computed: {},
  mounted() {
    this.projectId = this.$route.query.projectId;
    // this.personId = this.$route.query.personId;
    this.queryMajor();
    this.query();
    this.queryLevel();
    //this.setTitle("我的金币和等级");
  },

  methods: {
    queryMajor() {
      let params = {};
      major(params).then(res => {
        this.majorList = res.data;
      });
    },
    formatMajor(code) {
      const item = this.majorList.find(i => i.code == code);
      if (item) {
        return item.name;
      } else {
        return "";
      }
    },
    draw() {
      let radar = echarts.init(document.getElementById("radar"));
      let option = {
        color: "#6870AC",
        radar: [
          {
            indicator:this.indicator,
            center: ["60%", "50%"],
            clockwise: true,
            radius: 100,
            startAngle: 90,
            splitNumber:5,
            shape: "circle",
            name: {
              formatter: "{value}",
              textStyle: {
                fontSize: "20px",
                color: "#666"
              }
            },
            splitArea: {
              areaStyle: {
                color: [
                  "rgba(24, 144, 255, 0.1)",
                  "rgba(24, 144, 255, 0.2)",
                  "rgba(24, 144, 255, 0.3)",
                  "rgba(24, 144, 255, 0.4)",
                  "rgba(24, 144, 255, 0.6)"
                ],
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.5)"
              }
            },

            splitLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.5)"
              }
            }
          }
        ],

        series: [
          {
            name: "雷达图",
            type: "radar",
            itemStyle: {normal: {areaStyle: {color: "#6870AC"}}},
            lineStyle: {
              color: 'red'
            },
            data: [
              {
                value: this.points,
                name:"积分",
                lineStyle: {
                  normal: {
                    color: '#128eee'
                  }
                },
              }
            ]
          }
        ]
      };
      console.log('option',option)
      radar.setOption(option);
    },
    setTitle(title) {
      if (window.webkit != undefined) {
        window.webkit.messageHandlers.setTitle.postMessage(title);
      } else {
        window.android.setTitle(title);
      }
    },
    query() {
      let params = {
        postParams: {
          criteria: {
            personId: this.personId
          }
        }
      };
      QueryGold(params).then(res => {
        this.total = res.content[0].total;
        this.balance = res.content[0].balance;
      });
    },
    queryLevel() {
      let params = {
        postParams: {
          criteria: {
            personId: this.personId
          }
        }
      };
      QueryLevel(params).then(res => {
        this.list = res.content;
        this.indicator = [];
        this.points = [];
        this.list.forEach(el => {
          let obj = {
            text:this.formatMajor(el.level.major),
            max:5,
            min:0
          }
          this.indicator.push(obj);
          this.points.push(el.level.orderId);
        });
         console.log(this.indicator);
        console.log(this.points)
        this.draw();
      });
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.gold {
  width: 100%;
  .my-gold {
    height: 270px;
    background: #fff;
    margin-bottom: 24px;
    p {
      span {
        float: right;
        font-size: 24px;
        color: #a6a6a6;
        margin-right: 32px;
      }
    }
    .gold-name {
      text-align: center;
      font-size: 24px;
      color: #666;
    }
    .gold-num {
      font-size: 64px;
      color: #fdc015;
      text-align: center;
    }
  }
  .my-title {
    padding: 30px 0 0 32px;
    font-size: 32px;
    color: #272727;
  }
  .my-grade {
    background: #fff;
    padding-bottom: 32px;
    .gold-card {
      width: 686px;
      background: #f7f8f9;
      margin-left: 32px;
      margin-bottom: 16px;
      padding: 24px 32px 24px 30px;
      border-radius: 6px;
      .card-title {
        margin: 0;
        width: 100px;
        font-size: 28px;
        color: #272727;
        float: left;
        padding: 42px 20px 48px 0px;
        font-weight: bold;
      }
      div {
        margin-left: 44px;
        .card-grade {
          display: flex;
          .card-right {
            color: #a6a6a6;
            font-size: 24px;
            position: absolute;
            right: 70px;
          }
          .level-img {
            width: 224px;
            height: 52px;
          }
          .level-name {
            font-size: 20px;
            position: relative;
            left: -160px;
            top: 8px;
            color: #fff;
          }
        }
        .card-p {
          font-size: 24px;
          color: #666;
          margin-left: 44px;
          .card-num1 {
            font-size: 28px;
            color: #f5b810;
          }
          .card-num2 {
            font-size: 28px;
            color: #abb5b6;
          }
          .card-num3 {
            font-size: 28px;
            color: #cc8674;
          }
          .card-remain {
            float: right;
            color: #666;
            font-size: 24px;
          }
        }
      }
    }
    .status-icon {
      display: flex;
      justify-content: center;
      align-items: center;
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
}
</style>
<style lang="less" style="text/less">
.gold {
  .p1 {
    .mt-progress-runway {
      background: #f5b810;
    }
    .mt-progress-progress {
      background: #f8e188;
    }
  }
  .p3 {
    .mt-progress-runway {
      background: #abb5b6;
    }
    .mt-progress-progress {
      background: #dae2e2;
    }
  }
  .p2 {
    .mt-progress-runway {
      background: #cc8674;
    }
    .mt-progress-progress {
      background: #f1d4c3;
    }
  }
}
</style>





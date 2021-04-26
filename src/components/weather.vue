<template>
  <div class="weather-container">
    <!-- 123 -->
    <!-- {{ weather }} -->
    <div class="back" :style="{ backgroundImage: curWeather }">
      <div class="title">
        <i class="el-icon-sunrise-1"></i>
        <span>{{ query_city.province }}</span>
        <span>{{ query_city.city }}</span>
        <span>天气预报</span>
      </div>
      <div class="content">
        <div class="weather-img">
          <img :src="weather_img[live_weather.weather]" alt="" />
          <span>{{ live_weather.weather }}</span>
        </div>
        <div class="content-label">
          <span class="left">实时气温</span>
          <span class="right">{{ live_weather.temperature }}</span>
        </div>
        <div class="content-label">
          <span class="left">风向描述</span>
          <span class="right">{{ live_weather.winddirection }}</span>
        </div>
        <div class="content-label">
          <span class="left">风力级别</span>
          <span class="right">{{ live_weather.windpower }}</span>
        </div>
        <div class="content-label">
          <span class="left">空气湿度</span>
          <span class="right">{{ live_weather.humidity }}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="carousel-box">
        <el-carousel
          trigger="click"
          height="200px"
          class="carousel"
          :interval="4500"
        >
          <el-carousel-item
            class="carousel-item"
            v-for="(item, index) in forcasts_weather"
            :key="index"
          >
            <div class="time">
              <span>{{ item.date }}</span>
              <span>{{ computeWeek(item.week) }}</span>
            </div>
            <div class="day">
              <span class="label">
                <i class="el-icon-sunny"></i>
                白天
              </span>
              <span class="label">
                <span>天气</span>
                <b>{{ item.dayweather }}</b>
              </span>
              <span class="label">
                <span>温度</span>
                <b>{{ item.daytemp }}</b>
              </span>
              <span class="label">
                <span>风向</span>
                <b>{{ item.daywind }}</b>
              </span>
              <span class="label">
                <span>风力</span>
                <b>{{ item.daypower }}</b>
              </span>
            </div>
            <div class="night">
              <span class="label">
                <i class="el-icon-moon"></i>
                夜间
              </span>
              <span class="label">
                <span>天气</span>
                <b>{{ item.nightweather }}</b>
              </span>
              <span class="label">
                <span>温度</span>
                <b>{{ item.nighttemp }}</b>
              </span>
              <span class="label">
                <span>风向</span>
                <b>{{ item.nightwind }}</b>
              </span>
              <span class="label">
                <span>风力</span>
                <b>{{ item.nightpower }}</b>
              </span>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { queryWeather } from '@/api/all';
import { weatherImg } from '@/global/weather';

export default {
  data() {
    return {
      query_city: {},
      live_weather: {},
      forcasts_weather: {},
      curWeather: '',
      // 天气图片
      weather_img: {},
    };
  },
  computed: {},
  created() {
    this.weather_img = weatherImg;
    let { region } = JSON.parse(localStorage.getItem('userInfo'));
    let curHour = Number(this.$dayjs(new Date()).format('HH'));
    let last_query_lives_time = Number(
      sessionStorage.getItem('last_query_lives_time')
    );
    let last_query_forecasts_time = Number(
      sessionStorage.getItem('last_query_forecasts_time')
    );
    // 检测是否超过一小时或尚未查询天气
    if (!last_query_lives_time || curHour - last_query_lives_time >= 1) {
      //
      this.queryLiveWeather(region);
    } else {
      this.query_city = JSON.parse(sessionStorage.getItem('query_city'));
      this.live_weather = JSON.parse(
        sessionStorage.getItem('last_query_lives')
      );
      let { weather } = this.live_weather;
      if (weather.includes('晴')) {
        this.curWeather = `url('${this.weather_img['sunny']}')`;
      } else if (weather.includes('雨')) {
        this.curWeather = `url('${this.weather_img['rain']}')`;
      }
      console.log(this.curWeather);
    }
    // 检查上次查询预报天气是否在天气预报更新时间 8 11 18点 之前 或 尚未查询预报天气
    if (!last_query_forecasts_time) {
      this.queryForecastsWeather(region);
    } else if (last_query_forecasts_time) {
      //
      let updateTime = '';
      if (curHour < 8) {
        return;
      } else if (curHour >= 8 && curHour < 11) {
        updateTime = 11;
      } else if (curHour >= 11 && curHour < 18) {
        updateTime = 18;
      } else updateTime = 8;
      if (curHour >= updateTime && updateTime > last_query_forecasts_time) {
        this.queryForecastsWeather(region);
      } else {
        this.forcasts_weather = JSON.parse(
          sessionStorage.getItem('last_query_forcasts')
        );
      }
    }
  },
  methods: {
    computeWeek(week) {
      switch (week) {
        case '1':
          return '星期一';
        case '2':
          return '星期二';
        case '3':
          return '星期三';
        case '4':
          return '星期四';
        case '5':
          return '星期五';
        case '6':
          return '星期六';
        default:
          return '星期日';
      }
    },
    // 查询实时天气
    async queryLiveWeather(region) {
      let city = region == '1' || !region ? '370600' : region;
      let params = {
        city,
        extensions: 'base',
      };
      const { data, code, msg } = await queryWeather(params);
      if (code === 1) {
        const {
          province,
          city,
          adcode,
          reporttime,
          weather,
          temperature,
          winddirection,
          windpower,
          humidity,
        } = data;
        this.query_city = {
          province,
          city,
          adcode,
          reporttime,
        };
        this.live_weather = {
          weather,
          temperature,
          winddirection,
          windpower,
          humidity,
        };
        sessionStorage.setItem('query_city', JSON.stringify(this.query_city));
        sessionStorage.setItem(
          'last_query_lives',
          JSON.stringify(this.live_weather)
        );
        sessionStorage.setItem(
          'last_query_lives_time',
          this.$dayjs(reporttime).format('HH')
        );
      } else console.error(msg);
    },
    // 查询预报天气
    async queryForecastsWeather(region) {
      let city = region == '1' || !region ? '370600' : region;
      let params = {
        city,
        extensions: 'all',
      };
      const { data, code, msg } = await queryWeather(params);
      if (code === 1) {
        const { casts, reporttime } = data;
        this.forcasts_weather = casts;
        sessionStorage.setItem(
          'last_query_forecasts_time',
          this.$dayjs(reporttime).format('HH')
        );
        sessionStorage.setItem(
          'last_query_forcasts',
          JSON.stringify(this.forcasts_weather)
        );
      } else {
        console.error(msg);
      }
    },
  },
};
</script>

<style lang="less">
.weather-container {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  .title {
    padding-left: 50px;
    font-size: 18px;
    box-sizing: border-box;
    color: #fff;
    font-weight: 600;
    width: 100%;
    i {
      width: 25px;
      font-size: 20px;
    }
    span {
      display: inline-block;
      width: auto;
      margin: 15px 5px 15px 0;
    }
  }
  .back {
    background-size: 100%;
    background-repeat: no-repeat;
    width: 100%;
  }
  .content {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    .weather-img {
      width: 100%;
      height: 80px;
      margin-bottom: 15px;
      img {
        width: 90px;
        height: 100%;
        float: left;
        margin-left: 40px;
      }
      span {
        display: block;
        float: left;
        font-size: 24px;
        letter-spacing: 15px;
        line-height: 100px;
        height: 100%;
        margin-left: 40px;
      }
    }
    .content-label {
      margin-top: 5px;
      width: 100%;
      height: 45px;
      background: #eee;
      border-radius: 6px;
      padding: 2px 15px;
      box-sizing: border-box;
      span {
        display: block;
        float: left;
        text-align: center;
        padding-top: 5px;
        box-sizing: border-box;
      }
      .left {
        width: 60%;
        height: 100%;
        font-size: 24px;
        font-family: '隶书';
      }
      .right {
        width: 40%;
        height: 100%;
        font-size: 21px;
        font-family: 'Times New Roman', '宋体';
      }
    }
    .carousel-box {
      margin-top: 25px;
      width: 100%;
      background: cornsilk;
      .carousel {
        width: 100%;
        // height: 100px;
        padding: 5px;
        box-sizing: border-box;
        .carousel-item {
          width: 100%;
          height: 100%;
          text-align: center;
          .time {
            height: 25px;
            width: 100%;
            margin-top: 2px;
          }
          .day,
          .night {
            height: calc(100% - 25px);
            width: 50%;
            margin-top: 2px;
            float: left;
            border: 0;
            text-align: center;
            display: flex;
            flex-direction: column;
            .label {
              flex: 1;
              width: 100%;
              span {
                display: block;
                width: 100px;
                float: left;
              }
              b {
                display: block;
                float: left;
              }
            }
          }
        }
      }
    }
  }
}
</style>

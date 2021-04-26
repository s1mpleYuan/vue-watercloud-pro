<template>
  <div class="weather-container">
    <!-- 123 -->
    <!-- {{ weather }} -->
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
        <span class="left"></span>
        <span class="right"></span>
      </div>
      <div class="content-label">
        <span class="left"></span>
        <span class="right"></span>
      </div>
      <div class="content-label">
        <span class="left"></span>
        <span class="right"></span>
      </div>
      <div class="content-label">
        <span class="left"></span>
        <span class="right"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { queryWeather } from '@/api/user';
export default {
  data() {
    return {
      query_city: {},
      live_weather: {},
      forcasts_weather: {},
      curWeather: '',
      weather_img: {
        多云: require('../assests/images/weather/duoyun.png'),
        leizhenyu: require('../assests/images/weather/leizhenyu.png'),
        qing: require('../assests/images/weather/qing.png'),
        wumai: require('../assests/images/weather/wumai.png'),
        yu: require('../assests/images/weather/yu.png'),
        阴: require('../assests/images/weather/yin.png'),
      },
    };
  },
  created() {
    let curHour = this.$dayjs(new Date()).format('HH');
    let last = localStorage.getItem('weather_query_last_hour');
    if (!last || Number(curHour) - Number(last) >= 1) {
      // let { region } = JSON.parse(localStorage.getItem('userInfo'));
      // this.queryWeather(region);
    }
  },
  methods: {
    // setWeather (live) {

    // },
    async queryLiveWeather() {

    },
    // async queryWeather(region) {
    //   let city = region == '1' || !region ? '370600' : region;
    //   let params = {
    //     city,
    //   };
    //   const { data, code, msg } = await queryWeather(params);
    //   if (code === 1) {
    //     const { lives, forecasts } = data;
    //     const {
    //       province,
    //       city,
    //       adcode,
    //       reporttime,
    //       weather,
    //       temperature,
    //       winddirection,
    //       windpower,
    //       humidity,
    //     } = lives;
    //     this.query_city = {
    //       province,
    //       city,
    //       adcode,
    //       reporttime,
    //     };
    //     this.live_weather = {
    //       weather,
    //       temperature,
    //       winddirection,
    //       windpower,
    //       humidity,
    //     };
    //     this.forcasts_weather = forecasts.casts;
    //     localStorage.setItem(
    //       'weather_query_last_hour',
    //       this.$dayjs(this.query_city.reporttime).format('HH')
    //     );
    //   } else {
    //     console.error(msg);
    //   }
    // },
  },
};
</script>

<style lang="less">
.weather-container {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background: brown;
  .title {
    padding-left: 50px;
    font-size: 18px;
    box-sizing: border-box;
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
  .content {
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
      height: 50px;
      background: cadetblue;
      border-radius: 6px;
    }
  }
}
</style>

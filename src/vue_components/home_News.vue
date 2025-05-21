<template>
<div class="component">

  <Carousel v-bind="carouselConfig">
    <Slide v-for="(n,idx) in allNews" :key="idx">
      <div class="card">
        <div class="card-content">
          <div class="card-title">
            <a :href="n.news_link" target="_blank" rel="noopener noreferrer">
              {{n.title}}
            </a>
          </div>
          <br/>
          <div class="card-text">
            <a :href="n.news_link" target="_blank" rel="noopener noreferrer">
              {{n.content}}
            </a>
          </div>
        </div>
      </div>
    </Slide>
    <template #addons>
      <Navigation />
      <Pagination class="thin-only" />
    </template>
  </Carousel>

</div>
</template>

<script>
import axios from 'axios';
import { defineComponent } from 'vue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'


export default defineComponent({
  name: 'News',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      allNews: [],
      itemsToShow: 1.5,
      autoplay: 3000,
      wrapAround: true
    }
  },
  computed: {
    carouselConfig() {
      return {
        itemsToShow: this.itemsToShow,
        autoplay: this.autoplay,
        wrapAround: this.wrapAround
      }
    }
  },
  mounted: function () {
    axios.get('https://talk.vtaiwan.tw/t/facebook/1249/last.json?include_raw=1') //news
      .then((response)=>{
        var news = response.data;
        news = news['post_stream']['posts'].slice(1);

        news.forEach((post)=>{
          var tmp = {};
          var tag = {};
          var tags = [];
          post = post['raw'].split("<br>");
          var tag_tmp = post[9].split("\n");
          tmp['title'] = post[1];
          tmp['content'] = post[3];
          tmp['img_link'] = post[5];
          tmp['source'] = post[7];
          for(var i in tag_tmp){
            if(tag_tmp[i]!="【新聞快遞】" && tag_tmp[i].indexOf("http") == -1 ){
              tag = tag_tmp[i].replace(/，|#|、|\//g," ");
              tag = tag.split(" ");
              for(var j in tag){
                if(tag[j]!=""){
                  tags.push(tag[j]);
                }
              }
            }
          }
          tmp['tags'] = tags;
          tmp['news_link'] = post[11];
          tmp['source_link'] = post[11].split("/")[2];
          tmp['setup_time'] = post[13];
          this.allNews.push(tmp);
        })
        this.allNews.sort(function(a,b){
          return new Date(b.setup_time).getTime() - new Date(a.setup_time).getTime();
        })
      })
  },
})
</script>

<style scoped>



.card {
  height: 300px;
  max-width: 600px;
}

.card-content {
  padding: 15px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}






</style>

<template>
  <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
    <b-row>
      <b-col cols="12">
        <BlockSearchBox></BlockSearchBox>
      </b-col>
    </b-row>
    <b-row class="my-3">
      <b-col cols="12" lg="6" class="d-flex flex-column">
        <h2 class="head-global my-3">Blockchain Info</h2>
        <div class="block-global p-3 mb-3 rounded-lg w-100 h-100">
          <b-row>
            <b-col cols="12" md="6">
              <div class="bg-purple-gd rounded-lg text-center p-3 my-3">
                <p class="my-1 text-style-2">2,000,000,000 ECOC</p>
                <p class="my-1">Final Supply(Max)</p>
              </div>
            </b-col>
            <b-col cols="12" md="6">
              <div class="bg-purple-gd rounded-lg text-center p-3 my-3">
                <p class="my-1 text-style-2">219,586,100 ECOC</p>
                <p class="my-1">Current Supply</p>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <div class="my-1 text-truncate">0.004</div>
                <div class="my-1 small text-purple-light">Relay Fee</div>
              </div>
            </b-col>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <div class="my-1 text-truncate">8,852,401.7178329</div>
                <div class="my-1 small text-purple-light">Difficulty</div>
              </div>
            </b-col>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <div class="my-1 text-truncate">118</div>
                <div class="my-1 small text-purple-light">Connections</div>
              </div>
            </b-col>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <div class="my-1 text-truncate">43,321,266.64651033</div>
                <div class="my-1 small text-purple-light">Network Weight</div>
              </div>
            </b-col>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <div class="my-1 text-truncate">401,700</div>
                <div class="my-1 small text-purple-light">Block Height</div>
              </div>
            </b-col>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <div class="my-1 text-truncate">50 ECOC</div>
                <div class="my-1 small text-purple-light">Block Reward</div>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col cols="12" lg="6" class="d-flex flex-column">
        <h2 class="head-global my-3">7 day ECOC transaction history</h2>
        <div class="block-global p-3 mb-3 rounded-lg w-100 h-100 d-flex align-items-center">
          <canvas id="graph"></canvas>
        </div>
      </b-col>
    </b-row>
    <b-row class="my-3">
      <b-col cols="12">
        <h2 class="head-global my-3">Blocks</h2>
        <div class="block-bitcoin">
          <swiper :options="swiperOption">
            <!-- slides -->
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <router-link to="/block">399129</router-link>
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Mined by:
                  <router-link
                    to="/address"
                    class="d-block text-truncate"
                  >EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                </div>
                <div class="my-1 small">Size: 927</div>
                <div class="my-1 small">Transactions: 2</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <router-link to="/block">399129</router-link>
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Mined by:
                  <router-link
                    to="/address"
                    class="d-block text-truncate"
                  >EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                </div>
                <div class="my-1 small">Size: 927</div>
                <div class="my-1 small">Transactions: 2</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <router-link to="/block">399129</router-link>
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Mined by:
                  <router-link
                    to="/address"
                    class="d-block text-truncate"
                  >EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                </div>
                <div class="my-1 small">Size: 927</div>
                <div class="my-1 small">Transactions: 2</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <router-link to="/block">399129</router-link>
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Mined by:
                  <router-link
                    to="/address"
                    class="d-block text-truncate"
                  >EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                </div>
                <div class="my-1 small">Size: 927</div>
                <div class="my-1 small">Transactions: 2</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <router-link to="/block">399129</router-link>
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Mined by:
                  <router-link
                    to="/address"
                    class="d-block text-truncate"
                  >EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                </div>
                <div class="my-1 small">Size: 927</div>
                <div class="my-1 small">Transactions: 2</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <router-link to="/block">399129</router-link>
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Mined by:
                  <router-link
                    to="/address"
                    class="d-block text-truncate"
                  >EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                </div>
                <div class="my-1 small">Size: 927</div>
                <div class="my-1 small">Transactions: 2</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <router-link to="/block">399129</router-link>
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Mined by:
                  <router-link
                    to="/address"
                    class="d-block text-truncate"
                  >EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                </div>
                <div class="my-1 small">Size: 927</div>
                <div class="my-1 small">Transactions: 2</div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </b-col>
    </b-row>
    <b-row class="my-3 mb-4 mb-sm-5">
      <b-col cols="12">
        <h2 class="head-global my-3">Transactions</h2>
        <div class="block-bitcoin">
          <swiper :options="swiperOption">
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Hash:
                  <router-link to="/tx" class="d-block text-truncate">9bb6236fd1c0d25b98bc8d95b5a7ab81f10e9fa9d57fdbfeb76390c92d1a8db9</router-link>
                </div>
                <div class="my-1 small">Value Out: 1,275.7 ECOC</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Hash:
                  <router-link to="/tx" class="d-block text-truncate">9bb6236fd1c0d25b98bc8d95b5a7ab81f10e9fa9d57fdbfeb76390c92d1a8db9</router-link>
                </div>
                <div class="my-1 small">Value Out: 1,275.7 ECOC</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Hash:
                  <router-link to="/tx" class="d-block text-truncate">9bb6236fd1c0d25b98bc8d95b5a7ab81f10e9fa9d57fdbfeb76390c92d1a8db9</router-link>
                </div>
                <div class="my-1 small">Value Out: 1,275.7 ECOC</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Hash:
                  <router-link to="/tx" class="d-block text-truncate">9bb6236fd1c0d25b98bc8d95b5a7ab81f10e9fa9d57fdbfeb76390c92d1a8db9</router-link>
                </div>
                <div class="my-1 small">Value Out: 1,275.7 ECOC</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Hash:
                  <router-link to="/tx" class="d-block text-truncate">9bb6236fd1c0d25b98bc8d95b5a7ab81f10e9fa9d57fdbfeb76390c92d1a8db9</router-link>
                </div>
                <div class="my-1 small">Value Out: 1,275.7 ECOC</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Hash:
                  <router-link to="/tx" class="d-block text-truncate">9bb6236fd1c0d25b98bc8d95b5a7ab81f10e9fa9d57fdbfeb76390c92d1a8db9</router-link>
                </div>
                <div class="my-1 small">Value Out: 1,275.7 ECOC</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Hash:
                  <router-link to="/tx" class="d-block text-truncate">9bb6236fd1c0d25b98bc8d95b5a7ab81f10e9fa9d57fdbfeb76390c92d1a8db9</router-link>
                </div>
                <div class="my-1 small">Value Out: 1,275.7 ECOC</div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import BlockSearchBox from "../components/SearchBox";
import Chart from "chart.js";

export default {
  name: "Home",
  components: {
    BlockSearchBox
  },
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: Math.floor(Math.random() * (4000 - 3000) + 3000),
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        loop: false,
        watchSlidesVisibility: true,
        slidesPerView: 5,
        spaceBetween: 30,
        breakpoints: {
          575.98: {
            slidesPerView: 2,
            spaceBetween: 15
          },
          767.98: {
            slidesPerView: 2
          },
          991.98: {
            slidesPerView: 3
          },
          1199.98: {
            slidesPerView: 4
          }
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  mounted: function() {
    // chartjs
    Chart.defaults.global.legend.display = false;
    var ctx = document.getElementById("graph");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
        datasets: [
          {
            borderColor: "#803e9d",
            backgroundColor: "#141725",
            borderWidth: 2,
            lineTension: 0,
            pointBackgroundColor: "#803e9d",
            pointBorderWidth: 4,
            pointStyle: "rect",
            data: [5600, 6200, 5600, 5300, 5436, 5436, 5346]
          }
        ],
        options: {}
      }
    });
  },
  computed: {},
  methods: {}
};
</script>
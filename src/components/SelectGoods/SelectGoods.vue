<template>
    <div>
      <transition name="listFold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="list-title">购物车</h1>
            <span class="empty" v-on:click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="list-c-food" v-for="food in selectFoods">
                <span class="list-c-food-name">{{food.name}}</span>
                <div class="list-c-food-price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-warpper">
                  <v-cartcontrl :food="food"></v-cartcontrl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>

      <transition name="listFold">
        <div class="list-mask" v-show="listShow" v-on:click="hidelist"></div>
      </transition>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
  .listFold-enter-active {
    opacity: 1;
    transition: all 0.4s;
  }

  .listFold-leave-active {
    opacity: 0;
    transition: all 0.4s;
  }

  .listFold-enter {
    opacity: 0;
  }

  .listFold-leave {
    opacity: 1;
  }
</style>

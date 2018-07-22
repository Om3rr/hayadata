<template>
  <section class="container">
    <h2 class="title">
      <span>LOADING...</span>
    </h2>
  </section>
</template>

<script>
    export default {
        name: "my-loader"
    }
</script>

<style scoped lang="scss">
  @import 'https://fonts.googleapis.com/css?family=Baloo+Paaji';

  $primary-color: #1e90ff ;
  $secondary-color: #1e90ff;
  $tertiary-color: #1e90ff;

  .container{
    width: 430px;
    height: 250px;
    position: relative;
  }

  h1, h2{
    font-size: 75px;
    text-transform: uppercase;


    span{
      width: 100%;
      float: left;
      color: $tertiary-color;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
      transform: translateY(-50px);
      opacity: 0;
      animation: titleAnimation 2s infinite;
      animation-timing-function:ease;
    }
  }
  h1 span{
    animation-delay: 1s;
    -webkit-animation-fill-mode: forwards;

    &:first-child{

    }

    &:last-child{
      color: $secondary-color;
    }
  }

  h2{
    top: 0;
    position: absolute;

    span{
      animation-delay: 4.1s;
      -webkit-animation-fill-mode: forwards;

      &:first-child{
        animation-delay: 4.2s;

      }

      &:last-child{
        color: $secondary-color;
        animation-delay: 4s;
      }
    }
  }

  .usechrome{
    font-size: 10px;
    color: #fff;
    font-family: helvetica, arial;
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    left: 0;
  }

  @keyframes titleAnimation {
    0% {
      transform: translateY(-50px);
      opacity: 0;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
    }
    20% {
      transform: translateY(0);
      opacity: 1;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
    }
    80% {
      transform: translateY(0);
      opacity: 1;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
    }
    100% {
      transform: translateY(50px);
      opacity: 0;
      -webkit-clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
      clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);

    }
  }
</style>

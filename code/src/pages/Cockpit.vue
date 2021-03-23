<template>
    <div>
    {{photos}}
    <photoTable
     :photos = "photos"/>
    </div>
</template>

<script>
   
   export default {
  components: {
    photoTable: require('components/photo/photoTable.vue').default
  },

    
    
    mounted() {
          this.$store.dispatch("photo/listPhotos");
      
      },
      computed:{
          photos(){
              return this.$store.getters["photo/photos"]
          }
      }      
    }


</script>

<style lang="scss" scoped>

</style>
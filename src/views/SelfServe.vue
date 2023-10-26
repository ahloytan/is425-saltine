<template>
    <LoadingScreen v-if="loading"/>
    <div id="dashboardCharts">
        <h1 class="pt-4 mb-4 flex-column d-flex align-items-center fw-bolder">Self-Serve</h1>
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <h2>Media Kit Templates</h2>
                    <div class="row">
                        <div class="col-6">
                            <img src="../assets/pd1.png" alt="" class="img-fluid">
                            <img src="../assets/pd2.png" alt="" class="img-fluid mt-5">
                            <img src="../assets/pd3.png" alt="" class="img-fluid mt-5">
                        </div>
                        <div class="col-6">
                            <img src="../assets/pd4.png" alt="" class="img-fluid">
                            <img src="../assets/pd5.png" alt="" class="img-fluid mt-5">
                            <img src="../assets/pd6.png" alt="" class="img-fluid mt-5">


                        </div>    
                    </div>
                </div>
                <div class="col-6">
                    <h2>Educational Resources</h2>
                    <div class="row">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/RSoRzTtwgP4?si=FNLRolPGhaQXhfjS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <div class="row mt-5">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/6OUGNgTZATw?si=hnVPByyBt6W1tHtH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>                    </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>
<script>
import LoadingScreen from '../components/LoadingScreen.vue'

export default {
    components: {
        LoadingScreen 
    },
    data() {
        return {
            loading: false,
        }
    },
}
</script>
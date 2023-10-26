<template>
    <LoadingScreen v-if="loading"/>
    <div id="dashboardCharts">
        <h1 class="pt-4 mb-4 flex-column d-flex align-items-center fw-bolder">Collaboration</h1>
        <div class="container">
            <div class="row my-5">
                <h2>Progress</h2>
                <div class="progress gx-0">
                    <div class="progress-bar w-50" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">50%</div>
                </div>
            </div>
            <div class="row my-5">
                <h2>What's Going On</h2>
                <h4>Currently, you are at the <b>media list confirmation stage</b>! Here's a list of things that requires your attention:</h4>
                <div class="w-50 mx-auto mt-5 bg-warning rounded">
                    <ul class="my-2">
                        <li>Please confirm the media list that Saltine sent below</li>
                    </ul>
                </div>

            </div>
            <div class="row position-relative my-5  ">
                <h2>Media List</h2>
                <div id="buttonsHolder" class="d-flex">
                    <button type="button" class="btn btn-info funcBtn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        Actions &nbsp;
                        <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul id="ddm" class="dropdown-menu">
                        <li @click="accept">
                            <a class="dropdown-item links" href="#">Accept
                                <i class="bi bi-check-lg icons"></i>
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item links" href="#">Reject
                                <i class="bi bi-x-lg icons"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div id="recordsGridTable"></div>
            </div>
        </div>

    </div>

</template>
<script>
import LoadingScreen from '../components/LoadingScreen.vue'
import { Grid, h, html } from "gridjs";
import Mixin from "../mixins/index.js";

export default {
    components: {
        LoadingScreen 
    },
    mixins: [Mixin],
    data() {
        return {
            loading: false,
            grid: new Grid({
                    resizable: true,
                    columns: [
                        { id: 'id', name: 'ID', width: '4%'},
                        { id: 'name', name: 'Name', width: '8%'},
                        { id: 'email', name: 'Email', width: '14%'},
                        { id: 'mediaType', name: 'Media Type', width: '10%'},
                        { id: 'jobTitle', name: 'Job Title', width: '13%'}, 
                        { id: 'mediaInfo', name: 'Media Info', width: '16%'},
                        { id: 'contact', name: 'Contact No.', width: '9%'}, 
                        { id: 'sectors', name: 'Sectors', width: '13%',
                            formatter: (cell) => {
                                let output = ""
                                for (let c of cell.split(",")) {
                                    output += `<div><li>${c}</li></div>`
                                }
                                return html(output)
                            }
                        },
                    ],
                    data: [],
                    search: true,
                    sort: true,
                    pagination: {
                        limit: 10
                    },
                    language: {
                        'search': {
                            'placeholder': '🔍 Search...'
                        },
                        'pagination': {
                            'showing': '😃 Displaying',
                            'results': () => 'Records'
                        }
                    },
                    loading: 'Loading...',
                    noRecordsFound: 'No matching records found',
                    error: 'An error happened while fetching the data',
                    style: {
                        th: {
                            'background-color': 'var(--sss_orange)',
                            'color': '#273746',
                            'text-align': 'center'
                        },
                        td: {
                            'text-align': 'center',
                            'font-size': '0.9rem',
                        }
                    }
                }),
        }
    },
    async mounted() {
        this.grid.render(document.getElementById("recordsGridTable"));
        this.refreshTable(this.records.filter(x => x.mediaType === 'Singapore Press Holdings'));
    },
    methods: {
        refreshTable(newData){
            this.grid.updateConfig({
                data: newData
            }).forceRender();
        },
        accept() {
            var that = this;
            alert('Thank you for confirming! Saltine will be notified');
            setTimeout(function(){
                that.$router.push('/dashboard');
            }, 1000);
        }
    }
}
</script>
<style scoped>
#buttonsHolder{
    display: flex;
    justify-content: flex-end;
}

.funcBtn{
    position: absolute;
    top: 60px;
    z-index: 999;
}

#ddm {
    min-width: 100px !important;
}   

.gridjs-table {
    width: 100% !important;
}
</style>
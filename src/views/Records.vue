<template>
    <div id="records" class="position-relative">
        <div v-if="loading" class="overlay">
            <div class="spinner-border-custom spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div class="container-fluid">
            <div class="flex-column d-flex align-items-center justify-content-center">
                <h1 class="pt-4 mb-4 fw-bolder">Contacts</h1>
                <div class="container-xxl">
                    <div id="tableBox">
                        <hr/>
                        <div id="paginationHolder" class="d-flex justify-content-center">
                            <div class="funcBtn">
                                <b>Items per page: </b>
                                <button type="button" id="paginationbutton" class="btn btn-outline-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    10
                                </button>
                                <ul id="paginationDropdown" class="dropdown-menu text-center text-decoration-none">
                                    <li><button class="dropdown-item" @click="adjustPagination(10)" href="#">10</button></li>
                                    <li><button class="dropdown-item" @click="adjustPagination(25)" href="#">25</button></li>
                                    <li><button class="dropdown-item" @click="adjustPagination(50)" href="#">50</button></li>
                                    <li><button class="dropdown-item" @click="adjustPagination(100)" href="#">100</button></li>
                                </ul>   
                            </div>
                        </div>
                        <div id="buttonsHolder" class="d-flex">
                            <button type="button" class="btn btn-info funcBtn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                Actions &nbsp;
                                <span class="visually-hidden">Toggle Dropdown</span>
                            </button>
                            <ul id="ddm" class="dropdown-menu">
                                <li @click="showSelectedView('Default')">
                                    <a class="dropdown-item links" href="#">Reset
                                        <i class="bi bi-bootstrap-reboot icons"></i>
                                    </a>
                                </li>
                                <input id="fileId" type="file" accept=".csv" hidden/>
                                <li @click="exportAllRecords()">
                                    <a class="dropdown-item links" href="#">Import
                                        <i class="bi bi-file-earmark-plus icons"></i>
                                    </a>
                                </li>
                                <li @click="exportAllRecords()">
                                    <a class="dropdown-item links" href="#">Export
                                        <i class="bi bi-cloud-download icons"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div id="recordsGridTable"></div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import { Grid, h, html } from "gridjs";
    import { mapActions, mapGetters, mapMutations } from "vuex";
    import Mixin from "../mixins/index.js";

    export default {
        name: "RecordsTable",
        mixins: [Mixin],
        data() {
            return {
                role: "",
                loading: false,
                form: { file: null },
                toastrResponse: "",
                recordsToDelete: [],
                selectedClinicianApptToEdit: {},
                fullListOfClinicians: [],
                selectedView: 'Default',
                originalIdColumn: { id: 'id', name: 'ID', width: '4%'},
                grid: new Grid({
                    columns: [
                        { id: 'id', name: 'ID', width: '4%'},
                        { id: 'name', name: 'Name'},
                        { id: 'email', name: 'Email'},
                        { id: 'mediaType', name: 'Media Type'},
                        { id: 'jobTitle', name: 'Job Aspirations'}, 
                        { 
                            id: 'mediaInfo', 
                            name: 'Social Network',
                            formatter: (cell) => {
                                return html(`<a href="${cell}" target="_blank">${cell}</a>`)
                            }
                        },
                        { id: 'contact', name: 'Contact No.'}, 
                        { id: 'sectors', name: 'Sectors',
                            formatter: (cell) => {
                                let output = ""
                                for (let c of cell.split(",")) {
                                    output += `<div><li>${c}</li></div>`
                                }
                                return html(output)
                            }
                        },
                        { 
                            name: 'Edit',
                            width: '5%',
                            formatter: (_, row) => {
                            return h('div', {
                                className: 'fa-lg button bi bi-pencil text-primary',
                                    onClick: () => this.toEditClinicianAppointment(row.cells[0].data)
                                }, '')
                            },                             
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
            this.refreshTable(this.records);
        },
        methods: {
            exportAllRecords(){
                this.exportToCsv('Records', this.records);
            },
            refreshTable(newData){
                this.grid.updateConfig({
                    data: newData
                }).forceRender();
            },
            adjustPagination(limitRecords) {
                this.grid.updateConfig({
                    data: this.records,
                    pagination: {
                        limit: parseInt(limitRecords)
                    }
                }).forceRender();
                document.getElementById("paginationbutton").textContent = limitRecords
            },
            viewFacultyInformation(mcr) {
                this.mcr = mcr
                localStorage.setItem("mcr", JSON.stringify(this.mcr));
                this.$router.push('/facultyinformation');
            },
            async toEditClinicianAppointment(id){
                this.selectedClinicianApptToEdit = await this.getOneClinicianRecord(id);
                localStorage.setItem("editFacultyAppt", JSON.stringify(this.selectedClinicianApptToEdit));
                this.$router.push('/editfacultyappt');
            },
            async showSelectedView(view) {
                if (this.selectedView !== 'Default' && view !== 'Default') return alert('Reset filter first!');

                if (view === "RAG") { 
                    this.grid.config.columns[0] = this.newIdColumnWithRAG();
                    const dukeNusRecords = this.records.filter(record => record.school.includes('Duke-NUS') && !this.exceptionTitles.includes(record.appointmentTitle.toLowerCase()));
                    this.grid.updateConfig({
                        columns: this.grid.config.columns,
                        data: dukeNusRecords
                    }).forceRender();
                    this.selectedView = "Red Amber Green";
                    return;
                }

                if (view === "Resigned & Retired") {
                    await this.getRetiredCliniciansRecords();
                    this.refreshTable(this.records);
                    this.selectedView = "Resigned & Retired";
                    return;
                } 
                
                if (view === "Expiring") {
                    const today = moment();
                    const recordsExpiringIn3Months = this.records.filter(record => {
                        const expiryDate = moment(record.expiryDate, 'DD/MM/YYYY');
                        const diffInMonths = expiryDate.diff(today, 'months');
                        return diffInMonths <= 3 && diffInMonths >= 0;
                    })
                    this.refreshTable(recordsExpiringIn3Months);
                    this.selectedView = "Expiring In 3 Months";
                    return;
                }
                    
                await this.getNonRetiredCliniciansRecords();
                this.refreshTable(this.records);
                this.selectedView = "Default";
            },
            newIdColumnWithRAG() {
                const today = moment();
                const newIdColumn = {
                    ...this.originalIdColumn,
                    attributes: (cell, row) => {
                        if (cell) { 
                            const dateOfAcademicAppointment = moment(row.cells[row.cells.length-1].data, 'DD/MM/YYYY');
                            const diffInYears = today.diff(dateOfAcademicAppointment, 'years');
                            if (diffInYears < 3) return { 'className': 'gridjs-td bg-success' };
                            if (diffInYears <= 5) return { 'className': 'gridjs-td bg-warning' };
                            if (diffInYears > 5) return { 'className': 'gridjs-td bg-danger' };
                            return { 'className': 'gridjs-td' };
                        }
                    }
                }
                return newIdColumn;
            }
        }
        
    }
</script>
<style scoped>
#paginationHolder{
    position: relative;
    align-items: center;
}

#paginationDropdown{
    min-width: 50px;
}

#buttonsHolder{
    position: relative;
}

#ddm {
    min-width: 150px !important;
}   

.funcBtn{
    position: relative;
}

.bi-pencil{
    cursor: pointer;
}

.bi-pencil:hover{
    transition: all 300ms ease;
    -o-transition: all 300ms ease;
    -ms-transition: all 300ms ease;
    -moz-transition: all 300ms ease;
    -webkit-transition: all 300ms ease;
    font-size:22px;
}

.links{
    text-decoration: none !important;
    color: #000 !important;
}

.icons{
    position: absolute;
    right:20px;
}

@media only screen and (min-width: 992px){
    #buttonsHolder{
        display: flex;
        justify-content: flex-end;
    }

    .funcBtn{
        position: absolute;
        top: 10px;
        z-index: 999;
    }

    .gridjs-table {
        width: 100% !important;
    }
}

.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
    opacity: 0.5;
    filter: alpha(opacity=50);
}

.spinner-border-custom {
    position: absolute;
    top: 50%;
    left: 45%;
    z-index: 999;
    width: 120px !important;
    height: 120px !important;  
}
</style>
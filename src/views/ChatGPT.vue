<template>
    <LoadingScreen v-if="loading"/>
    <div id="dashboardCharts">
        <h1 class="pt-4 mb-4 flex-column d-flex align-items-center fw-bolder">Generate</h1>
        <div class="container">
            <div>
                <label for="exampleFormControlTextarea1" class="form-label fw-bold">Default (GPT-3.5)</label>
            </div>
            <div id="queryBox" class="row">
                <div v-if="previousQuery">
                    <textarea v-model="previousQuery" disabled class="form-control mb-3" id="exampleFormControlTextarea1" rows="1"></textarea>  
                    <textarea v-model="queryAns" disabled class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>                
                </div>
            </div>
            <div class="row">
                <div class="mb-3">
                    <textarea v-model="query" class="form-control" id="exampleFormControlTextarea1" placeholder="Send a message" rows="3" v-on:keyup.enter="generate()" ></textarea>
                    <div class="d-flex justify-content-end mt-2">
                        <button v-if="queryAns" type="button" class="btn btn-primary blue me-2" @click="sendEmail()"><i class="bi bi-envelope"></i></button>
                        <button type="button" class="btn btn-success" @click="generate()"><i class="bi bi-arrow-right-circle"></i></button>
                    </div>

                </div>
            </div>
        </div>

    </div>

</template>
<script>
import LoadingScreen from '../components/LoadingScreen.vue'
import OpenAI from 'openai';

export default {
    components: {
        LoadingScreen 
    },
    data() {
        return {
            loading: false,
            previousQuery: "",
            query: "",
            queryAns: ""
        }
    },
    methods: {
        sendEmail() {
            // var email = 'sally@saltinecomms.com; annieng@smu.edu.sg; aloysiustan.2020@scis.smu.edu.sg';
            var email = 'aloysiustan.2020@scis.smu.edu.sg';
            var subject = 'Potential collaboration, Saltine';
            var message = `Good Morning,\n\n${this.queryAns}\n\nThank you so much for your time! I really appreciate your time and I hope to hear from you soon\n\n Warmly,\nAloysius`
            document.location = "mailto:"+email+"?subject="+subject+"&body="+encodeURIComponent(message);
        },
        async generate() {
            this.previousQuery = this.query;
            this.loading = true;
            // const openai = new OpenAI({
            //     apiKey: import.meta.env.VITE_API, 
            //     dangerouslyAllowBrowser: true
            // });

            // const chatCompletion = await openai.chat.completions.create({
            //     messages: [{ role: 'user', content: this.query }],
            //     model: 'gpt-3.5-turbo',
            // });

            // console.log(chatCompletion.choices);
            // this.queryAns = chatCompletion.choices[0]?.message?.content
            this.queryAns = 'Ok boss';
            this.query = '';
            this.loading = false;
        },
    }
}
</script>
<style scoped>
i {
    font-size: 1.5rem;
}

#queryBox{
    height: 75vh;
}

.blue {
    background-color: #57C5F2 !important;
    border: 1px solid #57C5F2 !important;
}
</style>
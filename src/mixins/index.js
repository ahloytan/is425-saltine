import { Toast } from "bootstrap";
import csvDownload from 'json-to-csv-export';

const Mixin = {
    data() {
      return {
        recognisedRanks: ['Associate Consultant', 'Consultant', 'Senior Consultant', 'Emeritus Consultant'],
        exceptionTitles: ['prof', 'professor', 'clinical professor', 'clin professor', 'clinical prof', 'clin prof'],
        records: [
            {
                id: 1,
                name: "Sumiko Tan",     
                email: "smk@sph.com.sg",       
                mediaType: "Singapore Press Holdings",      
                jobTitle: "Chief Editor",
                mediaInfo: "https://www.sph.com.sg/",
                contact: "92135678",
                sectors: "Banking & Finance, Foreign News, General News, Local News, Sports"
            },
            {
                id: 2,
                name: "Joyce Lim",
                email: "joycelim@sph.com.sg",
                mediaType: "Media Corporation",
                jobTitle: "Senior Correspondent",
                mediaInfo: "https://www.mediacorp.com",
                contact: "98765432",
                sectors: "Technology, Business, Health, Entertainment"
            },
            {
            id: 3,
            name: "Salma Khalik",
            email: "salmaK@sph.com.sg",
            mediaType: "News Network",
            jobTitle: "Senior Correspondent",
            mediaInfo: "https://www.newsnetwork.com",
            contact: "94632485",
            sectors: "Politics, Environment, Science, Lifestyle"
            },
            {
                id: 4,
                name: "David Lee",
                email: "david.lee@email.com",
                mediaType: "Global News Times",
                jobTitle: "Foreign Correspondent",
                mediaInfo: "https://www.globalnewstimes.com",
                contact: "87694762",
                sectors: "International Relations, Technology, Politics"
            },
            {
                id: 5,
                name: "Sarah Johnson",
                email: "sarah.johnson@email.com",
                mediaType: "Press Gazette",
                jobTitle: "Reporter",
                mediaInfo: "https://www.pressgazette.com",
                contact: "8866421",
                sectors: "Media, Arts, Culture, Education"
            },
            {
                id: 6,
                name: "Michael Brown",
                email: "michael.brown@email.com",
                mediaType: "City Times",
                jobTitle: "Sports Editor",
                mediaInfo: "https://www.citytimes.com",
                contact: "76543210",
                sectors: "Sports, Local News, Entertainment"
            },
            {
                id: 7,
                name: "Linda Wilson",
                email: "linda.wilson@email.com",
                mediaType: "Business Herald",
                jobTitle: "Business Analyst",
                mediaInfo: "https://www.businessherald.com",
                contact: "34567890",
                sectors: "Business, Finance, Economy, Technology"
            },
            {
                id: 8,
                name: "Peter Jackson",
                email: "peter.jackson@email.com",
                mediaType: "Tech Insight",
                jobTitle: "Tech Writer",
                mediaInfo: "https://www.techinsight.com",
                contact: "65432109",
                sectors: "Technology, Gadgets, Startups"
            },     
            {
                id: 9,
                name: "Hannah Davis",
                email: "hannah.davis@email.com",
                mediaType: "Singapore Press Holdings",
                jobTitle: "Health Reporter",
                mediaInfo: "https://www.healthwatch.com",
                contact: "43210987",
                sectors: "Health, Medicine, Wellness, Research"
            },    
            {
                id: 10,
                name: "Tom Wilson",
                email: "tom.wilson@email.com",
                mediaType: "Travel Times",
                jobTitle: "Travel Writer",
                mediaInfo: "https://www.traveltimes.com",
                contact: "61098723",
                sectors: "Travel, Tourism, Adventure"
            },  
            {
                id: 11,
                name: "Emily Hall",
                email: "emily.hall@email.com",
                mediaType: "Fashion Daily",
                jobTitle: "Fashion Editor",
                mediaInfo: "https://www.fashiondaily.com",
                contact: "10987654",
                sectors: "Fashion, Style, Beauty"
            },   
            {
                id: 12,
                name: "Daniel Perez",
                email: "daniel.perez@email.com",
                mediaType: "Singapore Press Holdings",
                jobTitle: "Science Journalist",
                mediaInfo: "https://www.scienceworld.com",
                contact: "98761234",
                sectors: "Science, Research, Environment, Space"
            },   
            {
                id: 13,
                name: "Ella Martin",
                email: "ella.martin@email.com",
                mediaType: "Singapore Press Holdings",
                jobTitle: "Food Critic",
                mediaInfo: "https://www.foodgazette.com",
                contact: "87654321",
                sectors: "Food, Culinary Arts, Dining"
            }                                                       
        ]
      };
    },
    methods: {
        showToast() {
            var bsAlert = new Toast(document.getElementById('theToastr'));         
            bsAlert.show();
        },
        customSort(a, b) {
            if (a.startsWith("N/A") && !b.startsWith("N/A")) {
                return 1; // "N/A" comes after non-"N/A"
            } else if (!a.startsWith("N/A") && b.startsWith("N/A")) {
                return -1; // Non-"N/A" comes before "N/A"
            } else {
                return 0; // No change in order for items with the same prefix
            }
        },
        exportToCsv(fileName, records){    
            csvDownload({
              data: records,
              filename: fileName,
              delimiter: ',',
              headers: [Object.keys(records[0])]
            });
        },
    }
  };

export default Mixin;
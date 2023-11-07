import { Toast } from "bootstrap";
import csvDownload from 'json-to-csv-export';

const Mixin = {
    data() {
      return {
        records: [
            {
                id: 1,
                name: "Aloysius Tan",     
                email: "aloysiustan.2020@scis.smu.edu.sg",       
                mediaType: "Singapore Management University",      
                jobTitle: "Software Engineer (Front/Back/Full-Stack)",
                mediaInfo: "https://ahloytan.netlify.app",
                contact: "91792372",
                sectors: "Web Development, Frontend Development, Cybersecurity"
            },
            {
                id: 2,
                name: "Yu Xuan Lim",
                email: "lim.yuxuan@outlook.com",
                mediaType: "Singapore Management University",
                jobTitle: "Technology Project Management, Business Analyst",
                mediaInfo: "https://www.linkedin.com/in/yu-xuan-lim/",
                contact: "@yuxuaaan (Telegram)",
                sectors: "Technology, Business, Any related fields"
            },
            {
                id: 3,
                name: "Grace Lui",
                email: "gra.char.lui@gmail.com",
                mediaType: "Singapore Management University",
                jobTitle: "Product Management, Business Analyst",
                mediaInfo: "https://www.linkedin.com/in/gracecharlottelui/",
                contact: "@charlotteyo21 (Telegram)",
                sectors: "Technology, Business, Any related fields"
            },
            {
                id: 4,
                name: "Brant Neo",
                email: "brantneo.2020@scis.smu.edu.sg",
                mediaType: "Singapore Management University",
                jobTitle: "Business Analyst",
                mediaInfo: "https://www.linkedin.com/in/brantneo/",
                contact: "98330787",
                sectors: "Technology, Business, Any related fields"
            },                                                   
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
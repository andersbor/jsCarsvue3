// use https (http secure).
// http (non secure) will make the app complain about mixed content when running the app from Azure
const baseUrl = "https://anbo-restcarswithmanager.azurewebsites.net/api/cars"

Vue.createApp({
    data() {
        return {
            cars: [],
            vendorToGetBy: "",
            idToGetBy: -1,
            singleCar: null,
            deleteId: 0,
            deleteMessage: "",
            addData: { model: "", vendor: "", price: 0 },
            addMessage: "",
            updateData: { id: 0, model: "", vendor: "", price: 0 },
            updateMessage: ""
        }
    },
    methods: {
        getAllCars() {
            this.helperGetAndShow(baseUrl)
        },
        getByVendor(vendor) {
            const url = baseUrl + "?vendor=" + vendor
            this.helperGetAndShow(url)
        },
        async helperGetAndShow(url) { // helper metode: getAllCar + getByVendor are very similar
            try {
                const response = await axios.get(url)
                this.cars = await response.data
            } catch (ex) {
                alert(ex.message) // https://www.w3schools.com/js/js_popup.asp
            }
        },
        async getById(id) {
            const url = baseUrl + "/" + id
            try {
                const response = await axios.get(url)
                this.singleCar = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async deleteCar(deleteId) {
            const url = baseUrl + "/" + deleteId
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllCars()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async addCar() {
            try {
                response = await axios.post(baseUrl, this.addData)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllCars()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async updateCar() {
            const url = baseUrl + "/" + this.updateData.id
            try {
                response = await axios.put(url, this.updateData)
                this.updateMessage = "response " + response.status + " " + response.statusText
                this.getAllCars()
            } catch (ex) {
                alert(ex.message)
            }
        }
    }
}).mount("#app")
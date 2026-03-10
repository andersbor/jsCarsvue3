// use https (http secure).
// http (non-secure) will make the app complain about mixed content when running the app from Azure
const baseUrl = "https://anbo-restcarswithmanager.azurewebsites.net/api/cars"

Vue.createApp({
    data() {
        return {
            cars: [],
            vendorToGetBy: "",
            idToGetBy: null,
            singleCar: null,
            deleteId: null,
            deleteMessage: "",
            addData: { model: "", vendor: "", price: null },
            addMessage: "",
            updateData: { id: null, model: "", vendor: "", price: null },
            updateMessage: ""
        }
    },
    methods: {
        getAllCars() {
            this.getCars(baseUrl)
        },
        getByVendor(vendor) { // filter cars by vendor
            const url = baseUrl + "?vendor=" + vendor
            this.getCars(url)
        },
        async getCars(url) { // helper method: getAllCars + getByVendor are very similar
            try {
                const response = await axios.get(url)
                this.cars = await response.data
            } catch (ex) {
                alert(ex.message) // https://www.w3schools.com/js/js_popup.asp
            }
        },
        async getById(id) {
            if (id === null || id === undefined || isNaN(id) || id <= 0) {
                alert("Please enter a valid car ID")
                return
            }
            const url = baseUrl + "/" + id
            try {
                const response = await axios.get(url)
                this.singleCar = await response.data
            } catch (ex) {
                this.singleCar = null
                alert(ex.message)
            }
        },
        async deleteCar(deleteId) {
            if (id === null || id === undefined || isNaN(id) || id <= 0) {
                alert("Please enter a valid car ID")
                return
            }
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
            if (this.addData.model === "" || this.addData.vendor === "" || this.addData.price === null || this.addData.price <= 0) {
                alert("Please fill in all fields with valid values")
                return
            }
            // TODO more validation (model, vendor, price)
            try {
                response = await axios.post(baseUrl, this.addData)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllCars()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async updateCar() {
            if (this.updateData.id === null || this.updateData.id === undefined || isNaN(this.updateData.id) || this.updateData.id <= 0) {
                alert("Please enter a valid car ID")
                return
            }
            // TODO more validation (model, vendor, price)
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
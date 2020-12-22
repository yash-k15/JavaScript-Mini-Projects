class Weather {
    constructor(city) {
        this.apiKey = 'caf7fa759e2da641b674dc09a6ca0afe';
        this.city = city;
    }

    //Fetch weather from api
    async getWeather() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${this.apiKey}&units=metric`);

        const responseData = await response.json();
        return responseData;
    }

    //Change weather location
    changeLocation(city) {
        this.city = city;
    }
}



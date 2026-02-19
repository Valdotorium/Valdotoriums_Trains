function waitForAPI() {
    return new Promise((resolve) => {
        function check() {
            if (window.SubwayBuilderAPI) resolve(window.SubwayBuilderAPI);
            else setTimeout(check, 500);
        }
        check();
    });
}

async function initMod() {
    try {
        const API = await waitForAPI();
        console.log("Subway Builder API is ready:", API);
        // You can now use the API to interact with the game

        //add S-Bahn and Tram, and Tram train trains. Tram train is a tram interopable with Light Metro and S-Bahn lines. It can run on both types of tracks and can be used for both types of services.
        API.trains.registerTrainType({
            id: 'S-Bahn',
            name: 'S-Bahn',
            description: 'High capacity commuter train for suburban and regional services.',
            stats: {
                maxAcceleration: 1,
                maxDeceleration: 1.0,
                maxSpeed: 33.3, //120kmh
                maxSpeedLocalStation: 22.2,
                capacityPerCar: 115,
                carLength: 17.25,
                minCars: 4,
                maxCars: 12,
                carsPerCarSet: 4,
                carCost: 2_000_000,
                trainWidth: 3.02,
                minStationLength: 160,
                maxStationLength: 400,
                baseTrackCost: 60_000,
                baseStationCost: 60_000_000,
                trainOperationalCostPerHour: 750,
                carOperationalCostPerHour: 70,
                scissorsCrossoverCost: 20_000_000
            },
            compatibleTrackTypes: ['S-Bahn', 'Tram-Train'],
            allowAtGradeRoadCrossing: true,
            appearance: {
                color: '#449944'
            },
            elevationMultipliers: {
                AT_GRADE: 0.4, 
                ELEVATED: 1.6, 
                CUT_AND_COVER: 1.2
            }
        },
        API.trains.registerTrainType({
            id: 'Tram',
            name: 'Tram',
            description: 'can cross streets, but is awfully slow. Modeled after Flexity Berlin.',
            stats: {
                maxAcceleration: 0.8,
                maxDeceleration: 1.1,
                maxSpeed: 13.8, //50kmh, lowered because of mixed traffic
                maxSpeedLocalStation: 11,
                capacityPerCar: 50,
                carLength: 5.5,
                minCars: 5,
                maxCars: 10,
                carsPerCarSet: 5,
                carCost: 1_000_000,
                trainWidth: 2.4,
                minStationLength: 60,
                maxStationLength: 100,
                baseTrackCost: 60_000,
                baseStationCost: 5_000_000,
                trainOperationalCostPerHour: 350,
                carOperationalCostPerHour: 35,
                scissorsCrossoverCost: 5_000_000
            },
            compatibleTrackTypes: ['Tram'],
            allowAtGradeRoadCrossing: true,
            appearance: {
                color: '#ee2222'
            },
            elevationMultipliers: {
                AT_GRADE: 0.25, 
                ELEVATED: 2, //should be used at grade, so it is more expensive to build not at grade.
                CUT_AND_COVER: 2
            },
        }),
        /*API.trains.registerTrainType({
            id: 'Tram-Train',
            name: 'Tram Train',
            description: 'can cross streets, and is interopable with Light Metro and S-Bahn lines. Inspired by Karlsruhes NET 2012',
            stats: {
                maxAcceleration: 0.8,
                maxDeceleration: 1.4,
                maxSpeed: 16, //60kmh, nerfed because of mixed traffic, like tram.
                maxSpeedLocalStation: 13,
                capacityPerCar: 100,
                carLength: 12,
                minCars: 4,
                maxCars: 8,
                carsPerCarSet: 4,
                carCost: 2_000_000,
                trainWidth: 2.65,
                minStationLength: 80,
                maxStationLength: 200,
                baseTrackCost: 30_000,
                baseStationCost: 15_000_000,
                trainOperationalCostPerHour: 600,
                carOperationalCostPerHour: 60,
                scissorsCrossoverCost: 15_000_000
            },
            compatibleTrackTypes: ['light-metro', 'S-Bahn', 'Tram-Train'],
            allowAtGradeRoadCrossing: true,
            appearance: {
                color: '#cc8822'
            },
            elevationMultipliers: {
                AT_GRADE: 0.4, 
                ELEVATED: 1.5, 
                CUT_AND_COVER: 1.5
            },
        }),
        // Make heavy metro faster and cheaper
        API.trains.modifyTrainType('light-metro', {
            compatibleTrackTypes: ['light-metro', 'Tram-Train'],
        }),*/


        //register station types ?
        API.ui.showNotification('valdotoriums Trains loaded successfully!', 'success')
    );


    } catch (error) {
        console.error("Mod init error:", error);
    }
}

console.log("Trains mod loading...");
setTimeout(() => { initMod(); }, 100);
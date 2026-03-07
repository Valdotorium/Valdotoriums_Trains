const CONFIG = {
    MOD_NAME: 'Valdotoriums Trains'
}

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
        console.log(`[${CONFIG.MOD_NAME}] Subway Builder API is ready:`, API.version);
        // You can now use the API to interact with the game

        //add S-Bahn and Tram, and Tram train trains. Tram train is a tram interopable with Light Metro and S-Bahn lines. It can run on both types of tracks and can be used for both types of services.
        API.trains.registerTrainType({
            id: 'S-Bahn',
            name: 'S-Bahn',
            description: 'High-capacity commuter train for suburban and regional services.',
            stats: {
                maxAcceleration: 0.95,
                maxDeceleration: 1.15,
                maxSpeed: 35.8, // 129kmh | 80mph
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
                trainOperationalCostPerHour: 600,
                carOperationalCostPerHour: 80,
                scissorsCrossoverCost: 15_000_000,
                stopTimeSeconds: 30,
                maxLateralAcceleration: 1.2,
                parallelTrackSpacing: 3.8,
                trackClearance: 2,
                minTurnRadius: 50,
                minStationTurnRadius: 80,
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
            description: 'Slow but able to cross streets. Modeled after Flexity Berlin.',
            stats: {
                maxAcceleration: 0.8,
                maxDeceleration: 1.0,
                maxSpeed: 15.5, // 56kmh | 35mph
                maxSpeedLocalStation: 12.5,
                capacityPerCar: 50,
                carLength: 6,
                minCars: 4,
                maxCars: 8,
                carsPerCarSet: 2,
                carCost: 750_000,
                trainWidth: 2.1,
                minStationLength: 50,
                maxStationLength: 100,
                baseTrackCost: 50_000,
                baseStationCost: 7_000_000,
                trainOperationalCostPerHour: 180,
                carOperationalCostPerHour: 35,
                scissorsCrossoverCost: 2_000_000,
                stopTimeSeconds: 10,
                maxLateralAcceleration: 2,
                parallelTrackSpacing: 2.5,
                trackClearance: 2,
                minTurnRadius: 18,
                minStationTurnRadius: 25,
                maxSlopePercentage: 5.25,
            },
            compatibleTrackTypes: ['Tram'],
            allowAtGradeRoadCrossing: true,
            appearance: {
                color: '#ee2222'
            },
            elevationMultipliers: {
                STANDARD_TUNNEL: 6,
                DEEP_BORE: 12,
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
        API.ui.showNotification(`${CONFIG.MOD_NAME} loaded successfully!`, 'success')
    );


    } catch (error) {
        console.error(`[${CONFIG.MOD_NAME}] Mod init error:`, error);
    }
}

console.log(`[${CONFIG.MOD_NAME}] Trains mod loading...`);
setTimeout(() => { initMod(); }, 100);
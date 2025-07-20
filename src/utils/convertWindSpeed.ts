
export function convertWindSpeed(speedInMeterPerSecond: number): string{
    const speedInKilometersPerSecond = speedInMeterPerSecond * 3.6
    return `${speedInKilometersPerSecond.toFixed(0)}km/h`; 
}
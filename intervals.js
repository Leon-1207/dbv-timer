export function getTotalTimeOfInterval(inputInterval) {
    let repetitions = Number(inputInterval?.repetitions || 0)
    if (isNaN(repetitions)) repetitions = 0

    const workTime = inputInterval?.workTime
    const workTimeInSeconds = convertIntervalTimeToSeconds(workTime)

    const restTime = inputInterval?.restTime
    const restTimeInSeconds = convertIntervalTimeToSeconds(restTime)

    return repetitions * (workTimeInSeconds + restTimeInSeconds)
}


export function convertIntervalTimeToSeconds({ minutes, seconds }) {
    const data = [minutes, seconds].map((value) => Number(value || "0")).map((value) => isNaN(value) ? 0 : value)
    return data[0] * 60 + data[1]
}


export function convertSecondsToTimeObject(inputSeconds) {
    const seconds = isNaN(Number(inputSeconds)) ? 0 : Number(inputSeconds)
    return {
        minutes: Math.floor(seconds / 60),
        seconds: Math.floor(seconds % 60)
    }
}


export function convertAllIntervalStringValuesToNumbers(inputInterval) {
    const convert = (value) => {
        return isNaN(Number(value)) ? 0 : Number(value)
    }

    inputInterval.repetitions = convert(inputInterval.repetitions)
    inputInterval.workTime.minutes = convert(inputInterval.workTime.minutes)
    inputInterval.workTime.seconds = convert(inputInterval.workTime.seconds)
    inputInterval.restTime.minutes = convert(inputInterval.restTime.minutes)
    inputInterval.restTime.seconds = convert(inputInterval.restTime.seconds)

    return inputInterval
}


export function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        const index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        const temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}
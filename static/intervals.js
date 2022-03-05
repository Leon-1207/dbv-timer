export function getTotalTimeOfInterval(inputInterval) {
    let repetitions = Number(inputInterval?.repetitions || 0)
    if (isNaN(repetitions)) repetitions = 0

    const workTime = inputInterval?.workTime
    const workTimeInSeconds = convertIntervalTimeToSeconds(workTime)

    return repetitions * workTimeInSeconds
}


export function convertIntervalTimeToSeconds({ minutes, seconds }) {
    const data = [minutes, seconds].map((value) => Number(value || "0")).map((value) => isNaN(value) ? 0 : value)
    return data[0] * 60 + data[1]
}
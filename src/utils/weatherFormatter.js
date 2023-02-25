export const formatWeather = (json) => {
    let windDirection;
    const windGust = json?.wind?.gust ? Math.round(json?.wind?.gust) : "–";
    const rain = json?.rain ? json.rain : "–";
    const snow = json?.snow ? json.snow : "–";

    if (json?.wind?.deg > 270 || json?.wind?.deg < 90) {
        windDirection = "С"
    } else {
        windDirection = "Ю"
    }

    if (json?.wind?.deg > 0 || json?.wind?.deg < 180) {
        windDirection += "С"
    } else if (json?.wind?.deg >= 180) {
        windDirection += "З"
    }

    return `\u{1F4CD} ***${json?.sys?.country} • ${json?.name}***\n` +
        `\u{26C5} ***${Math.round(json?.main?.temp)}°C •*** ${json?.weather[0]?.description}\n\n` +
        `Відчувається як: ***${Math.round(json?.main?.feels_like)}°C***\n` +
        `Тиск: ***${json?.main?.pressure} гПа\n***` +
        `Вологість: ***${json?.main?.humidity}%\n***` +
        `Видимість: ***${json?.visibility / 1000} км\n***` +
        `Вітер: ***${Math.round(json?.wind?.speed)} м/c ${windDirection}\n***` +
        `Пориви вітру: ***${windGust} м/c***\n` +
        `Хмарність: ***${json?.clouds?.all}%***\nДощ: ***${rain} мм***\nСніг: ***${snow} мм***`;
}

export default formatWeather;
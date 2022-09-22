//Тут піздєц))

const months = ["січень", "лютий", "березень", "квітень", "травень", "червень",
"липень", "серпень", "вересень", "жовтень", "листопад", "грудень"];

export function getDayDate(dateStr){
    try {
        let date = new Date(dateStr);
        if(isToday(date))
            return "сьогодні";
        else if(isYesterday(date))
            return "завтра"
        else {
            console.log(date)
            return `${months[date.getMonth()]} ${date.getDate()}`
        }
    }
    catch (err){
        return "Invalid date"
    }
}

export function getTime(dateStr){
    try{
        let date = new Date(dateStr);
        return `${date.getHours()}:${date.getMinutes()}`
    }
    catch (err){
        return "00:00";
    }
}

export function isToday(someDate){
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
}

export function isYesterday(date) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() - 1);
    if (tomorrow.toDateString() === date.toDateString())
        return true;
    return false;
}

export function GetRandomElement(array){
    return array[getRndInteger(0, array.length - 1)];
}
export function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

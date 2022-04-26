const getCookie = (key) => {
    let value = "; "+document.cookie;
    console.log(value);
    let parts = value.split(`; ${key}=`);
    console.log(parts);
    if(parts.length === 2){
        return parts.pop().split(";").shift();
    }
}

const setCookie = (key, value, exp = 5) => {
    let date = new Date();
    date.setTime(date.getTime() + exp * 60 * 60 * 24 * 1000);
    document.cookie = `${key}=${value}; expires=${date.toUTCString}`;

}

const deleteCookie = (key) => {
    let date = new Date("2022-01-01").toUTCString();
    console.log(date);
    document.cookie = key+"=; expires="+date;
}

export {
    getCookie,
    setCookie,
    deleteCookie
};
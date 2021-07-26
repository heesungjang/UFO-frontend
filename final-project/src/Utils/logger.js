// 개발 모드에서만 console.log가 찍히는 logger
export const logger = msg => {
    if (process.env.NODE_ENV === "production") {
        return;
    }
    console.log(msg);
};

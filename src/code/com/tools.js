const tools = {
    waitForEvent(target, eventType) {
        return new Promise(resolve => {
            let listener = e => {
                target.removeEventListener(eventType, listener);
                resolve(e);
            };
            target.addEventListener(eventType, listener);
        });
    },

    sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
};

export default tools;
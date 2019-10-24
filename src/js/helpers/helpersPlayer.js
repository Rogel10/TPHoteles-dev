export const getMinSeconds = (ms) => {

    let min, sec;
		
		min   = ms / 60000;
		min   = parseInt(min);
		ms -= min * 60000;
		sec   = ms / 1000;
		sec   = parseInt(sec);

		if(min < 10) {
			min = "0" + min;
		}
		if(sec < 10) {
			sec = "0" + sec;
		}

		return min + ":" + sec;

}

/**
 * retorna segundos recibiendo milisegundos
 * llegando del player videoJS
 * @param {*} ms 
 */
export const getSeconds = (ms) => {
    return Math.round(ms);

}
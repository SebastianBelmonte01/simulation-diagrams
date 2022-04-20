export const randomNumberGenerator = ()  => {
    let seed = 0;
    let k = 3;
    let g = Math.round((Math.log(100) / Math.log(2) + 2));
    let m = Math.pow(2,g);
    let a = 3 + (8 * parseInt(k));

    while(seed % 2 === 0){
        seed = Math.round(Math.random() * 10000);
    }
    let random = ((a * seed) % m / (m - 1));
    
    return random;
}   
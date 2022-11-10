
const WIDHT = window.innerWidth;
const HEIGHT = window.innerHeight;
let countgenera = 0;
const settings = {
    output: [100]
};
let Maps = [WIDHT * HEIGHT];
let NewMap = [WIDHT * HEIGHT];
const gpu = new GPU();
const render = gpu.createKernel(function(x, wid) {
    this.color(x[this.thread.x + this.thread.y * wid],0,0,1); 

}).setOutput([WIDHT, HEIGHT]).setGraphical(true);

const canvas = render.getCanvas();
document.getElementsByTagName('body')[0].appendChild(canvas);


/*let startTime = null, stepInMs = 100;
let progress;
if (startTime === null) startTime = timestamp;
        progress = timestamp - startTime;
        if(progress > stepInMs){
                    startTime = timestamp
        }*/
        const StartLife = () =>{
            for(y = 1; y < HEIGHT - 1; y++)
                for(x = 1; x < WIDHT - 1; x++)
                    Maps[x + y * WIDHT] = Math.floor(Math.random() * 2) 
        }
        
let time = 0;
function step(){
    StartLife();
    requestAnimationFrame(function sds(timestamp){
        const diff = timestamp - time;
        NextGeneration();
        

        
        render(Maps, WIDHT);
        time = timestamp;
        document.getElementById('generation').textContent= "FPS: " + Math.floor(1000/ diff) ;
        requestAnimationFrame(sds)
    })  
}

const NextGeneration = () =>{
    countgenera++;
    for(y = 1; y < HEIGHT - 1; y++)
        for(x = 1; x < WIDHT - 1; x++){
            let pos = (x + y * WIDHT)

            let buffer = (
                Maps[pos + 1] +
                Maps[pos - 1] +
                Maps[pos + WIDHT] +
                Maps[pos - WIDHT] +

                Maps[pos - WIDHT - 1] +
                Maps[pos - WIDHT + 1] +
                Maps[pos + WIDHT + 1] +
                Maps[pos + WIDHT - 1] )

                let keepAlive = Maps[pos] == 1 && (buffer >= 2 && buffer <= 3);
                let makeNewLive = Maps[pos] == 0 && (buffer >= 3 && buffer <= 3);
                NewMap[pos] = keepAlive | makeNewLive;
                
             }
    let temp = Maps;
    Maps = NewMap;
    NewMap = temp;
}





const WIDHT = window.innerWidth;
const HEIGHT = window.innerHeight;
let countgenera = 0;
const settings = {
    output: [100]
};

const gpu = new GPU();
const render = gpu.createKernel(function(x, wid, flag) {
    if(flag){
       if(x[this.thread.x + this.thread.y * wid] == 0) this.color((1/255) * 227,(1/255) * 158,(1/255) * 163,1);
       if(x[this.thread.x + this.thread.y * wid] == 1) this.color((1/255) * 139,(1/255) * 174,(1/255) * 201,1);
       if(x[this.thread.x + this.thread.y * wid] == 2) this.color((1/255) * 98,(1/255) * 88,(1/255) * 141,1);
    }else this.color(x[this.thread.x + this.thread.y * wid],0,0,1); 

}).setOutput([WIDHT, HEIGHT]).setGraphical(true);

const canvas = render.getCanvas();
document.getElementsByTagName('body')[0].appendChild(canvas);

function start() { 
    TwoGame = new Bivariate(WIDHT ,HEIGHT);
 }
let time = 0;
function step(){
    start();

    requestAnimationFrame(function sds(timestamp){
        const diff = timestamp - time;
        TwoGame.NextGeneration();
        

        
        render(TwoGame.Map, WIDHT, Bivariate.ReactBelMode);
        time = timestamp;
        document.getElementById('generation').textContent= "FPS: " + Math.floor(1000/ diff) ;
        requestAnimationFrame(sds)
    })  
}

const modeStepChecked = () =>{
    Bivariate.ReactBelMode = document.getElementById('check').checked;
    start();  
}




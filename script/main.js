const cnv = document.querySelector('canvas');
const ctx = cnv.getContext('2d');

cnv.width = 1200;
cnv.height = 700;

ctx.font = "40px f";
ctx.fillStyle = 'rgb(75, 75, 75)';
ctx.textRendering

const sheet = new Image();
sheet.src = './resource/sheet.png';
const dinoSheet = new Image();
dinoSheet.src = './resource/dino.png';

var dino = {
    jump: false,
    spr: 0,
    px: -4,
    py: 0,
    pw: 88,
    ph: 96,
    pos: 1,
    maxPos: 2,
    ps: 80,
    sal: 90,
    pis: false
}

var msgrs = [
    {x:cnv.width,msg:"Chronus, web developer",spr:0,line:0,run:true},
    {x:cnv.width+200,msg:"Fullstack ",spr:0,line:1,run:true},
    {x:cnv.width*2,msg:" languages   ",spr:0,line:0,run:false,act:()=>{invert()}},
    {x:cnv.width*4,msg:" programmer five years ago ",spr:0,line:0,run:false,act:()=>{invert(true)}},
    {x:cnv.width*4+200,msg:" freelancer ",spr:0,line:1,run:true},
    {x:cnv.width*4+1100,msg:" studying ",spr:0,line:0,run:true},
    {x:cnv.width*6,msg:" 17 years ",spr:0,line:0,run:true},
    {x:cnv.width*6+200,msg:" starting in the job market ",spr:0,line:1,run:true},
];

var cact = [
    {x:cnv.width*2+300,msg:"HTML5"},
    {x:cnv.width*2+600,msg:"Javascript"},
    {x:cnv.width*2+1000,msg:"CSS3"},
    {x:cnv.width*2+1300,msg:"php"},
    {x:cnv.width*2+1500,msg:"nodejs"},
    {x:cnv.width*2+1800,msg:"python"},
    {x:cnv.width*5+200,msg:"android"},
    {x:cnv.width*5+500,msg:"cordova"},
    {x:cnv.width*5+800,msg:"sql"},
    {x:cnv.width*7+300,msg:"bye",kill:true},
];

var posm = 0;
var posmx = cnv.width;

var start = false;
var speed = 3;

var timer = 0;

addEventListener('click',()=>{
    start = true;
    dino.ps = 178;
    dino.px = 178;
    dino.pw = 84;
    dino.sal = 88;
    document.querySelector('.start-inst').style.display = 'none';
});

setInterval(() => {
    for(let i=0;i<msgrs.length;i++){
        if(msgrs[i].x<cnv.width){
            msgrs[i].spr+= 92;
            if(msgrs[i].spr >92)
            {
                msgrs[i].spr = 0;
            }
        }
    }
}, 150);

function invert(rev){
    if(rev){
        let pc = 100;
        let rg = 0;
        let invT = setInterval(() => {
            if(pc>0){
                pc--;
            }
            cnv.style.filter=`invert(${pc}%)`;
            rg++;
            document.body.style.backgroundColor = `rgb(${rg},${rg},${rg})`;
            if(rg == 255){
                clearInterval(invT);
            }
        }, 0);
    }else{
        let pc = 0;
        let rg = 255;
        let invT = setInterval(() => {
            if(pc<100){
                pc++;
            }
            cnv.style.filter=`invert(${pc}%)`;
            rg--;
            document.body.style.backgroundColor = `rgb(${rg},${rg},${rg})`;
            if(rg == 0){
                clearInterval(invT);
            }
        }, 0);
    }
}

function update(){
    if(start)
    {
        dino.spr++;
        if(dino.spr == 8)
        {
            dino.px += dino.sal;
            dino.spr = 0;
            dino.pos++;
        }
        if(dino.pos == dino.maxPos)
        {
            dino.px = dino.ps;
            dino.pos = 0;
        }
        posm-=speed;
        if(posm<-sheet.width*2)
        {
            posm = 0;
        }
        posmx-=speed;
        if(posmx<-sheet.width*2)
        {
            posmx = 0;
        }
        for(let i=0;i<msgrs.length;i++){
            msgrs[i].x-=speed;
            if(msgrs[i].x<cnv.width && !msgrs[i].run){
                msgrs[i].run = true;
                msgrs[i].act();
            }
        }
        for(let i=0;i<cact.length;i++){
            cact[i].x-=speed;
        }
    }
    if(!start && !dino.pis)
    {
        let rd = Math.floor(Math.random()*100);
        if(rd == 5)
        {
            dino.px = 84;
            setTimeout(() => {
                if(!start)
                {
                    dino.px = -4;
                    dino.pis = false;
                }
            }, 200);
            dino.pis = true;
        }
    }
}

function render(){
    ctx.clearRect(0,0,cnv.width,cnv.height);
    
    ctx.drawImage(sheet,2,102,sheet.width,40,posm,550,sheet.width*2,80);
    ctx.drawImage(sheet,2,102,sheet.width,40,posmx-4,550,sheet.width*2,80);

    for(let i=0;i<cact.length;i++){
        ctx.drawImage(sheet,446,0,34,96,cact[i].x,440,68,192);
        ctx.fillRect(cact[i].x-(cact[i].msg.length/2*30+20)/2,390,cact[i].msg.length*30+20,50);
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillText(cact[i].msg,cact[i].x-(cact[i].msg.length/2*30+20)/2+10,430);
        ctx.restore();
        if(cact[i].kill && cact[i].x<40+dino.pw*2){
            clearInterval(timer);
            dino.px = 348;
            dino.pw+=2;
            document.querySelector('.res-btn').style.display = 'block';
        }
    }

    for(let i=0;i<msgrs.length;i++){
        if(msgrs[i].x<cnv.width){
            ctx.drawImage(sheet,260+msgrs[i].spr,0,94,96,msgrs[i].x,10+msgrs[i].line*192,192,192);
            ctx.fillRect(msgrs[i].x+170,85+msgrs[i].line*192,msgrs[i].msg.length*30+20,50);
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.fillRect(msgrs[i].msg.length*30+msgrs[i].x+142,100+msgrs[i].line*192,60,20);
            ctx.fillText(msgrs[i].msg,msgrs[i].x+170,120+msgrs[i].line*192);
            ctx.restore();
        }
    }

    ctx.drawImage(dinoSheet,dino.px,dino.py,dino.pw,dino.ph,40,415,dino.pw*2,dino.ph*2);
}

function init(){
    timer = setInterval(() => {
        try{
            update();
            render();
        }catch(e){
            console.error('Erro no código');
            alert(e.message)
            clearInterval(timer);
        }
    }, 1000/60);
}

function restart(){
    posm = 0;
    dino = {
        jump: false,
        spr: 0,
        px: -4,
        py: 0,
        pw: 88,
        ph: 96,
        pos: 1,
        maxPos: 2,
        ps: 80,
        sal: 90,
        pis: false
    }
    dino.ps = 178;
    dino.px = 178;
    dino.pw = 84;
    dino.sal = 88;
    
    msgrs = [
        {x:cnv.width,msg:"Chronus, web developer",spr:0,line:0,run:true},
        {x:cnv.width+200,msg:"Fullstack ",spr:0,line:1,run:true},
        {x:cnv.width*2,msg:" languages   ",spr:0,line:0,run:false,act:()=>{invert()}},
        {x:cnv.width*4,msg:" programmer five years ago ",spr:0,line:0,run:false,act:()=>{invert(true)}},
        {x:cnv.width*4+200,msg:" freelancer ",spr:0,line:1,run:true},
        {x:cnv.width*4+1100,msg:" studying ",spr:0,line:0,run:true},
        {x:cnv.width*6,msg:" 17 years ",spr:0,line:0,run:true},
        {x:cnv.width*6+200,msg:" starting in the job market ",spr:0,line:1,run:true},
    ];
    
    cact = [
        {x:cnv.width*2+300,msg:"HTML5"},
        {x:cnv.width*2+600,msg:"Javascript"},
        {x:cnv.width*2+1000,msg:"CSS3"},
        {x:cnv.width*2+1300,msg:"php"},
        {x:cnv.width*2+1500,msg:"nodejs"},
        {x:cnv.width*2+1800,msg:"python"},
        {x:cnv.width*5+200,msg:"android"},
        {x:cnv.width*5+500,msg:"cordova"},
        {x:cnv.width*5+800,msg:"sql"},
        {x:cnv.width*7+300,msg:"bye",kill:true},
    ];
    document.querySelector('.res-btn').style.display = 'none';
    init();
}

init();
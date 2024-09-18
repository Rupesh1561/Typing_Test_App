document.addEventListener("DOMContentLoaded",function(){
    const middle =document.getElementById("middle");
    const input=document.getElementById('input');
    var pos=0;
    var wpm=0;
    var cpm=0;
    var size=0;
    const spd_wpm =document.getElementById('spd-wpm');
    const spd_cpm =document.getElementById('spd-cpm');
    const spd_acc =document.getElementById('spd-acc');
    const timer=document.getElementById('timer-time');
    const restart=document.getElementById('restart');
    var running=false;
    var z=0;
    var intervalId;


    //function implements the text load for typing 
    function load_text(rad){
        middle.textContent='';
        var txtarr= [    "the cat sat on the mat and ate all the food",
        "john went to the store to buy some milk and eggs",
        "sally loves to play with her favorite toy every day",
        "the sun shines brightly in the clear blue sky above",
        "a little bird chirped happily outside my window this morning",
        "alice and bob went for a walk in the park",
        "the children ran and laughed in the playground",
        "mary baked cookies for her friends who came over",
        "peter planted flowers in his garden last weekend",
        "the dog barked loudly when the doorbell rang"]
        const arr=txtarr[rad].split(' ');
        for(let i=0; i<arr.length;i++){
            const span= document.createElement('span');
            span.classList.add('normal');
            span.classList.add('no'+i);
            span.textContent=arr[i]+' ';
            middle.appendChild(span);
        }
        size=arr.length;

    }

    load_text(Math.floor(Math.random()*10));


    //function implements the staus of the current word and also caluculates results(wpm,cpm,accuracy)
    function check(e){
       
        if(!running){
            running=true;
            countdown()
        }


        if (pos<size){
            const input_value=e.target.value;
            const current_span=document.querySelector('.no'+pos);
             //console.log(current_span);
            //console.log(input_value);

            current_span.classList.remove('wrong','correct','mark');
            if(current_span.textContent===input_value){
                current_span.classList.add('correct')
            }
            else if(!current_span.textContent.startsWith(input_value)){

                current_span.classList.add('wrong');
            }
            else{
                current_span.classList.add('mark');
            }
    
            if (e.data ===' '){
                input.value=null;
                pos=pos+1;
                z+=1;
                //console.log(pos,size,z);
                setTimeout(function() {
                    if(pos==size){
                        pos=0;
                        load_text(Math.floor(Math.random()*10));
                    }
                }, 100);

                if(current_span.classList.contains('correct')){
                    wpm+=1;
                    cpm+=input_value.length-1
                    var r=(wpm/z)*100;
                    spd_acc.textContent=r.toFixed(0)+"%";
                    spd_wpm.textContent=wpm
                    spd_cpm.textContent=cpm;
                    //console.log(current_span)
                }
                current_span.classList.remove('mark')

            }
           
        }

        }

    input.addEventListener('input',check);


    //function implements the timer for the typing 
    function countdown() {
        let totalSeconds = 60; // 1 minute
    
        intervalId = setInterval(function() {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
    
            timer.textContent= `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
           
    
            if (totalSeconds === 0) {
                clearInterval(intervalId);
                input.disabled=true;
            }
    
            totalSeconds--;
        }, 1000); // Update every second
    }
    //restart
    function restarter(){
        clearInterval(intervalId);
        spd_acc.textContent='0%';
        spd_cpm.textContent='0';
        spd_wpm.textContent='0';
        timer.textContent='1:00';
        pos=0;
        wpm=0;
        cpm=0;
        size=0;
        z=0;
        running=false;
        load_text(Math.floor(Math.random()*10));
        input.disabled=false;

    }
    restart.addEventListener('click',restarter);

})
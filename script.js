var background = "paper-background.jpg";
var fontSize = 50;

var canvas = document.getElementById('quote');
canvas.width = 1080;
canvas.height = 1080;
var context = canvas.getContext('2d');
var quote = "";
var author = "";

function loadBackground(){
    
    
    var imageObj = new Image();
    imageObj.onload = function() {
      context.drawImage(this, 0, 0, canvas.width, canvas.height);
    };
    imageObj.src = background;
}


function drawText(){
    loadBackground();
    quote = document.getElementById('quote-text').value;
    author = document.getElementById('author').value;
    
    
    let x = (canvas.width*10)/100;
    let y = 100;
    
    var imageObj = new Image();
    imageObj.onload = function() {
        context.drawImage(this, 0, 0, canvas.width, canvas.height);
        //~ context.filter = 'blur(1px)';
        wrapText(quote, x, y, (canvas.width - (x)*2), fontSize+10);
    };
    imageObj.src = background;
     
}

 function wrapText( text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    context.font = fontSize + "px Traveling _Typewriter Regular";
    var lines = [];
    
    for(var n = 0; n < words.length; n++){
        if(words[n].indexOf('\n') > 0){
            let tempWords = words[n].split('\n');
            for(var i = 0; i< tempWords.length; i++){
                if(i == (tempWords.length - 1)){
                    line = tempWords[i] + " ";
                }else{
                    let testline = line + tempWords[i];
                    lines.push({
                        text: testline,
                        x: x,
                        y: y
                    });
                    y += lineHeight;
                    line = "";
                }
            }
            
        }else{
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                lines.push({
                        text: line,
                        x: x,
                        y: y
                    });
                line = words[n] + " ";
                y += lineHeight;
            }else{
                line = testLine;
            }
        }
    }
    if(line.length > 1){
        lines.push({
                text: line,
                x: x,
                y: y
            });
        y += lineHeight;
        line = words[n] = ' ';
    }
    
    if(author != ""){
        y += lineHeight;
         lines.push({
                text: "-"+author,
                x: x,
                y: y
            });
    }
    
    var topMargin = 0;
    if(lines.length > 0){
        topMargin = canvas.height - (y - lines[0].y);
        topMargin = (topMargin/2) - 2*lineHeight;
        console.log(topMargin);
    }
    for(var n = 0 ; n < lines.length; n++){
        line = lines[n];
        context.fillText(line.text, line.x, line.y + topMargin);
    }
    var pngUrl = canvas.toDataURL();
    let imageLink = document.getElementById('link-to-download');
    imageLink.href = pngUrl;
    imageLink.download =  (Math.floor(Math.random() * 100) + 1)+"-pwn-quote-maker.png";
    imageLink.style.display = "block";
    if(lines.length <= 0){
        imageLink.style.display = "none";
    }
  }

loadBackground();

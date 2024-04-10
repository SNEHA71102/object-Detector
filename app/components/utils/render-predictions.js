import CssSyntaxError from "postcss/lib/css-syntax-error";

export const renderPredictions = (predictions, ctx)=> {
    //create obj on canvas
      //sets the pixels in a rectangular area to transparent black
      ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
      //fonts
      const font="16px sans-serif"
    ctx.font = font
    ctx.textBaseline = "top"
    
    //rendering each preduction
    predictions.forEach((prediction) => {
        const [x,y,width,height] = prediction["box"];

        const isPerson = prediction.class === "person";

        //bounding box
        ctx.strokeStyle = isPerson?"#FF0000" : "00FFFF";
        ctx.lineWidth =4;
        ctx.strokeRect(x,y,width,height);
        
        //fill the color
        ctx.fillStyle = `rgba(255,0,0,${isPerson ? 0.2 : 0})`;
        ctx.fillRect(x,y,width,height);

        //draw the label background
        ctx.fillStyle = isPerson ? "#FF0000" : "#00FFFF";
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font,10); //base 10
        ctx.fillRect(x,y,textWidth + 4 ,textHeight + 4);

        //to ensure our text stays on top 
        ctx.fillStyle ="#000000";
        ctx.fillText(prediction.class,x,y);
    
    });
    };
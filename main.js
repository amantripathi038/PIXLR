var image = null;
var can1 = null,can2 = null;
var grayImage = null;
var sepiaImage = null;
var brightImage = null;
function upload()
{
    can1 = document.getElementById("can1");
    var fileInput = document.getElementById("imgInput");
    image = new SimpleImage(fileInput);
    grayImage = new SimpleImage(fileInput);
    sepiaImage = new SimpleImage(fileInput);
    brightImage = new SimpleImage(fileInput);
    image.drawTo(can1);
}
function download()
{
    if(can1 == null)
    {
        window.alert("Upload Image First");
        return;
    }
    if(can2 == null)
    {
        window.alert("Select Filter First");
        return;
    }
    var img = can2.toDataURL();    
    var tmpLink = document.createElement( 'a' );  
    tmpLink.download = 'FilteredImage.png'; 
    tmpLink.href = img;  
    document.body.appendChild( tmpLink );  
    tmpLink.click();  
    document.body.removeChild( tmpLink );  
}
function doGray() 
{
    if(grayImage != null)
    { 
        for (var pixel of grayImage.values())
        {
            var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
            pixel.setRed(avg);
            pixel.setGreen(avg);
            pixel.setBlue(avg);
        }    
    }
    else
    {
        window.alert("Upload Image First");
        return;
    }
    can2 = document.getElementById("can2");
    grayImage.drawTo(can2);
    brightImage = grayImage;
}
function ensureInImage (coordinate, size) 
{
    if (coordinate < 0) 
    {
        return 0;
    }
    if (coordinate >= size) 
    {
        return size - 1;
    }
    return coordinate;
}
function getPixelNearby (image, x, y, diameter) 
{
    var dx = Math.random() * diameter - diameter / 2;
    var dy = Math.random() * diameter - diameter / 2;
    var nx = ensureInImage(x + dx, image.getWidth());
    var ny = ensureInImage(y + dy, image.getHeight());
    return image.getPixel(nx, ny);
}
function doBlur()
{
    if(image != null)
    {
        var output = new SimpleImage(image.getWidth(), image.getHeight()); 
        for (var pixel of image.values())
        {
            var x = pixel.getX();
            var y = pixel.getY();
            if (Math.random() > 0.5) 
            {
                var other = getPixelNearby(image, x, y, 10);
                output.setPixel(x, y, other);
            }
            else 
            {
                output.setPixel(x, y, pixel);
            }
        }    
    }
    else
    {
        window.alert("Upload Image First");
        return;
    }
    can2 = document.getElementById("can2");
    output.drawTo(can2);
    brightImage = output;    
}
function doSepia()
{
    if(sepiaImage != null)
    { 
        for (var pixel of sepiaImage.values())
        {
            var R = pixel.getRed();
            var G = pixel.getGreen();
            var B = pixel.getBlue();
            var tr = 0.393*R + 0.769*G + 0.189*B;
            var tg = 0.349*R + 0.686*G + 0.168*B;
            var tb = 0.272*R + 0.534*G + 0.131*B;
            if (tr>255)
                pixel.setRed(255);
            else
                pixel.setRed(tr);
            if (tg>255)
                pixel.setGreen(255);
            else
                pixel.setGreen(tg);
            if (tb>255)
                pixel.setBlue(255);
            else
                pixel.setBlue(tb);
        }    
    }
    else
    {
        window.alert("Upload Image First");
        return;
    }
    can2 = document.getElementById("can2");
    sepiaImage.drawTo(can2);
    brightImage = sepiaImage;    
}

function doBright()
{
    if(image == null)
    {
        window.alert("Upload Image First");
        return;
    }
    can2 = document.getElementById("can2");
    image.drawTo(can2);
    var x = document.getElementById("myRange");
    var y = document.getElementById("myRange2");
    var out = document.getElementById("value")
    if (x.style.display === "none" && y.style.display === "none")
    {
        x.style.display = "block";
        y.style.display = "inline-block";
    }
    else
    {
        x.style.display = "none";
        y.style.display = "none";
    }
    out.innerHTML = x.value;
    x.oninput = function() 
    {
        out.innerHTML = this.value;       
    }
}
function Bright()
{
    var x = document.getElementById("myRange").value;
    x = parseInt(x);
    brightImage = new SimpleImage(image);
    for (var pixel of brightImage.values())
    {
        var R = pixel.getRed() + x;
        var B = pixel.getBlue() + x;
        var G = pixel.getGreen() + x;
        if(R>255)
            pixel.setRed(255);
        else if (R<0)
            pixel.setRed(0);
        else
            pixel.setRed(R);
        if (G>255)
            pixel.setGreen(255);
        else if (G<0)
            pixel.setGreen(0);
        else 
            pixel.setGreen(G);
        if(B>255)
            pixel.setBlue(255);
        else if (B<0)
            pixel.setBlue(0);
        else 
            pixel.setBlue(B);
    }
    brightImage.drawTo(can2);
}
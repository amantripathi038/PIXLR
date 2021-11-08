var image = null;
var can1 = null,can2 = null;
function upload()
{
    can1 = document.getElementById("can1");
    var fileinput = document.getElementById("imgInput");
    image = new SimpleImage(fileinput);
    grayImage = new SimpleImage(fileinput);
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
    }
    can2 = document.getElementById("can2");
    grayImage.drawTo(can2);
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
    var output = new SimpleImage(image.getWidth(), image.getHeight());
    if(image != null)
    { 
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
    }
    can2 = document.getElementById("can2");
    output.drawTo(can2);    
}
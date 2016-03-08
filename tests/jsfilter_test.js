var lwip = require('lwip');

lwip.open(__dirname + '/doorskel.jpg', function(err, image){
  // check err...
  if(err) {
    console.log('Error: ' + err);
    return 1;
  }

  // Worker.filter.sepia = function(pix){
  //   console.log('Sepia enhancement');
  //   for (var i = 0, n = pix.length; i < n; i += 4){
  //     pix[i]    = pix[i]    * 1.07;
  //     pix[i+1]  = pix[i+1]  * .74;
  //     pix[i+2]  = pix[i+2]  * .43;
  //   }
  // };

  // define a batch of manipulations and save to disk as JPEG:
  image.batch()
    // .scale(0.75)          // scale to 75%
    // .rotate(45, 'white')  // rotate 45degs clockwise (white fill)
    // .crop(200, 200)       // crop a 200X200 square from center
    // .blur(5)              // Gaussian blur with SD=5
    .mirror("x")
    .writeFile(__dirname + '/test_output.jpg', function(err){
      // check err...
      if(err) console.log('Error: ' + err);
      // done.
    });
});

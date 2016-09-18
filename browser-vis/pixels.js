

            function display (intArray) {
                var pixels = [];

                intArray.forEach(function (val, i) {
                    if (i > 0 && i % 3 == 0) {
                        pixels.push([intArray[i-3],intArray[i-2], intArray[i-1]])
                    }
                });

                console.log(pixels.length)


                pixels.forEach(function (p, i) {
                    var elem = $('.pixel.p--' + i +' span')

                    var style = {
                        'background-color': 'rgb(' + [p[1], p[0], p[2]].join(',') + ')',
                        'box-shadow': '0 -5px 32px 5px rgba(' + [p[1], p[0], p[2]].join(',') + ',1)'
                    }


                    if (p[1] == 0 && p[0] == 0 && p[2] == 0) {
                        style = {
                            'background-color': 'white',
                            'box-shadow': '0 0 14px 3px white'
                        }
                    }

                    elem.css(style);

                })

            }



function getRotation (p) {

    var deg = 180;

    if (p < 58) {
        deg = deg + (p * 6.2);
    }

    if (p >= 58) {
        deg = deg - ( (p - 58 + 1) * 6.4)  
    }

    return deg
}

var p = 113;

for (;p >= 0 ; p--) {

    var elem = $('<div class="pixel ' + (p < 58 ? 'outer' : 'inner') + ' p--' + p + '"><span></span></div>');

    elem.css({
        'transform': 'rotate(' + getRotation(p) + 'deg)'
    })
    $('.pixels').append(elem)



}

            var ws = new WebSocket('ws://127.0.0.1:8080/');

            ws.addEventListener('message', function (e) {
                var fileReader = new FileReader();
                fileReader.onload = function() {
                    display(new Uint8Array(this.result));
                };
                fileReader.readAsArrayBuffer(e.data);
            })


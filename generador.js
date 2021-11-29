var screenx = 512,
  screeny = 200,
  offset = 10,
  x;
var yr = new Array(512);
yi = new Array(512);
var n = 1024,
  g = 10,
  p = (2 * Math.PI) / n,
  g1,
  l,
  m,
  k,
  k1,
  k2,
  k3;
var y1, y2, j;
function replot() {
  var xmin = 0;
  var xmax = 2;
  var ymin = -1.5;
  var ymax = 1.5;

  if (ymin == ymax) {
    ymin = -Math.abs(ymin);
    ymax = Math.abs(ymax);
  }

  if (xmin == xmax) {
    xmin = -Math.abs(xmin);
    xmax = Math.abs(xmax);
  }

  var func = "sin(4*x)";

  var xf = (xmax - xmin) / screenx,
    yf = screeny / (ymax - ymin);

  var y, x1, y1, obj, ptr;
  var scry = screeny + offset;

  with (Math) {
    for (var i = 1; i <= screenx; i++) {
      x = i * xf + xmin;
      y = eval(func);
      if (y > ymax) y = ymax;
      if (y < ymin) y = ymin;
      y1 = scry - (y - ymin) * yf;
      ptr = "d" + i;
      //obj = document.getElementById(ptr);
      //obj.style.top = y1;
      console.log(` x --> ${i} , y --> ${y}`);
    }
  }
}
let s3 = [];

function fft() {
  var func = "sin(4*x)";
  var xmin = -1.5;
  var xmax = 1.5;
  var xf = (xmax - xmin) / n,
    mg1;

  with (Math) {
    for (var i = 1; i <= n; i++) {
      x = i * xf + xmin;
      y = eval(func);
      yr[i] = y;
      yi[i] = 0;
    }
  }

  with (Math) {
    for (l = 0; l <= g - 1; l++) {
      g1 = pow(2, g - l - 1);
      m = 0;

      for (i = 1; i <= pow(2, l); i++) {
        k1 = floor(m / g1);
        kaylyn();
        y1 = cos(p * k2);
        y2 = -sin(p * k2);

        for (j = 1; j <= g1; j++) {
          m = m + 1;
          mg1 = m + g1;
          y3 = yr[mg1] * y1 - yi[mg1] * y2;
          y4 = yr[mg1] * y2 + yi[mg1] * y1;
          yr[mg1] = yr[m] - y3;
          yi[mg1] = yi[m] - y4;
          yr[m] = yr[m] + y3;
          yi[m] = yi[m] + y4;
        }

        m = m + g1;
      }
    }

    for (i = 0; i <= n - 1; i++) {
      k1 = i;
      kaylyn();

      if (k2 >= i) continue;

      k3 = yr[i + 1];
      yr[i + 1] = yr[k2 + 1];
      yr[k2 + 1] = k3;
      k3 = yi[i + 1];
      yi[i + 1] = yi[k2 + 1];
      yi[k2 + 1] = k3;
    }

    var ymax = 0;

    for (i = 1; i <= n / 2; i++) {
      yr[i] = (Math.sqrt(yr[i] * yr[i] + yi[i] * yi[i]) * 2) / n;
      ymax = max(yr[i], ymax);
    }

    yr[1] = yr[1] / 2;
    var ymaxstr = Math.ceil(ymax * 1.1 * 100) / 100;
    // document.f.Fmax.value = ymaxstr.toString();

    export1();
  }
}
function kaylyn() {
  k2 = 0;

  for (k = 1; k <= g; k++) {
    k3 = Math.floor(k1 / 2);
    k2 = 2 * (k2 - k3) + k1;
    k1 = k3;
  }
}

function export1() {
  var longstr = "";

  for (var i = 1; i <= n / 2; i++) {
    //longstr += i - 1 + ", " + yr[i] + "\n";
    s3.push([i - 1, yr[i]]);
  }

  //console.log(longstr);
}
fft();

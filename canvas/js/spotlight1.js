;(function(){
	var canvas = document.getElementById('spotlight');
	// 不支持的浏览器直接不显示
	if (!canvas || !canvas.getContext) {
		alert("您的浏览器太旧了,升级您的浏览器");
		return false;
	}
	var	context = canvas.getContext('2d')
		cw = 800,
		ch = 800,
		rot = 0;
		canvas.width = cw;
		canvas.height = ch;	

	var lightBall = {
		x: 400,
		y: 400,
		radius: 150,
		vx: Math.random()*5 + 5,
		vy: Math.random()*5 + 5
	};
	function draw() {
		// 清除画布
		context.clearRect(0, 0, cw, ch);

		context.save();
		// 给画布填充颜色
		context.fillStyle = 'black';
		context.fillRect(0, 0, cw, ch);


		// 画聚光灯，即剪裁区域
		context.save();
		context.translate(lightBall.x, lightBall.y);
		context.rotate(rot/180*Math.PI);
		context.scale(lightBall.radius, lightBall.radius);
		// 画五角星的
		starPath();
		context.fillStyle = '#fff';
		context.fill();
		context.restore();
		context.clip();

		// 画文字
		context.font = 'bold 120px Arial';
		context.textAlign = 'centet';
		context.textBaseline = 'middle';
		context.fillStyle = '#e58';
		context.fillText('CANVAS', 10, ch/4);
		context.fillText('CANVAS', cw/4, ch/2);
		context.fillText('CANVAS', cw/2, ch*3/4);
		context.restore();
		
	}

	// 画五角星
	function starPath(){
		context.beginPath();
		for (var i = 0; i < 5; i++) {
			// 大圆起点
			context.lineTo(Math.cos((18 + i*72)/180*Math.PI), -Math.sin((18 + i*72)/180*Math.PI));
			// 小圆起点
			context.lineTo(Math.cos((54 + i*72)/180*Math.PI)*0.5, -Math.sin((54 + i*72)/180*Math.PI)*0.5);
		}
		context.closePath();
	}
	function update() {
		rot += 1;
		lightBall.x += lightBall.vx; //x轴的距离为开始的距离+小球的速度
		lightBall.y += lightBall.vy; //y轴的距离为开始的距离+小球的速度

		// 对小球的边界区域进行判断，使得小球在区域内来回反弹
		//左边界的判断
		if (lightBall.x - lightBall.radius<= 0) {
			lightBall.x = lightBall.radius;
			lightBall.vx = -lightBall.vx;
		}

		// 右边界的判断
		if (lightBall.x >= cw-lightBall.radius) {
			lightBall.x = cw-lightBall.radius;
			lightBall.vx = -lightBall.vx;
		}
		// 对下边界进行判断
		if (lightBall.y >= ch - lightBall.radius) {
			// 当他超出y轴的边界后，回到最低点
			lightBall.y = ch - lightBall.radius;
			// 其y轴的速度，变成开始速度的方向方向
			lightBall.vy = -lightBall.vy
			// 0.5是摩擦系数，因为小球不是每次都弹到最高点
			// 会慢慢变为0;
		}

		// 上边界的判断
		if (lightBall.y - lightBall.radius<= 0) {
			lightBall.y = lightBall.radius;
			lightBall.vy = -lightBall.vy;
		}
	}
	function init() {
		draw();
		update();
		window.requestAnimationFrame(init);
	};

	init();
	
})()
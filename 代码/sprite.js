(function ( w ) {

    /*
    * constructor { Sprite } 精灵构造函数
    * param { x: number } 精灵绘制的x轴坐标
    * param { y: number } 精灵绘制的y轴坐标
    * param { img: Image }  图片资源
    * param { widthMaxFrame: number }  图片有多少列
    * param { heightMaxFrame: number }  图片有多少行
    * */
    function Sprite( ctx, x, y, img, widthMaxFrame, heightMaxFrame ) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.img = img;

        // 某个作用默认第几帧
        this.index = 0;

        // 当前小人行走的方式
        this.direction = 0;
        
        this.widthMaxFrame = widthMaxFrame;
        this.heightMaxFrame = heightMaxFrame;

        // 求一个小人的宽和高
        this.spriteWidth = img.width / widthMaxFrame;
        this.spriteHeight = img.height / heightMaxFrame;

        // 绑定事件
        this._bind();
    }

    Sprite.prototype = {
        constructor: Sprite,

        // 绘制一个小人
        draw: function () {
            this.ctx.drawImage( this.img,
                this.spriteWidth * this.index, this.spriteHeight * this.direction, this.spriteWidth, this.spriteHeight,
                this.x, this.y, this.spriteWidth, this.spriteHeight);
        },

        // 刷新绘制下一个小人时的数据
        update: function () {
            this.index = ++this.index > (this.widthMaxFrame - 1)? 0 : this.index;

            // 根据方向计算下一帧图像的位置
            switch (this.direction) {
                case 1:
                    this.x -= 2;
                    this.x = this.x < -this.spriteWidth? this.ctx.canvas.width: this.x;
                    break;
                case 3:
                    this.y -= 2;
                    this.y = this.y < -this.spriteHeight? this.ctx.canvas.height: this.y;
                    break;
                case 2:
                    this.x += 2;
                    this.x = this.x > this.ctx.canvas.width? -this.spriteWidth: this.x;
                    break;
                case 0:
                    this.y += 2;
                    this.y = this.y > this.ctx.canvas.height? -this.spriteHeight: this.y;
                    break;
            }
        },

        // 绑定事件
        _bind: function() {
            var self = this;
            document.addEventListener( 'keydown', function( e ) {
                switch (e.keyCode) {
                    case 37:
                        self.direction = 1;
                        break;
                    case 38:
                        self.direction = 3;
                        break;
                    case 39:
                        self.direction = 2;
                        break;
                    case 40:
                        self.direction = 0;
                        break;
                }
            });
        }
    };

    w.Sprite = Sprite;

}( window ));

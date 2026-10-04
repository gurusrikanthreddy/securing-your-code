const fs = require('fs');
const GIFEncoder = require('gif-encoder-2');
const Canvas = require('canvas');

const width = 1200;
const height = 600;
const fps = 30;
const duration = 5; // 5 seconds
const totalFrames = fps * duration;

const gif = new GIFEncoder(width, height);
gif.setRepeat(0);
gif.setDelay(1000 / fps);
gif.render();

const stream = fs.createWriteStream('spiderman_animation.gif');
gif.pipe(stream);

function drawFrame(frameCount) {
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(0, 0, width, height);
    
    // Calculate position
    let position = 0;
    let speed = 5;
    
    for (let i = 0; i < frameCount; i++) {
        position += speed;
        if (position > width - 100 || position < 0) {
            speed = -speed;
        }
    }
    
    // Draw spider
    ctx.font = '80px Arial';
    ctx.fillText('🕷️', position, 280);
    
    // Draw title
    ctx.fillStyle = '#000';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('Spider-Man Move', 20, 40);
    
    return canvas;
}

console.log('Generating Spider-Man GIF...');

for (let i = 0; i < totalFrames; i++) {
    const canvas = drawFrame(i);
    gif.addFrame(canvas);
    
    if ((i + 1) % 30 === 0) {
        console.log(`Processed ${i + 1}/${totalFrames} frames`);
    }
}

gif.finish();

stream.on('finish', () => {
    console.log('✅ Spider-Man GIF created: spiderman_animation.gif');
    process.exit(0);
});

stream.on('error', (err) => {
    console.error('Error:', err);
    process.exit(1);
});
